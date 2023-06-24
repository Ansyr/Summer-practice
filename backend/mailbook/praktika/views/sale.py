from rest_framework import generics
from praktika.models import Sale
from praktika.serializators.education import EducationSerializer
from praktika.serializators.sale import SaleSerializer


class RegionAPIList(generics.ListCreateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


class RegionAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer


class RegionAPIDestroy(generics.RetrieveUpdateAPIView):
    queryset = Sale.objects.all()
    serializer_class = SaleSerializer
