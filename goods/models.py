import os
import shutil

from django.db import models
from django.utils.text import slugify
from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from users.models import Subscribe

class SemuaJenis(models.Model):
    jenis       = models.CharField(max_length = 30)

    def __str__(self):
        return "{}".format(self.jenis)
    
    class Meta:
        verbose_name_plural = 'Jenis Barang'

class SemuaBrand(models.Model):
    brand       = models.CharField(max_length = 30)

    def __str__(self):
        return "{}".format(self.brand)

    class Meta:
        verbose_name_plural = 'Brand'

class Barang(models.Model):
    def pathUpload(self, filename):
        return "barang/{}/{}/images/{}".format(self.brand, self.nama, filename)

    nama            = models.CharField(max_length = 50)
    harga           = models.DecimalField(max_digits=12, decimal_places=0)
    warna           = models.CharField(max_length = 50)
    jenis           = models.ForeignKey(SemuaJenis, on_delete=models.CASCADE)
    brand           = models.ForeignKey(SemuaBrand, on_delete=models.CASCADE)
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
    terjual         = models.IntegerField()

    def __str__(self):
        return "{}. {} | {} | Rp. {:,} | Tersedia({})".format(self.id, self.nama, self.brand, self.harga, self.tersedia)

    def save(self):
        if self.id in Barang.objects.all().values_list('id', flat=True): #UPDATE
            pass
        else: # CREATE
            allEmailSubscribe = Subscribe.objects.all()
            msgEmail = []
            for email in allEmailSubscribe:
                msgEmail.append(email.email)
            html = render_to_string('email/goods.html', {})
            msg = EmailMessage(
                'Lihat Produk Terbaru Three Laptop',
                html,
                'jusles363@gmail.com',
                msgEmail
            )
            msg.content_subtype = 'html'
            msg.send()
        
        os.chmod('/media', 0o757)
        self.slugifyBarang = slugify(self.nama)
        super(Barang, self).save()
    
    def delete(self):
        try:
            shutil.rmtree('media/barang/' + self.nama)
        except OSError as e:
            print ("Error: %s - %s." % (e.filename, e.strerror))
        
        super(Barang, self).delete()

    class Meta:
        verbose_name_plural = 'Barang'
