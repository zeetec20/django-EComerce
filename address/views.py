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
        if kwargs['username'] != request.user.username:
            return redirect('/')
        
        if self.method == 'barang':
            if 'barang' in request.GET and 'quantity' in request.GET and 'color' in request.GET:
                pass
            else:
                return redirect('/')
            
            slugify     = request.GET['barang']
            quantity    = request.GET['quantity']
            color       = request.GET['color']
            barang = Barang.objects.get(slugifyBarang = slugify)
            self.context['barang'] = barang
            self.context['hargaTotal'] = str(int(barang.harga) * int(quantity))

        if self.method == 'cart':
            pass

        self.context['method'] = self.method
        province = req.get("http://dev.farizdotid.com/api/daerahindonesia/provinsi").json()
        self.context['allProvince'] = province['semuaprovinsi']

        return render(self.request, 'address/index.html', self.context)
