from django.shortcuts import render
from . import countries_data
from django.utils.html import format_html
from i2amparis_main.models import ModelsInfo, Harmonisation_Variables, HarmData
from django.core.mail import send_mail
from .forms import FeedbackForm
from django.http import JsonResponse
from django.core import serializers

import json
import urllib

from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib import messages


def landing_page(request):
    print ('Landing page')
    return render(request, 'i2amparis_main/landing_page.html')

def overview_comparative_assessment_doc(request):
    print('Overview Comparative Assessment')
    return render(request, 'i2amparis_main/overview_comparative_assessment_landing_page.html')


def overview_comparative_assessment_doc_global(request):
    print('Overview Comparative Assessment Global')
    return render(request, 'i2amparis_main/overview_comparative_assessment_global.html')


def overview_comparative_assessment_doc_national_eu(request):
    print('Overview Comparative Assessment National EU')
    return render(request, 'i2amparis_main/overview_comparative_assessment_eu.html')


def overview_comparative_assessment_doc_national_oeu(request):
    print('Overview Comparative Assessment National O_EU')
    return render(request, 'i2amparis_main/overview_comparative_assessment_oeu.html')

def paris_reinforce_workspace(request):
    models = ModelsInfo.objects.all().filter(harmonisation=True).order_by('model_title')
    variables = Harmonisation_Variables.objects.all().order_by('var_title')
    var_mod_data = HarmData.objects.all()
    var_mod = []
    for el in var_mod_data:
        dict_el = {
            "model": el.model.model_name,
            "var": el.variable.var_name,
            "var_unit": el.var_unit,
            "var_source_info": el.var_source_info,
            "var_timespan": el.var_timespan
        }
        var_mod.append(dict_el)

    context = {"models": models,
               "variables": variables,
               "var_mod": var_mod}
    return render(request, 'i2amparis_main/paris_reinforce_workspace.html', context)

def detailed_model_doc(request,model=''):
    if model == '':
        print('Detailed Model Documentation')
        list_of_models = ModelsInfo.objects.all()
        sel_icons = 'rev_icons'
        context = {
            'model_list': list_of_models,
            'sel_icons': sel_icons
        }
        return render(request, 'i2amparis_main/detailed_model_documentation_landing_page.html',context)
    else:
        category = ModelsInfo.objects.get(model_name=model).coverage
        list_of_cat_models = ModelsInfo.objects.filter(coverage=category)
        print(category)
        print(list_of_cat_models)
        model_dict = []
        for el in list_of_cat_models:
            model_obj = {}
            model_obj['name'] = el.model_name
            model_obj['title'] = el.model_title
            model_obj['harmonisation'] = el.harmonisation
            model_dict.append(model_obj)
        print(model_dict)
        if category == 'global':
            menu_cat = 'Other Global Models'
        elif category == 'national_eu':
            menu_cat = 'Other National / Regional Models for Europe'
        else:
            menu_cat = 'Other National / Regional Models for countries outside Europe'

        return render(request, 'i2amparis_main/detailed_'+model+'.html',context={'menu_models':model_dict,'coverage':menu_cat})

def dynamic_doc(request, model=''):

    template_format = request.GET.get('format')
    db = countries_data.RetriveDB(model)
    data = db.create_json()
    list_of_models = db.create_models_btn()
    sel_model_long_description = ModelsInfo.objects.get(id=db.model_id).long_description
    print(db.retrieve_granularity)
    sel_icons = 'rev_icons'
    context = {
        'data': data,
        'buttons': list_of_models,
        'granularities': db.retrieve_granularity,
        'selected_model_name': ModelsInfo.objects.get(id=db.model_id).model_name,
        'selected_model_title': ModelsInfo.objects.get(id=db.model_id).model_title,
        'selected_model_description':sel_model_long_description,
        'template_format': template_format,
        'sel_icons':sel_icons
    }
    if template_format is not None:
        template = 'i2amparis_main/dynamic_documentation_final' + template_format + '.html'
    else:
        template = 'i2amparis_main/dynamic_documentation_final.html'
    return render(request, template, context)


def contact_form(request):
    if request.method == 'POST':
        form = FeedbackForm(request.POST)
        if form.is_valid():
            # This can be used to send an email to inform us about the newly submitted feedback.
            username = form.cleaned_data['username']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            email_text = str(username) + ' submitted his/her feedback on I2AM Paris Platform:' + \
                         '\nSubject: "' + str(subject) + '"\nMessage: ' + str(message) + '"\n\n Contact e-mail: ' + str(email)

            ''' Begin reCAPTCHA validation '''
            recaptcha_response = request.POST.get('g-recaptcha-response')
            url = 'https://www.google.com/recaptcha/api/siteverify'

            values = {
                'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
                'response': recaptcha_response
            }
            data = urllib.parse.urlencode(values).encode()
            req = urllib.request.Request(url, data=data)
            response = urllib.request.urlopen(req)
            result = json.loads(response.read().decode())
            ''' End reCAPTCHA validation '''

            if result['success']:
                form.save()
                messages.success(request, 'New comment added with success!')
                send_mail(str(username) + "'s Feedback on I2AM Paris Platform", email_text, 'noreply@epu.ntua.gr',
                          ['iam@paris-reinforce.eu', 'paris.reinforce@gmail.com'],
                          fail_silently=False)
                return JsonResponse({'status': 'OK'})
            else:
                messages.error(request, 'Invalid reCAPTCHA. Please try again.')
                return JsonResponse({'status': 'NOT_OK'})










