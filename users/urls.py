from django.urls import path
from .views import activate

urlpatterns = [
    path('activate/<str:numberToken>', activate, name='token')
]
