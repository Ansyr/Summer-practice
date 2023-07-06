from rest_framework import generics
from praktika.models import Region
from praktika.serializators.education import EducationSerializer
from praktika.serializators.region import RegionSerializer


class RegionAPIList(generics.ListCreateAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


class RegionAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer


class RegionAPIDestroy(generics.RetrieveUpdateAPIView):
    queryset = Region.objects.all()
    serializer_class = RegionSerializer

