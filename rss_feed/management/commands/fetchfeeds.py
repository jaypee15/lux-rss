from django.core.management.base import BaseCommand
import feedparser
from rss_feed.models import Feed, Article
from datetime import datetime, timezone
from bs4 import BeautifulSoup
import requests

class Command(BaseCommand):
    help = 'Fetches and parses RSS feeds'

    def get_image_from_meta(self, soup):
        meta_tags = soup.find('meta', property='og:image')
        if meta_tags:
            return meta_tags['content']
        return None

    def get_image_from_body(self, soup):
        body_tag = soup.find('body')
        if body_tag:
            img_tag = soup.find('img')
            if img_tag:
                return img_tag['src']
        return None

    def scrape_image(self, url):
        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser')

        image_url = self.get_image_from_meta(soup)
        if not image_url:
            image_url = self.get_image_from_body(soup)
        return image_url

    def handle(self, *args, **options):
        feeds = Feed.objects.all()
        for feed in feeds:
            feed_data = feedparser.parse(feed.url)
            for entry in feed_data.entries:
                guid = entry.get('guid', None)
                link = entry.link

                # Check if the article with the same guid already exists in the database
                if guid and Article.objects.filter(guid=guid).exists():
                    self.stdout.write(f'RSS feed {feed.title} with guid {guid} already exists in the database')
                    continue

                # Check if the article with the same link already exists in the database
                if Article.objects.filter(url=link).exists():
                    self.stdout.write(f'RSS feed {feed.title} with link {link} already exists in the database')
                    continue

                title = entry.title
                content = entry.summary
                image = self.scrape_image(link)

                try:
                    published_date = datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %z').replace(tzinfo=timezone.utc)
                except ValueError:
                    published_date = datetime.now(timezone.utc)

                article = Article(title=title, content=content, published_date=published_date, url=link, image=image, feed=feed)
                if guid:
                    article.guid = guid
                article.save()

            self.stdout.write(f'Successfully fetched and parsed RSS feeds for {feed.title}')
