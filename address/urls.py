from django.urls import path
from .views import Index

app_name = 'address'
urlpatterns = [
    path('<str:username>/barang', Index.as_view(method = 'barang'), name = 'index'),
    path('<str:username>/cart', Index.as_view(method = 'cart'), name = 'index')
]
