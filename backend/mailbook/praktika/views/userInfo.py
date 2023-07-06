from rest_framework import generics

from praktika.models import UserInfo
from praktika.serializators.userInfo import UserInfoSerializer


class RegionAPIList(generics.ListCreateAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer


class RegionAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer


class RegionAPIDestroy(generics.RetrieveUpdateAPIView):
    queryset = UserInfo.objects.all()
    serializer_class = UserInfoSerializer