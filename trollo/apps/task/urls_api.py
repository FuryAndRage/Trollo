from django.urls import path
from . import views

urlpatterns = [
    path('all/', views.TaskListCreate.as_view()),
    path('updelete/<int:pk>/', views.TaskUpdateDelete.as_view())
]