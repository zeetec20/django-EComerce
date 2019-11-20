from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf.urls import handler404
from .views import Index, Ajax, Test

from users.views import error404

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Index.as_view(), name = 'index'),
    path('test', Test.as_view()),
    
    path('ajax/logout', Ajax.as_view(action='logout'), name='logout'),
    path('ajax/login', Ajax.as_view(action='login'), name='login'),
    path('ajax/register', Ajax.as_view(action='register'), name='register'),
    path('ajax/cart', Ajax.as_view(action='cart'), name='cart'),
    path('ajax/search', Ajax.as_view(action='search'), name='search'),
    path('ajax/profile', Ajax.as_view(action='profile'), name='profile'),
    path('ajax/ongkir', Ajax.as_view(action='ongkir'), name='ongkir'),
    path('ajax/subscribe', Ajax.as_view(action='subscribe'), name='subscribe'),
    path('ajax/csrf', Ajax.as_view(action='csrf'), name='csrf'),
    path('ajax/sort/<str:typeSort>', Ajax.as_view(action='sort'), name='barangMurah'),
    path('ajax/saveTransaksi', Ajax.as_view(action='saveTransaksi'), name='saveTransaksi'),

    path('ajax/api/kabupaten', Ajax.as_view(action = 'get_kabupaten'), name='api_kabupaten'),
    path('ajax/api/kecamatan', Ajax.as_view(action = 'get_kecamatan'), name='api_kecamatan'),
    path('ajax/api/xendit', Ajax.as_view(action = 'xendit'), name='xendit'),
    
    path('barang/', include('goods.urls')),
    path('address/', include('address.urls')),
    path('user/', include('users.urls')),
    path('api/', include('threeLaptopAPI.urls')),
    # path('<str:url1>/<str:url2>/<str:url3>/<str:url4>/<str:url5>/<str:url6>/<str:url7>/<str:url8>/<str:url9>/<str:url10>'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)

# handler404 = 'users.views.error_404_view'