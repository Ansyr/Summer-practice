from rest_framework import generics
from praktika.models import Location
from praktika.serializators.location import LocationSerializer


class LocationAPIList(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer


class LocationAPIDestroy(generics.RetrieveUpdateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer

