from django.contrib import admin
from .models import Transaksi

class TransaksiAdmin(admin.ModelAdmin):
    readonly_fields = [
        'pembayaran'
    ]

admin.site.register(Transaksi)
