from django.db import models


class Education(models.Model):
    degree_education = models.CharField(verbose_name="Степень образования",max_length=255)


    def __str__(self):
        return self.degree_education
