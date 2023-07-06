from rest_framework import serializers
from mailbook.praktika.models import UserInfo


class UserInfoSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = UserInfo
        fields = "__all__"