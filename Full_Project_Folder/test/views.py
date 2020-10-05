from django.shortcuts import render
from .forms import Form
from .models import Customer
import hashlib 
# Create your views here.
# from django.http import HttpResponse


# def index(request):
#     return HttpResponse("Congrats! You got something working!")

# GOAL IS TO RETURN TEMPLATE
def home(request):
    if request.method == 'POST':
        filled_form = Customer(request.POST)
        if filled_form.is_valid():
            password = filled_form.cleaned_data['text']
            password = hashlib.sha256(password.encode('utf-8')).hexdigest()
            try:
                Hash.objects.get(password=password)
            except Form.DoesNotExist: # if the object doesn't exist, then make a new object
                form = Form()
                form.password = password
                form.save()

    form = Form()
    return render(request, 'test/home.html', {'form': form})