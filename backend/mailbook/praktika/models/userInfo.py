from django.db import models


class UserInfo(models.Model):
    birth_date = models.DateField(verbose_name="Дата рождения")
    location = models.ForeignKey("Location",verbose_name="Адрес",on_delete=models.CASCADE)
    education = models.OneToOneField("Education",verbose_name="Образование",on_delete=models.CASCADE)

    def __str__(self):
        return str(self.birth_date)
