# Generated by Django 4.2.2 on 2023-06-28 01:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rss_feed', '0005_alter_article_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='article',
            name='image',
            field=models.URLField(default=''),
        ),
    ]
