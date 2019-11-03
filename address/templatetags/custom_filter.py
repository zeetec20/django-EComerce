from django import template

register = template.Library()

@register.filter(name='mathMinus')
def mathMinus(value, input):
    data = value
    data = value - input
    
    return data