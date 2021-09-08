from django.contrib.auth.models import User
from .models import Post, Comment
from rest_framework import serializers


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('author', 'id', 'title', 'body', 'created_at', 'modified_at')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        field = '__all__'

