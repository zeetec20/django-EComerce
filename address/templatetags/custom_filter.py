from django import template

register = template.Library()

@register.filter(name='mathMinus')
def mathMinus(value, input):
    data = value
    data -= input
    return data

@register.filter(name='mathPlus')
def mathPlus(value, input):
    data = value
    data += input
    return data