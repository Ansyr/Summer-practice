from django.db import models


class Book(models.Model):
    author = models.ForeignKey("Author", on_delete=models.CASCADE, null=True, verbose_name='Автор книги')
    book_name = models.CharField(max_length=255)
    price = models.FloatField(verbose_name="Цена",default=0)
    publish_year = models.IntegerField(verbose_name="Дата публикации")

    def __str__(self):
        return self.book_name
