import json
from pathlib import Path

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView

from praktika.models import Book
from praktika.serializators.book import BookSerializer
from praktika.serializators.fullUser import BookFullInfoSerializer


class BookAPIList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookAPIUpdate(generics.RetrieveUpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


class BookAPIDestroy(generics.RetrieveUpdateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer


# class BookAuthorAPI(generics.CreateAPIView):
#     queryset = Book.objects.all()
#     serializer_class = BookFullInfoSerializer
#     def create(self, request, *args, **kwargs):
#         return Response(data = json.loads((Path(__file__).parent/"allBook.json").read_text()))

class BookAuthorAPI(APIView):
    def post(self, request, *args, **kwargs):
        return Response(data=json.loads((Path(__file__).parent / "allBook.json").read_text()))

    def get(self, request, pk=None, *args, **kwargs):
        if pk:
            return Response(data=json.loads((Path(__file__).parent / "oneBookInfo.json").read_text()))

        return Response(data=json.loads((Path(__file__).parent / "allBook.json").read_text()))

    def delete(self, request, *args, **kwargs):
        return Response(data=json.loads((Path(__file__).parent / "allBook.json").read_text()))
