# Generated by Django 2.2.6 on 2019-11-04 05:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Transaksi',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('id_transaksi', models.CharField(max_length=10)),
                ('barang', models.CharField(max_length=400)),
                ('harga', models.CharField(max_length=400)),
            ],
        ),
    ]