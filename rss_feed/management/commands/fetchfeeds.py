# from django.core.management.base import BaseCommand
# import feedparser
# from rss_feed.models import Feed, Article
# from datetime import datetime, timezone
# from bs4 import BeautifulSoup
# import requests

# from apscheduler.schedulers.blocking import BlockingScheduler
# from apscheduler.triggers.cron import CronTrigger
# from django_apscheduler.jobstores import DjangoJobStore
# from django_apscheduler.models import DjangoJobExecution

# import logging
# logger = logging.getLogger(__name__)




    
   

# def get_image_from_meta( soup):
#     meta_tags = soup.find('meta', property='og:image')
#     if meta_tags:
#         return meta_tags['content']
#     return None

# def get_image_from_body( soup):
#     body_tag = soup.find('body')
#     if body_tag:
#         img_tag = soup.find('img')
#         if img_tag:
#             return img_tag['src']
#     return None

# def scrape_image( url):
#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser') 

#     image_url = get_image_from_meta(soup)
#     if not image_url:
#         image_url = get_image_from_body(soup)
#     return image_url   


# def get_tags( url, rss_tags):

#     response = requests.get(url)
#     soup = BeautifulSoup(response.content, 'html.parser') 

#     meta_article_tags = soup.find_all('meta', property='article:tag') 
#     html_tags = []
#     if meta_article_tags:
#         for tag in meta_article_tags:
#             html_tag = tag['content'].split(',')
#             html_tags.extend(html_tag)

        
#     logger.info(f'bs4 tags: {html_tags}')
#     combined_tags = list((set(rss_tags + html_tags)))

#     return combined_tags

    

# # def delete_old_job_executions(max_age=604_800):
# #     """Deletes all apscheduler job execution logs older than `max_age`."""
# #     DjangoJobExecution.objects.delete_old_job_executions(max_age)

# def fetch_and_parse_feeds(self):
#     feeds = Feed.objects.all() 
#     for feed in feeds:
#         try:
#             feed_data = feedparser.parse(feed.url) 
#         except Exception as e:
#             # better handling of exception
#             logger.info(f'An error occured: {str(e)}')
#         for entry in feed_data.entries:
#             guid = entry.get('id', None)
#             link = entry.link

#             # Check if the article with the same guid already exists in the database
#             if guid and Article.objects.filter(guid=guid).exists():
#                 logger.info(f'RSS feed {feed.title} with guid {guid} already exists in the database')
#                 continue

#             # Check if the article with the same link already exists in the database
#             if Article.objects.filter(url=link).exists():
#                 logger.info(f'RSS feed {feed.title} with link {link} already exists in the database')
#                 continue

#             title = entry.title
#             content = entry.summary
#             image = scrape_image(link)
#             rss_tags = entry.tags[0].term.split(',') if entry.tags else []
#             logger.info(f'rss tags for {feed.title}:{rss_tags}')
#             tags = get_tags(link, rss_tags)
#             logger.info(f'combined tags for {feed.title}:{tags}')

#             try:
#                 published_date = datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %z').replace(tzinfo=timezone.utc)
#             except ValueError:
#                 published_date = datetime.now(timezone.utc)

#             article = Article(title=title, content=content, published_date=published_date, url=link, image=image, tags=tags, feed=feed)
            
#             article.source_image = feed.source_image
#             article.rss_feed_name = feed.title
#             if guid:
#                 article.guid = guid
#             article.save()

#         logger.info(f'Successfully fetched and parsed RSS feeds for {feed.title}') # opposite  

 
  

            
# class Command(BaseCommand):
#     help = 'Run scheduler to fetch and parse RSS feeds'

#     def handle(self, *args, **options):
#             # Start the scheduler to fetch and parse feeds at 12-hour intervals
#             scheduler = BlockingScheduler(jobstores={'default': DjangoJobStore()})
#             scheduler.add_job(fetch_and_parse_feeds(self), trigger=CronTrigger(hour='*/12'))
#             scheduler.start()






from django.core.management.base import BaseCommand
import feedparser
from rss_feed.models import Feed, Article
from datetime import datetime, timezone
from bs4 import BeautifulSoup
import requests

import logging
logger = logging.getLogger(__name__)



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
    

    def get_tags(self, url, rss_tags):

        response = requests.get(url)
        soup = BeautifulSoup(response.content, 'html.parser') 

        meta_article_tags = soup.find_all('meta', property='article:tag') 
        html_tags = []
        if meta_article_tags:
            for tag in meta_article_tags:
                html_tag = tag['content'].split(',')
                html_tags.extend(html_tag)
    
            
        logger.info(f'bs4 tags: {html_tags}')
        combined_tags = list((set(rss_tags + html_tags)))

        return combined_tags
    
        

    def handle(self, *args, **options):
        feeds = Feed.objects.all() 
        for feed in feeds:
            try:
                feed_data = feedparser.parse(feed.url) 
            except Exception as e:
                # better handling of exception
                logger.error(f'An error occured: {str(e)}')
            for entry in feed_data.entries:
                guid = entry.get('id', None)
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
                # rss_tags = entry.tags[0].term.split(',') if entry.tags else []
                if hasattr(entry, 'tags') and entry.tags:
                    rss_tags = entry.tags[0].term.split(',')
                else:
                    rss_tags = []
                logger.info(f'rss tags for {feed.title}:{rss_tags}')
                tags = self.get_tags(link, rss_tags)
                logger.info(f'combined tags for {feed.title}:{tags}')

                try:
                    published_date = datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %z').replace(tzinfo=timezone.utc)
                except ValueError:
                    published_date = datetime.now(timezone.utc)

                article = Article(title=title, content=content, published_date=published_date, url=link, image=image, tags=tags, feed=feed)
                
                article.source_image = feed.source_image
                article.rss_feed_name = feed.title
                if guid:
                    article.guid = guid
                article.save()

            logger.info(f'Successfully fetched and parsed RSS feeds for {feed.title}') # opposite  


            
          

