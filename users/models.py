from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    
    def path_upload(self, filename):
        return ('user/' + slugify(self.username) + '/image/' + filename)

    profile     = models.ImageField(upload_to = path_upload)

    def __str__(self):
        return self.email

