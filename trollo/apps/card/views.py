from django.shortcuts import render
from rest_framework import generics
from . serializers import CardSerializer
from . models import Card


class CardCreateList(generics.ListCreateAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

class CardUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

def index(request):
    return render(request, 'index.html')