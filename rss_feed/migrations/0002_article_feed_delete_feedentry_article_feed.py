# Generated by Django 4.2.2 on 2023-06-27 11:03

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('rss_feed', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('content', models.TextField()),
                ('published_date', models.DateTimeField()),
            ],
        ),
        migrations.CreateModel(
            name='Feed',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('url', models.URLField(unique=True)),
            ],
        ),
        migrations.DeleteModel(
            name='FeedEntry',
        ),
        migrations.AddField(
            model_name='article',
            name='feed',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='rss_feed.feed'),
        ),
    ]