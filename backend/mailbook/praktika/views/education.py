from rest_framework import generics
from praktika.models import Education
from praktika.serializators.education import EducationSerializer


class EducationAPIList(generics.ListCreateAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class EducationAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer


class EducationAPIDestroy(generics.RetrieveUpdateAPIView):
    queryset = Education.objects.all()
    serializer_class = EducationSerializer

