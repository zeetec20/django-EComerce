# Generated by Django 2.2.6 on 2019-11-03 02:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0006_auto_20191103_0256'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='token',
            field=models.CharField(max_length=37),
        ),
    ]