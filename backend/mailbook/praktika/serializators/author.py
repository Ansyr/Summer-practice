from rest_framework import serializers
from praktika.models import Author


class AuthorSerializer(serializers.ModelSerializer):
    # user = serializers.HiddenField(default=serializers.CurrentUserDefault(),required=False)

    class Meta:
        model = Author
        fields = "__all__"


