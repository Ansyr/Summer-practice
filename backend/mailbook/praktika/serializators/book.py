from rest_framework import serializers
from mailbook.praktika.models import Book


class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = "__all__"