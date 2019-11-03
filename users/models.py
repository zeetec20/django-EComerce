import shutil

from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    
    def path_upload(self, filename):
        return ('users/' + slugify(self.username) + '/image/' + filename)

    profile     = models.ImageField(upload_to = path_upload)
    fullname    = models.CharField(max_length = 40)
    token       = models.CharField(max_length=37)

    def __str__(self):
        return "{}. {} | {}".format(self.id, self.fullname, self.email)

    def delete(self):
        
        try:
            shutil.rmtree('media/users/' + self.username)
        except OSError as e:
            print ("Error: %s - %s." % (e.filename, e.strerror))
        
        super(CustomUser, self).delete()
