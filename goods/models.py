from django.db import models
from django.utils.text import slugify
import os 

class SemuaJenis(models.Model):
    jenis       = models.CharField(max_length = 30)

    def __str__(self):
        return "{}".format(self.jenis)

class SemuaBarang(models.Model):
    brand       = models.CharField(max_length = 30)

    def __str__(self):
        return "{}".format(self.brand)

class Barang(models.Model):
    def pathUpload(self, filename):
        return "barang/{}/{}/images/{}".format(self.brand, self.nama, filename)

    nama            = models.CharField(max_length = 50)
    harga           = models.DecimalField(max_digits=12, decimal_places=0)
    warna           = models.CharField(max_length = 50)
    jenis           = models.ForeignKey(SemuaJenis, on_delete=models.CASCADE)
    barang          = models.ForeignKey(SemuaBarang, on_delete=models.CASCADE)
    image1          = models.ImageField(upload_to = pathUpload)
    image2          = models.ImageField(upload_to = pathUpload, null = True, blank = True)
    image3          = models.ImageField(upload_to = pathUpload, null = True, blank = True)
    image4          = models.ImageField(upload_to = pathUpload, null = True, blank = True)
    image5          = models.ImageField(upload_to = pathUpload, null = True, blank = True)
    deskripsi       = models.TextField()
    tersedia        = models.BooleanField()
    dateUpdate      = models.DateField(auto_now = True, null = True, blank = True)
    dateCreate      = models.DateField(auto_now_add = True, null = True, blank = True)
    slugifyBarang   = models.CharField(max_length = 100, null = True, blank = True)

    def __str__(self):
        return "{}. {} | {} | Rp.{:20,.2f} | Tersedia({})".format(self.id, self.nama, self.barang, self.harga, self.tersedia)

    def save(self):
        os.chmod('/media', 0o757)
        self.slugifyBarang = slugify(self.nama)
        super(Barang, self).save()
