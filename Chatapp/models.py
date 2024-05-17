from django.db import models

class ChatMessages(models.Model):
    title = models.CharField(max_length=50)
    chat_id = models.IntegerField(default=0)
    conversations = models.JSONField(default=list)
