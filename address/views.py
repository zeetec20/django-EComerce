import requests as req

from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect

from django.views import View
from goods.models import Barang

class Index(View):
    method = ''
    context = {

    }

    def post(self, request):
        pass

    def get(self, request, *args, **kwargs):
        province = req.get("http://dev.farizdotid.com/api/daerahindonesia/provinsi").json()
        hargaTotal = 0
        if kwargs['username'] != request.user.username:
            return redirect('/')
        else:
            self.context['alamatUser'] = 'false'
            user = get_user_model().objects.get(username = kwargs['username'])
            print(user.alamat)
            if user.alamat != '':
                self.context['alamatUser'] = 'true'
                self.context['label']               = request.user.alamat.split(' | ')[0].split(': ')[1]
                self.context['namaLengkap']         = request.user.alamat.split(' | ')[1].split(': ')[1]
                self.context['provinsi']            = request.user.alamat.split(' | ')[2].split(': ')[1]
                self.context['kabupatenKota']       = request.user.alamat.split(' | ')[3].split(': ')[1].split('/')[0]
                self.context['kabupatenAsli']       = request.user.alamat.split(' | ')[3].split(': ')[1].split('/')[1]
                self.context['kecamatan']           = request.user.alamat.split(' | ')[4].split(': ')[1]
                self.context['kodePos']             = request.user.alamat.split(' | ')[5].split(': ')[1]
                informasiTamabahan = user.alamat.split(' | ')[6:][0].replace('Informasi Tambahan: ', '')
                self.context['informasiTambahan']   = str(informasiTamabahan)

                if self.context['provinsi'][len(self.context['provinsi']) - 1].isspace():
                    self.context['provinsi'] = self.context['provinsi'][:len(self.context['provinsi']) - 1]
                for prov in province['semuaprovinsi']:
                    if prov['nama'] == self.context['provinsi']:
                        idProvinsi = prov['id']
                        kabupaten = req.get("http://dev.farizdotid.com/api/daerahindonesia/provinsi/" + idProvinsi + "/kabupaten").json()
                        for kab in kabupaten['kabupatens']:
                            if str(kab['nama'].split(' ')[1:]).replace(', ', ' ').replace('\'', '').replace('[', '').replace(']', '') == self.context['kabupatenKota']:
                                idKecamatan = kab['id']
                                kecamatan = req.get("http://dev.farizdotid.com/api/daerahindonesia/provinsi/kabupaten/" + idKecamatan + "/kecamatan").json()
                                self.context['listKabupaten'] = kabupaten['kabupatens']
                                self.context['listKecamatan'] = kecamatan['kecamatans']
        if self.method == 'barang':
            if 'barang' not in request.GET and 'quantity' not in request.GET and 'color' not in request.GET:
                return redirect('/')
            
            slugify     = request.GET['barang']
            quantity    = request.GET['quantity']
            color       = request.GET['color']
            barang      = Barang.objects.get(slugifyBarang = slugify)
            hargaTotal  = str(int(barang.harga) * int(quantity))

        if self.method == 'cart':
            # if 'barang' not in request.GET and 'quantity' not in request.GET and 'color' not in request.GET:
            #     return redirect('/')
            
            slugify = request.GET['barang'].split(' ')
            barang = []
            x = 0
            for slug in slugify:
                print(slug)
                barang.append(Barang.objects.get(slugifyBarang = slug))
                hargaTotal += int(Barang.objects.get(slugifyBarang = slug).harga) * int(request.GET['quantity'].split(' ')[x])
                x += 1
            quantity = request.GET['quantity'].split(' ')
            self.context['jumlahBarang'] = len(request.GET['barang'].split(' '))
            self.context['barang']      = zip(barang, quantity)
        else:
            self.context['barang']      = barang

        self.context['hargaTotal']  = hargaTotal
        self.context['method']      = self.method
        self.context['allProvince'] = province['semuaprovinsi']

        return render(self.request, 'address/index.html', self.context)
