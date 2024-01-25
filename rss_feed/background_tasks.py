# your_app/background_tasks.py

from background_task import background
from django.core.management import call_command

@background(schedule=7200)  # 7200 seconds = 2 hours
def fetch_and_parse_feeds_task():
    call_command('python manage.py fetchfeeds')
