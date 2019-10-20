from django.contrib import admin
from django.urls import path
from .views import Index, Ajax
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Index.as_view(), name='index'),
    path('ajax/logout', Ajax.as_view(action = 'logout'), name='logout'),
    path('ajax/login', Ajax.as_view(action = 'login'), name='login'),
    path('ajax/register', Ajax.as_view(action = 'register'), name='register')
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
