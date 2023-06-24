from django.contrib import admin

from .models import Author, UserInfo, Sale, Region, Location, Education, Book

# Register your models here.
admin.site.register(Author)
admin.site.register(Book)
admin.site.register(Education)
admin.site.register(Location)
admin.site.register(Region)
admin.site.register(Sale)
admin.site.register(UserInfo)