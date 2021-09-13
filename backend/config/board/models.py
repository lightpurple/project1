from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True, related_name='post')
    title = models.CharField(max_length=200)
    text = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    modified_at = models.DateField(auto_now=True)


class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comment')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=True, related_name='comment')
    text = models.CharField(max_length=200)
    created_at = models.DateField(auto_now_add=True)
