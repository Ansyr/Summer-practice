import rest_framework as generics
from django.shortcuts import render
from django.contrib.auth import get_user_model
from rest_framework.viewsets import ModelViewSet

from praktika.models import Book, Education, Location, Author


# Create your views here.




class AuthorViewSet(ModelViewSet):
    queryset = Author.objects.all()