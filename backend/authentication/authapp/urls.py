from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token
from .views import currentUser, UserList
from . import views

# https://jpadilla.github.io/django-rest-framework-jwt/
urlpatterns = [
    path('token/', obtain_jwt_token),
    path('currentuser/', currentUser, name="currentuser"),
    path('users/', UserList.as_view(), name="users")
]
