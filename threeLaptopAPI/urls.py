from django.urls import path
from .views import Barang, CustomObtainAuthToken, Transaksi

urlpatterns = [
    path('barang', Barang.as_view(), name='listBarang'),
    path('get_api_token', CustomObtainAuthToken.as_view(), name='get_api_token'),
    path('transaksi', Transaksi.as_view(), name='transaksi'),
]
