from django import forms

class Form(forms.Form):
    text = forms.CharField(label='Enter text here: ', widget=forms.Textarea)