from django.db import models


class Region(models.Model):
    name = models.CharField(verbose_name="Название")

    def __str__(self):
        return self.name
