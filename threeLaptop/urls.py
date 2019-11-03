from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from .views import Index, Ajax

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', Index.as_view(), name = 'index'),
    
    path('ajax/logout', Ajax.as_view(action='logout'), name='logout'),
    path('ajax/login', Ajax.as_view(action='login'), name='login'),
    path('ajax/register', Ajax.as_view(action='register'), name='register'),
    path('ajax/cart', Ajax.as_view(action='cart'), name='cart'),
    path('ajax/search', Ajax.as_view(action='search'), name='search'),
    path('ajax/api/kabupaten', Ajax.as_view(action = 'get_kabupaten'), name='api_kabupaten'),
    path('ajax/api/kecamatan', Ajax.as_view(action = 'get_kecamatan'), name='api_kecamatan'),
    
    path('barang/', include('goods.urls')),
    path('address/', include('address.urls')),
    path('user', include('users.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
