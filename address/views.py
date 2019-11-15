import requests as req

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
        hargaTotal = 0
        if kwargs['username'] != request.user.username:
            return redirect('/')
        
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
        province = req.get("http://dev.farizdotid.com/api/daerahindonesia/provinsi").json()
        self.context['allProvince'] = province['semuaprovinsi']

        return render(self.request, 'address/index.html', self.context)
