import uuid

from django.db import models
from django.contrib.auth import get_user_model
from users.models import CustomUser

class Transaksi(models.Model):
    id_transaksi    = models.CharField(primary_key=True, blank=True, max_length=38)
    barang          = models.CharField(max_length=400)
    harga           = models.CharField(max_length=100)
    detailHarga     = models.CharField(max_length=300)
    alamat          = models.CharField(max_length=400)
    ekspedisi       = models.CharField(max_length=150)
    pembeli         = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='+')    
    
    pembayaran      = models.BooleanField(default=False, blank=True)

    dateUpdate      = models.DateTimeField(auto_now = True, null = True, blank = True)
    dateCreate      = models.DateTimeField(auto_now_add = True, null = True, blank = True)
    def __str__(self):
        return "{} | {} | {}".format(self.pembeli, self.barang, self.dateCreate)
    
    def save(self, *args, **kwargs):
        super(Transaksi, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        user = get_user_model().objects.get(username =self.pembeli.username)
        transaksi = user.transaksi.split(', ')
        transaksi.remove(self.id_transaksi)
        user.transaksi = str(transaksi).replace(',', ', ').replace('[', '').replace(']', '').replace("'", "") 
        user.save()
        super(Transaksi, self).delete(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'Transaksi'