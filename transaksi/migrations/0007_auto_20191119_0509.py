# Generated by Django 2.2.6 on 2019-11-19 05:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaksi', '0006_auto_20191117_0005'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaksi',
            name='ekspedisi',
            field=models.CharField(max_length=150),
        ),
        migrations.AlterField(
            model_name='transaksi',
            name='id_transaksi',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=38, primary_key=True, serialize=False),
        ),
    ]
