from rest_framework import viewsets
from rest_framework import permissions

# Create your views here.
from .models import Post, Comment
from .serializer import PostSerializer, CommentSerializer


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [permissions.IsAuthenticatedOrReadOnly]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    authentication_classes = [permissions.IsAuthenticatedOrReadOnly]

