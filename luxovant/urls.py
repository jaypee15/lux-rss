from django.urls import path, include
from rest_framework import routers
from rss_feed.views import FeedViewSet, ArticleViewSet

from django.contrib import admin
router = routers.DefaultRouter()
router.register(r'feeds', FeedViewSet)
router.register(r'articles', ArticleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls'))
]
