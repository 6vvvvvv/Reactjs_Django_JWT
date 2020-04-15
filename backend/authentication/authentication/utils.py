from authapp.serializers import UserSerializer

# define a custom JWT response payload handler which includes the user’s serialized data.

def my_jwt_response_handler(token, user=None, request=None):
    return {
        'token': token,
        'user': UserSerializer(user, context={'request': request}).data
    }