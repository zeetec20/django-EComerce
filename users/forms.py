from django import forms 
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    
    class Meta:
        model   = CustomUser
        fields  = (
            'fullname',
            'profile',
            'username', 
            'email',
            'is_staff'
        )

class CustomUserChangeForm(UserChangeForm):
    
    class Meta:
        model   = CustomUser
        fields  = {
            'fullname',
            'profile',
            'username',
            'email',
            'is_staff'
        }

class RegisterForm(forms.ModelForm):
    class Meta:
        model   = CustomUser
        fields  = {
            'fullname',
            'email',
            'username',
            'password',
            'profile'
        }

        widgets = {
            'fullname': forms.TextInput(
                attrs = {
                    'class': 'form-control form-control-sm',
                    'placeholder': 'Full Name'
                }
            ),
            'email': forms.EmailInput(
                attrs = {
                    'class': 'form-control form-control-sm',
                    'placeholder': 'your@email.com'
                }
            ),
            'username': forms.TextInput(
                attrs = {
                    'class': 'form-control form-control-sm',
                    'placeholder': 'Username'
                }
            ),
            'password': forms.PasswordInput(
                attrs = {
                    'class': 'form-control form-control-sm',
                    'placeholder': 'Password'
                }
            ),
            'profile': forms.FileInput(
                attrs = {
                    'class': 'form-control form-control-sm profile',
                    'placeholder': 'Profile'
                }
            )
        }

        labels  = {
            'fullname'  : 'Full Name ',
            'email'     : 'Email ',
            'username'  : 'Username ',
            'password'  : 'Password ',
            'profile'   : 'Foto Profile '
        }

