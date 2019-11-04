from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import get_user_model
from django.views import View

def activate(request, numberToken):
    # user = get_user_model().objects.get(token=numberToken)
    # user.is_activate = True
    # user.save()
    context = {
        'username': 'zeetec',
        'email': 'jusles363@gmail.com',
        'fullname': 'Firman Justisio Lestari'
    }
    return render(request, 'user/activate.html', context)

class Ajax(View):
    def get(self, request):
        if request.is_ajax():
            pass
        else:
            return redirect('index')
        return HttpResponse('Ajax')