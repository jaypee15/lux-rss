from django.core.management.base import BaseCommand
import feedparser
from rss_feed.models import Feed, Article
from datetime import datetime, timezone

class Command(BaseCommand):
    help = 'Fetches and parses RSS feeds'

    def handle(self, *args, **options):
        feeds = Feed.objects.all()
        for feed in feeds:
            feed_data = feedparser.parse(feed.url)
            for entry in feed_data.entries:
                
                print(entry.enclosures)
                if entry.enclosures:
                    enclosure_href = entry.enclosures[0].get('url')
                    print(enclosure_href)

                else:
                    enclosure_href = None
                    

                    #check if the entry has media_content
                try:
                    media_url = entry.get("media_content_url")

                except (AttributeError, IndexError):
                    media_url = ''

                #use enclosure_href fo image if it exists, else use media_url
                if enclosure_href is not None:
                    article_image =enclosure_href
                else:
                    article_image = media_url
                #bug: enclosure_href will always exist because of the conditional, media_url will never be used
                    
                title = entry.title
                link = entry.link
                description = entry.description
                content = entry.summary
                image = article_image
                try:
                    published_date = datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %z').replace(tzinfo=timezone.utc)
                except ValueError:
                    published_date =datetime.now(timezone.utc)
                article = Article(title=title, content=content, published_date=published_date, url=link, description=description, image=image, feed=feed)

                article.save()
        
            self.stdout.write(f'Successfully fetched and parsed RSS feeds for {feed.title}')
