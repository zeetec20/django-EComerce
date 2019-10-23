from django.urls import path
from .views import DetailBarang

app_name = 'barang'
urlpatterns = [
    path('<str:slugifyBarang>', DetailBarang.as_view(), name='detailBarang'),
]
