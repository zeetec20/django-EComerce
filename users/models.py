import shutil
import os
from uuid import uuid4
from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import AbstractUser, Group
from django.contrib.auth import get_user_model

class CustomUser(AbstractUser):
    def path_upload(self, filename):
        return ('users/' + slugify(self.username) + '/image/' + filename)

    profile     = models.ImageField(upload_to = path_upload)
    fullname    = models.CharField(max_length = 40)
    token       = models.CharField(max_length = 37, blank=True, null=True)
    transaksi   = models.CharField(max_length = 400)
    alamat      = models.TextField()

    def __str__(self):
        return "{}. {} | {}".format(self.id, self.username, self.email)

    def save(self, *args, **kwargs):
        if self.id in get_user_model().objects.all().values_list('id', flat=True): #UPDATE
            pass
        else: # CREATE
            if self.is_staff:
                staff = Group.objects.get(name = 'staff')
                self.groups.add(staff)
        if self.token == None:
            token = uuid4()
            allUser = get_user_model().objects.all()
            allToken = []
            for user in allUser:
                allToken.append(user.token)
            while token in allToken:
                token = uuid4()
            self.token = token
        super(CustomUser, self).save(*args, **kwargs)

    def delete(self):
        
        try:
            shutil.rmtree('media/users/' + self.username)
        except OSError as e:
            print ("Error: %s - %s." % (e.filename, e.strerror))
        
        super(CustomUser, self).delete()
    
    class Meta:
        verbose_name_plural = 'User'

class Subscribe(models.Model):
    email = models.EmailField(primary_key=True)
    
    def __str__(self):
        return self.email

    class Meta:
        verbose_name_plural = 'Berlangganan'

