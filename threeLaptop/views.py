import random
import math
import requests as req

from django.views import View
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import logout, login, authenticate
from django.contrib.auth import get_user_model

from goods.models import Barang, SemuaBrand
from users.forms import RegisterForm
from users.token import getToken

class Index(View):
    template_name = 'index.html'
    context = {
    
    }

    def get(self, request, *args, **kwargs):
        jumlahBarang = Barang.objects.all()
        page = 1
        if 'pagination' in request.GET:
            if int(request.GET['pagination']) > 1:
                start   = (int(request.GET['pagination']) - 1) * 9
                end     = start * 2
                barangAll = Barang.objects.all()[start:end]
                page = int(request.GET['pagination'])
            else:
                barangAll = Barang.objects.all()
        else:
            barangAll = Barang.objects.all()

        self.context['pagination'] = math.ceil(len(jumlahBarang) / 9)
        paginationNumber = [page, page + 1, page + 2]
        self.context['paginationNumber'] = paginationNumber

        barangLane = [[], []]
        for barang in barangAll:
            if len(barangLane[1]) == 9:
                break
            barangLane[1].append(barang)

        self.context['allBrand'] = SemuaBrand.objects.all()
        self.context['barangLane'] = barangLane
        self.context['registerForm'] = RegisterForm()

        if request.user.is_authenticated:
            if request.user.profile == "":
                self.context['profile_user'] = '/static/asset/images/icon/user.png'
            else:
                self.context['profile_user'] = request.user.profile
        
        if request.is_ajax():
            if 'pagination' in request.GET:
                self.template_name = 'listBarang.html'

        return render(request, self.template_name, self.context)


class Ajax(View):
    action = ''
    context = {

    }

    def post(self, request):
        if request.is_ajax():
            if self.action == 'login':
                inputUsername = request.POST['username']
                inputPassword = request.POST['password']
                user = authenticate(request, username=inputUsername, password=inputPassword)
                login(request, user)

                if request.user.profile == "":
                    self.context['profile_user'] = '/static/asset/images/icon/user.png'
                else:
                    self.context['profile_user'] = request.user.profile

                return render(self.request, 'user.html', self.context)

            if self.action == 'register':
                form = RegisterForm(request.POST, request.FILES or None)
                if form.is_valid():
                    form.save()
                    user = get_user_model().objects.get(username = request.POST['username'])
                    user.is_active = False
                    user.token = getToken()
                    user.save()

                    return JsonResponse({'success': True})
                else:
                    return JsonResponse({'success': False})

    def get(self, request):
        if request.is_ajax():
            if self.action == 'logout':
                logout(request)
                return JsonResponse({'success': True})

            if self.action == 'cart':
                if 'barang' in request.COOKIES and request.COOKIES['barang'] != "":
                    listBarang = request.COOKIES['barang'].split(', ')

                    data = []
                    # listCookie = ''
                    for barang in listBarang:
                        listBarang = barang.split(' : ')
                        barang = Barang.objects.get(nama=listBarang[0])

                        if listBarang[1] == 'random':
                            barangWarna = barang.warna.split(', ')
                            length = len(barangWarna)
                            randomNumber = random.randint(1, length) - 1
                            listBarang[1] = barangWarna[randomNumber]

                        data.append({
                            'nama': listBarang[0],
                            'warna': listBarang[1],
                            'jumlah': listBarang[2],
                            'cover': barang.image1,
                            'harga': barang.harga,
                            'hargaTotal': int(listBarang[2]) * int(barang.harga)
                        })
                        # cookie = "{} : {} : {}".format(listBarang[0], listBarang[1], listBarang[2])
                        # if listCookie == '':
                        #     listCookie += cookie
                        # else:
                        #     listCookie += ', ' + cookie

                    totalHarga = 0
                    for harga in data:
                        totalHarga += harga['hargaTotal']

                    self.context = {
                        'barangCart': data,
                        'totalHarga': totalHarga,
                        'success': True
                    }
                return render(self.request, 'cart.html', self.context)
            
            if self.action == 'get_kabupaten':
                idProvinsi = self.request.GET['id_provinsi']
                kabupaten = req.get("http://dev.farizdotid.com/api/daerahindonesia/provinsi/" + idProvinsi + "/kabupaten").json()
                self.context = {
                    'listKabupaten': kabupaten['kabupatens']
                }
                return render(self.request, 'address/listKabupaten.html', self.context)
            
            if self.action == 'get_kecamatan':
                idKecamatan = self.request.GET['id_kabupaten']
                kecamatan = req.get("http://dev.farizdotid.com/api/daerahindonesia/provinsi/kabupaten/" + idKecamatan + "/kecamatan").json()
                self.context = {
                    'listKecamatan': kecamatan['kecamatans']
                }
                return render(self.request, 'address/listKecamatan.html', self.context)
        
            if self.action == 'search':
                barang = Barang.objects.filter(name__unaccent__lower__trigram_simila = request.GET['search'])
                return render(self.request, 'listBarang.html', self.context)
            
            if self.action == 'profile':
                if request.user.profile == "":
                    self.context['profile_user'] = '/static/asset/images/icon/user.png'
                else:
                    self.context['profile_user'] = request.user.profile

                return render(self.request, 'user/profile.html', self.context)
        else:
            return redirect('index')
        return HttpResponse("ajax django")
