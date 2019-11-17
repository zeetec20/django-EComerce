import shutil
import os
from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import AbstractUser
from django.contrib.auth import get_user_model
from uuid import uuid4

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

    def save(self):
        token = uuid4()
        allUser = get_user_model().objects.all()
        allToken = []
        for user in allUser:
            allToken.append(user.token)
        while token in allToken:
            token = uuid4()
        self.token = token
        return super(CustomUser, self).save()

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

