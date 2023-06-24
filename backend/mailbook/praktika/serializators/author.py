from rest_framework import serializers
from mailbook.praktika.models import Author


class AuthorSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Author
        fields = "__all__"