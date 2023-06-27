from rest_framework import viewsets
from rss_feed.models import Feed, Article
from rss_feed.serializers import FeedSerializer, ArticleSerializer

class FeedViewSet(viewsets.ModelViewSet):
    queryset = Feed.objects.all()
    serializer_class = FeedSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
