from django.db import models

class Card(models.Model):
    title = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
