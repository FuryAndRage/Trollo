from django.db import models
from trollo.apps.card.models import Card

class Task(models.Model):
    card = models.ForeignKey(Card, on_delete=models.CASCADE, related_name= 'card')
    conteudo = models.TextField()
    created = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.card}'