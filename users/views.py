from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from django.views import View
from django.views.generic.base import TemplateView

def activate(request, numberToken):
    user = get_user_model().objects.get(token=numberToken)
    print(user.is_active)
    user.is_active = True
    user.save()
    context = {
        'username': user.username,
        'email': user.email,
        'fullname': user.fullname
    }
    return render(request, 'user/activate.html', context)

class Ajax(View):
    def get(self, request):
        if request.is_ajax():
            pass
        else:
            return redirect('index')
        return HttpResponse('Ajax')

def error404(request):
    data = {"name": "ThePythonDjango.com"}
    return render(request,'users/notfound.html', data)