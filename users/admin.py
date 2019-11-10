from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.shortcuts import redirect

from .forms import CustomUserCreationForm, CustomUserChangeForm
from .models import CustomUser, Subscribe

class CustomUserAdmin(UserAdmin):
    add_form        = CustomUserCreationForm
    form            = CustomUserChangeForm
    model           = CustomUser
    list_display    = ['username', 'email', 'is_staff', 'fullname']
    fieldsets       = (
        (('User'), {'fields': ('username', 'email', 'is_staff', 'is_active', 'token', 'profile', 'fullname')}),
    )

    def delete_queryset(self, requets, queryset):
        for obj in queryset:
            obj.delete()

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Subscribe)