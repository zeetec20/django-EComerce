# Generated by Django 2.2.6 on 2019-11-19 05:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaksi', '0008_auto_20191119_0522'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaksi',
            name='id_transaksi',
            field=models.BigIntegerField(blank=True, primary_key=True, serialize=False),
        ),
    ]