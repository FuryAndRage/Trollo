from django.urls import path
from . import views



urlpatterns = [
    path('all/', views.CardCreateList.as_view()),
    path('updelete/<int:pk>/', views.CardUpdateDelete.as_view())
]