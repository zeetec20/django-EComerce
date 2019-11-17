from django.urls import path
from .views import Barang, CustomObtainAuthToken, ObtainAuthToken

urlpatterns = [
    path('barang', Barang.as_view(), name='listBarang'),
    path('get_api_token', CustomObtainAuthToken.as_view(), name='get_api_token'),
]
