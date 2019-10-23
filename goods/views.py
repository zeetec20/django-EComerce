from django.shortcuts import render
from django.views import View
from .models import Barang

class DetailBarang(View):
    context = {

    }

    def post(self, request):
        pass

    def get(self, request, *args, **kwargs):
        barang = Barang.objects.get(slugifyBarang = kwargs['slugifyBarang'])
        barangSimilar = Barang.objects.filter(jenis = barang.jenis)
        self.context['barang'] = barang
        self.context['barangSimilar'] = barangSimilar
        return render(self.request, 'barang/index.html', self.context)