from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .models import Task
from .serializers import TaskSerializer
from trollo.apps.card.models import Card

class TaskListCreate(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    # def get_queryset(self, request, format=None, *args, **kwargs):
    #     obj = get_object_or_404(Card, kwargs.get())
    #     return super().get_queryset()

class TaskUpdateDelete(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
