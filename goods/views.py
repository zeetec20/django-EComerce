import random

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
        barangSimilar2 = []
        for x in barangSimilar:
            if x.slugifyBarang == kwargs['slugifyBarang']:
                pass
            else:
                barangSimilar2.append(x)
        barangSimilar = barangSimilar2

        if len(barangSimilar) >= 3:
            indexBarangSimilar = True
            indexBarangSimilar1 = 0
            indexBarangSimilar2 = 0
            indexBarangSimilar3 = 0
            while indexBarangSimilar:
                indexBarangSimilar1 = random.randint(1, len(barangSimilar))
                indexBarangSimilar2 = random.randint(1, len(barangSimilar))
                indexBarangSimilar3 = random.randint(1, len(barangSimilar))
                if indexBarangSimilar1 != indexBarangSimilar2 and indexBarangSimilar1 != indexBarangSimilar3 and indexBarangSimilar2 != indexBarangSimilar3:
                    break
            barangSimilar = [barangSimilar[indexBarangSimilar1 - 1], barangSimilar[indexBarangSimilar2 - 1], barangSimilar[indexBarangSimilar3 - 1]]

        warna = barang.warna.split(", ")
        lineDeskripsi = len(barang.deskripsi.split('\r'))

        self.context['lineDeskripsi']   = lineDeskripsi
        self.context['barang']          = barang
        self.context['barangSimilar']   = barangSimilar
        self.context['warna']           = warna
        self.context['warnaLength']     = len(warna)
        return render(self.request, 'barang/index.html', self.context)