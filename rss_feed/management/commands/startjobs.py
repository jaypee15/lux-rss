
import logging

# Django
from django.conf import settings
from django.core.management.base import BaseCommand

# Third Party
import feedparser
from dateutil import parser
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution

import requests
import re
from datetime import datetime, timezone

# Models
from rss_feed.models import Article


logger = logging.getLogger(__name__)


def save_new_articles(feed):
    """Saves new articles to the database.

    Checks the article GUID against the articles currently stored in the
    database. If not found, then a new `Feed` is added to the database.

    Args:
        feed: requires a feedparser object   
    """
    article_image =''
    media_url = ''
    enclosure_href = ''
    parser_ = ''
    raw = ''
    try:
        response = requests.get(feed)

        if response and response.status_code == 200:
            raw = response.text

        else:
            pass

    except (requests.exceptions.ConnectionError, requests.exceptions.MissingSchema):
        pass

    # if raw <item>'s have a '<image> ... </image>' pattern extract the image url and
    # put this image url in an <enclosure /> tag which can be handled by feedparser
    raw = re.sub(r'(<item>.*?)<image>.*?(http.*?jpg|png|gif).*?</image>(.*?</item>)',
                r'\1<enclosure url="\1" />\3', raw)

    # some url give an empty raw string, in that case parse with the url instead of 
    # the raw string
    if raw:
        parser_ = feedparser.parse(raw)

    else:
        parser_ = feedparser.parse(feed)


    for entry in parser_.entries:
        if entry.enclosures:
            enclosure_href = entry.enclosures[0]['href']

        else:
            enclosure_href = ''

        # check if there is media_content
        try:
            media_url = entry.media_content[0]['url']

        except (AttributeError, IndexError):
            media_url = ''

        #use the enclosure_href for the image if it exists, else use the media_url
        if enclosure_href:
            article_image = enclosure_href
        else:
            article_image = media_url

        try:
            published_date = datetime.strptime(entry.published, '%a, %d %b %Y %H:%M:%S %z').replace(tzinfo=timezone.utc)
        except ValueError:
            published_date =datetime.now(timezone.utc)
            
        

        rss_feed_title = parser_.channel.title  
        if not Article.objects.filter(guid=entry.guid).exists() :
            article = Article(
                title=entry.title,
                content = entry.summary,
                url=entry.link,
                published_date= published_date,
                image=article_image,
                rss_feed_name=rss_feed_title,
                guid=entry.guid,
                tags=entry.tags[0].term
            )
            article.save()



def fetch_entrepreneur_articles():
    """Fetches new feed from Entrepreneur.com RSS feed."""
    _feed = "https://www.entrepreneur.com/latest.rss"
    save_new_articles(_feed)


def fetch_punch_technology_articles():
    """Fetches new feed from punch RSS feed."""
    _feed = "https://punchng.com/category/business/technology/"
    save_new_articles(_feed)


def fetch_tech_point_africa_articles():
    """Fetches new feed from techpoint RSS feed."""
    _feed = "https://techpoint.africa/feed/"
    save_new_articles(_feed)


def delete_old_job_executions(max_age=24_800):
    """Deletes all apscheduler job execution logs older than `max_age`."""
    DjangoJobExecution.objects.delete_old_job_executions(max_age)

