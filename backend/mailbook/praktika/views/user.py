from rest_framework import generics
from praktika.models import CustomUser
from praktika.serializators.user import CustomUserSerializer


class CustomUserAPIList(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class ustomUserUpdate(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class ustomUserDestroy(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
