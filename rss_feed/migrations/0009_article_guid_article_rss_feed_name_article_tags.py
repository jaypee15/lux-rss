# Generated by Django 4.2.2 on 2023-07-03 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rss_feed', '0008_alter_article_feed'),
    ]

    operations = [
        migrations.AddField(
            model_name='article',
            name='guid',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='article',
            name='rss_feed_name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AddField(
            model_name='article',
            name='tags',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
