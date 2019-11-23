# Generated by Django 2.2.6 on 2019-11-04 06:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaksi', '0002_transaksi_pembeli'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaksi',
            name='alamat',
            field=models.CharField(default='', max_length=400),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='transaksi',
            name='ekspedisi',
            field=models.CharField(default='', max_length=20),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='transaksi',
            name='pembayaran',
            field=models.BooleanField(default=False),
        ),
    ]
