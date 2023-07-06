import re

from django.core.exceptions import ValidationError
from django.db import models


def validate_phone_number(value):
    if not re.compile(r'7?\d{10}$').match(value):
        raise ValidationError("Phone number must be entered in the format: '+999999999'. Up to 15 digits is allowed.")


class CustomUser(models.Model):
    lastname = models.CharField(max_length=255, verbose_name="Фамилия")
    firstname = models.CharField(max_length=255, verbose_name="Имя")
    surname = models.CharField(max_length=255, verbose_name="Отчество")
    phone_number = models.CharField(verbose_name="Номер телефона", validators=[validate_phone_number])
    user_info = models.OneToOneField("UserInfo", verbose_name="Доп. информация о пользователе",
                                     on_delete=models.CASCADE)
    book = models.ForeignKey("Book", verbose_name="Книга", on_delete=models.CASCADE)

    def __str__(self):
        return self.lastname
