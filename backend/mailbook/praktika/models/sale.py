from django.db import models


class Sale(models.Model):
    discount = models.FloatField(null=True,verbose_name='Скидка')
    price = models.FloatField(null=True,verbose_name='Цена')
    amount = models.IntegerField(null=True,verbose_name='Количество')


    def __float__(self):
        return self.price
