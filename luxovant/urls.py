from django.urls import path, include
from rest_framework import routers
from rss_feed.views import FeedViewSet, ArticleViewSet

from django.contrib import admin

from django.conf import settings
from django.conf.urls.static import static

router = routers.DefaultRouter()
router.register(r'feeds', FeedViewSet)
router.register(r'articles', ArticleViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)