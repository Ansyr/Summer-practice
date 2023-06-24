from django.db import models


class Author(models.Model):
    lastname = models.CharField(max_length=255,verbose_name="Фамилия")
    firstname = models.CharField(max_length=255,verbose_name="Имя")
    surname = models.CharField(max_length=255,verbose_name="Отчество")

    def __str__(self):
        return self.lastname
