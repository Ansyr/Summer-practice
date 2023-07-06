from django.db import models


class Location(models.Model):
    region = models.OneToOneField("Region",verbose_name="Регион",on_delete=models.CASCADE)
    city = models.CharField(max_length=255,verbose_name="Город")
    microdistrict = models.CharField(max_length=255,verbose_name="Микрорайон")
    house_num = models.IntegerField(verbose_name="Номер дома")
    apartment = models.IntegerField(verbose_name="Номер квартиры")


    def __str__(self):
        return f'{self.city} {self.microdistrict}'
