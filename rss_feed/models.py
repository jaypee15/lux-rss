from django.db import models

class Feed(models.Model):
    title = models.CharField(max_length=200)
    url = models.URLField(unique=True)

    def __str__(self):
        return self.title

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    description= models.TextField(default='') #remove -> same as summary
    published_date = models.DateTimeField()
    feed = models.ForeignKey(Feed, related_name='articles', on_delete=models.CASCADE)
    url = models.URLField(default='') #remove default and add unique
    image = models.URLField(blank=True, null=True)



    def __str__(self):
        return self.title
