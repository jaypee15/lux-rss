from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rss_feed.models import Feed, Article

class FeedAPITestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.feed = Feed.objects.create(title='Example Feed', url='http://example.com/rss')

    def test_get_all_feeds(self):
        response = self.client.get(reverse('feed-list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], self.feed.title)

    def test_get_feed_detail(self):
        response = self.client.get(reverse('feed-detail', args=[self.feed.id]))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['title'], self.feed.title)

    # Write similar tests for article endpoints
