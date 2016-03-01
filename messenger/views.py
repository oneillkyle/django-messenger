import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.views.generic import View
from django.contrib.auth.models import User
from django.core import serializers
from django.forms.models import model_to_dict
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.db.models import Q
from django.core.serializers.json import DjangoJSONEncoder
from ws4redis.publisher import RedisPublisher
from ws4redis.redis_store import RedisMessage

from messenger.models import Message as MessageModel
from messenger.forms import MessageForm

class Index(TemplateView):
    template_name = "index.html"

class Message(View):
    def get(self, request, *args, **kwargs):
        messages = MessageModel.objects.filter(
            Q(sender=request.user, receiver__username=request.GET.get('username')) | Q(receiver=request.user, sender__username=request.GET.get('username'))
        )[:10][::-1]
        response = [{'message': m.message, 'sent_at': m.sent_at, 'sent': m.sender.id == request.user.id or False} for m in messages]
        return JsonResponse({'messages': response})

    def post(self, request, *args, **kwargs):
        post_data = json.loads(request.body)
        form = MessageForm(post_data)
        if form.is_valid():
            receiver = User.objects.get(username=form.cleaned_data['username'])
            message = MessageModel.objects.create(sender=request.user, receiver=receiver, message=form.cleaned_data['message'])
        else:
            response = JsonResponse({})
            response.status_code = 500
            return response

        redis_publisher = RedisPublisher(facility='messages', users=[request.user.username, receiver.username])
        redis_json = json.dumps({
            'message':message.message,
            'sent_at':message.sent_at,
            'sender': message.sender.username}, cls=DjangoJSONEncoder)
        redis_message = RedisMessage(str(redis_json))
        redis_publisher.publish_message(redis_message)
        return JsonResponse(model_to_dict(message))


class UserList(View):
    def get(self, request, *args, **kwargs):
        users = {
            'users': [{'username': user.username} for user in User.objects.all().exclude(username=request.user.username)]
        }
        return JsonResponse(users)

class Authenticate(View):
    def get(self, request, *args, **kwargs):
        response = {}
        response['authenticated'] = request.user.is_authenticated()
        return JsonResponse(response)

    def post(self, request, *args, **kwargs):
        data = {}
        post_data = json.loads(request.body) if request.body else {}
        form = AuthenticationForm(request, post_data)
        if form.is_valid():
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password'])
        else:
            user = None

        status_code = 401
        if user is not None:
            if user.is_active:
                login(request, user)
                status_code = 200
                # Redirect to a success page.
            else:
                data['message'] = 'Disabled Account'
                # Return a 'disabled account' error message
                status_code = 401
        else:
            data['message'] = 'Invalid Credentials'
            # Return an 'invalid login' error message.
            status_code = 401

        response = JsonResponse(data)
        response.status_code = status_code
        return response

class Register(View):
    def post(self, request, *args, **kwargs):
        post_data = json.loads(request.body)
        form = UserCreationForm(post_data)
        status_code = 400
        data = {}
        if form.is_valid():
            User.objects.create_user(form.cleaned_data['username'], password=form.cleaned_data['password1'])
            user = authenticate(username=form.cleaned_data['username'], password=form.cleaned_data['password1'])
            login(request, user)
            status_code = 202
        else:
            data['errors'] = form.errors

        response = JsonResponse(data)
        response.status_code = status_code
        return response

class Logout(View):
    def post(self, request, *args, **kwargs):
        logout(request)
        return JsonResponse({'authenticated': False})
