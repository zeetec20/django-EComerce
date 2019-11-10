import uuid

from django.db import models
from django.contrib.auth import get_user_model
from users.models import CustomUser

class Transaksi(models.Model):
    id_transaksi    = models.IntegerField(primary_key=True)
    barang          = models.CharField(max_length=400)
    pembeli         = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='+')
    harga           = models.CharField(max_length=400)
    alamat          = models.CharField(max_length=400)
    ekspedisi       = models.CharField(max_length=20)
    pembayaran      = models.BooleanField(default=False)

    def __str__(self):
        return "{} | {} | {}".format(self.pembeli, self.barang, self.harga)
    
    def save(self, *args, **kwargs):
        semuaTransaksi = Transaksi.objects.all()

        token = uuid.uuid4().int
        semua_id = []
        for transaksi in semuaTransaksi:
            semua_id.append(transaksi.id_transaksi)
        while token in semua_id:
            token = uuid.uuid4().int
        self.id_transaksi = token
        
        user = get_user_model().objects.get(username=self.pembeli.username)
        if user.transaksi == '':
            user.transaksi = self.id_transaksi
        else:
            user.transaksi += ', ' + self.id_transaksi
        user.save()

        super(Transaksi, self).save()

    class Meta:
        verbose_name_plural = 'Transaksi'