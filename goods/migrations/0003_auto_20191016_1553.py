# Generated by Django 2.2.5 on 2019-10-16 15:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('goods', '0002_auto_20191016_1550'),
    ]

    operations = [
        migrations.AlterField(
            model_name='barang',
            name='brand',
            field=models.CharField(max_length=50),
        ),
    ]
