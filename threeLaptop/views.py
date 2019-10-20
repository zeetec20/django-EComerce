from django.views import View
from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from django.contrib.auth import logout, login, authenticate
from goods.models import Barang
from users.forms import RegisterForm

class Index(View):
    template_name = 'index.html'
    context = {
        
    }

    def post(self, request):
        form = RegisterForm(request.POST, request.FILES or None)
        self.context['registerForm'] = RegisterForm(request.POST, request.FILES or None)
        if form.is_valid():
            form.save()
        else:
            return redirect('index')

    def get(self, request):
        barangAll = Barang.objects.all()

        index = 0
        lane = 1
        barangLane = [[], []]
        for barang in barangAll:
            index+=1
            if (index / 3) == 0:
                lane += 1
                barangLane[lane] = []

            barangLane[lane].append(barang)

        self.context['barangLane'] = barangLane
        self.context['registerForm'] = RegisterForm()

        if request.user.is_authenticated:
            if request.user.profile == "":
                self.context['profile_user'] = '/static/asset/images/icon/user.png'
            else:
                self.context['profile_user'] = request.user.profile

        return render(request, self.template_name, self.context)

class Ajax(View):
    action = ''
    context = {
        
    }
    def post(self, request):
        if request.is_ajax():
            if self.action == 'login':
                inputUsername = ''
                inputPassword = ''
                user = authenticate(request, username = inputUsername, password = inputPassword)
                login(request, user)
                return JsonResponse({'success': True})
                
            if self.action == 'register':
                form = RegisterForm(request.POST, request.FILES or None)
                if form.is_valid():
                    form.save()
                    return JsonResponse({'success': True})
                else:
                    return JsonResponse({'success': False})

    def get(self, request):
        if request.is_ajax():
            if self.action == 'logout':
                logout(request)
                return JsonResponse({'success': True})
        
        return HttpResponse("logout")

