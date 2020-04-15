from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Internal model User with single field username
        model = User
        fields = ('username',)

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    username = serializers.CharField()
    password = serializers.CharField()

    # https://jpadilla.github.io/django-rest-framework-jwt/#extending-jsonwebtokenauthentication
    def getToken(self, obj):
        # manually generate a token, for example to return a token to the
        # user immediately after account creation:
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)

        return token

    # https://www.django-rest-framework.org/api-guide/serializers/
    # Writing .create() methods for nested representations,passwd write only not readable

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        # As long as the fileds are the same, we can just use this
        instance = self.Meta.model(**validated_data)
        # call set_passwd to hash passwd
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    # username passwd field by default in user model
    # Introduce the token field generated above

    class Meta:
        model = User
        field = ('token', 'username', 'password')
      
