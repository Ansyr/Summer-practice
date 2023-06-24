from django.contrib.auth import get_user_model
from django.db import models


class UserInfo(models.Model):
    user = models.OneToOneField(get_user_model(),verbose_name="Пользователь",on_delete=models.CASCADE)
    birth_date = models.DateTimeField(verbose_name="Дата рождения")
    location = models.ForeignKey("Location",verbose_name="Адрес",on_delete=models.CASCADE)
    education = models.OneToOneField("Education",verbose_name="Образование",on_delete=models.CASCADE)

    def __str__(self):
        return self.birth_date
