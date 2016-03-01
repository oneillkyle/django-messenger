from django import forms

class MessageForm(forms.Form):
    username = forms.CharField()
    message = forms.CharField(max_length=250)
