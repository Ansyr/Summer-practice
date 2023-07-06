from django.contrib.auth import get_user_model
from django.db import models


class Book(models.Model):
    author = models.ForeignKey("Author", on_delete=models.CASCADE, null=True, verbose_name='Автор книги')
    book_name = models.CharField(max_length=255, verbose_name="Название книги")
    price = models.OneToOneField('Sale', verbose_name="Цена", on_delete=models.CASCADE)
    publish_year = models.IntegerField(verbose_name="Дата публикации")

    def __str__(self):
        return self.book_name
