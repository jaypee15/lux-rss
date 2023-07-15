from django.db import models

class Feed(models.Model):
    title = models.CharField(max_length=200)
    url = models.URLField(unique=True)
    source_image = models.ImageField(blank=True, )
    

    def __str__(self):
        return self.title

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    published_date = models.DateTimeField()
    feed = models.ForeignKey(Feed, related_name='articles', on_delete=models.CASCADE)
    url = models.URLField(default='') #remove default and add unique
    image = models.URLField(blank=True, null=True)
    rss_feed_name = models.CharField(max_length=100, blank=True)
    guid = models.CharField(max_length=100, blank=True)
    tags = models.CharField(max_length=100, blank=True)
    source_image = models.URLField(blank=True)


    def __str__(self):
        return self.title
