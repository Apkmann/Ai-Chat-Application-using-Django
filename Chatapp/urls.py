from django.urls import path
from . import views
urlpatterns=[
    path('',views.ChatPage,name='Chatpage'),
    path('responseresult/',views.ResponseResult,name='ResponseResult'),
    path('Conversation_History/<int:chatid>',views.Conversation_History,name='Conversation_History')
]