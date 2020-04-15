from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, UserSerializerWithToken

# https://www.django-rest-framework.org/api-guide/views/
@api_view(['GET'])
def currentUser(request):
    # Determine the current user by their token, and return their data
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

# https://www.django-rest-framework.org/api-guide/permissions/


class UserList(APIView):
    # Link to a signup form and create a new user
    permission_classes = (permissions.AllowAny,)
    
    # http_method_names = ['get', 'head', 'post']

    # def get(self, request):
    #     serializer = UserSerializerWithToken(User.objects.all(), many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # self.http_method_names.append("GET")
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
