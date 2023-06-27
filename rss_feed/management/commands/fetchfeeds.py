from django.core.management.base import BaseCommand
import feedparser
from rss_feed.models import Feed, Article
from datetime import datetime

class Command(BaseCommand):
    help = 'Fetches and parses RSS feeds'

    def handle(self, *args, **options):
        feeds = Feed.objects.all()
        for feed in feeds:
            feed_data = feedparser.parse(feed.url)
            for entry in feed_data.entries:
                title = entry.title
                content = entry.summary
                published_date = datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %z').strftime('%Y-%m-%d %H:%M:%S')
                article = Article(title=title, content=content, published_date=published_date, feed=feed)
                article.save()
            self.stdout.write(f'Successfully fetched and parsed RSS feeds for {feed.title}')
