from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from django.views import View

def activate(request, numberToken):
    user = get_user_model().objects.get(token=numberToken)
    user.is_activate = True
    user.save()

class Ajax(View):
    def get(self, request):
        if request.is_ajax():
            pass
        else:
            return redirect('index')
        return HttpResponse('Ajax')