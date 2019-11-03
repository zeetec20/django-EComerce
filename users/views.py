from django.shortcuts import render
from django.contrib.auth import get_user_model

def activate(request, numberToken):
    user = get_user_model().objects.get(token=numberToken)
    user.is_activate = True
    user.save()