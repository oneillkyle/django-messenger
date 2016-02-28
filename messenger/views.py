from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView
from django.views.generic import View
from django.contrib.auth.models import User
from django.core import serializers
from django.forms.models import model_to_dict
from django.contrib.auth import authenticate, login, logout

class Index(TemplateView):
    template_name = "index.html"

class UserList(View):
    def get(self, request, *args, **kwargs):
        users = {
            'users': [{'email': user.email} for user in User.objects.all()]
        }
        # susers = serializers.serialize("json", users)
        return JsonResponse(users)

class Authenticate(View):
    def get(self, request, *args, **kwargs):
        response = {}
        response['authenticated'] = request.user.is_authenticated()
        return JsonResponse(response)

    def post(self, request, *args, **kwargs):
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)
        status_code = 401
        data = {}
        if user is not None:
            if user.is_active:
                login(request, user)
                response.status_code = 200
                # Redirect to a success page.
            else:
                data['message'] = 'Disabled Account'
                # Return a 'disabled account' error message
                satus = 401
        else:
            data['message'] = 'Invalid Credentials'
            # Return an 'invalid login' error message.
            status = 401

        response = JsonResponse(data)
        response.status_code = status_code
        return response

class Register(View):
    # def get(self, request, *args, **kwargs):
    #     response = {}
    #     response['authenticated'] = request.user.is_authenticated()
    #     return JsonResponse(response)

    def post(self, request, *args, **kwargs):
        username = request.POST.get('username')
        password = request.POST.get('password')
        email = request.POST.get('email')
        return JsonResponse()
        user = authenticate(username=username, password=password)
        response = JsonResponse({})
        response.status_code = 401
        if user is not None:
            if user.is_active:
                login(request, user)
                response.status_code = 200
                # Redirect to a success page.
            else:
                # Return a 'disabled account' error message
                satus = 401
        else:
            # Return an 'invalid login' error message.
            status = 401

        return response

class Logout(View):
    def post(self, request, *args, **kwargs):
        logout(request)
