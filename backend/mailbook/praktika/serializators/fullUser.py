from rest_framework import serializers
from praktika.models import Book, Sale, Author

from praktika.serializators.author import AuthorSerializer
from praktika.serializators.sale import SaleSerializer


class BookFullInfoSerializer(serializers.ModelSerializer):
    price = SaleSerializer()
    author = AuthorSerializer()

    class Meta:
        model = Book
        fields = '__all__'

    def create(self, validated_data):
        price_data = validated_data.pop('price')
        price = Sale.objects.create(**price_data)
        author_data = validated_data.pop('author')
        author = Author.objects.create(**author_data)
        book_info = Book.objects.create(book_name=validated_data.pop('book_name'),
                                        publish_year=validated_data.pop('publish_year'),
                                        price=price,
                                        author=author)
        return book_info

    def save(self, **kwargs):
        print(kwargs)
        return super().save(**kwargs)