# Generated by Django 2.2.6 on 2019-11-19 18:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transaksi', '0012_auto_20191119_1848'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaksi',
            name='dateCreate',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AlterField(
            model_name='transaksi',
            name='dateUpdate',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
