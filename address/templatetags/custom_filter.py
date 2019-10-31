from django import template


register = template.Library()


@register.filter(name='match')
def match(value, input):
    data = value
    if len(input.split(' ')) == 2:
        operation   = input.split(' ')[0]
        number      = int(input.split(' ')[1])
        if operation == '*':
            data = value * number
        elif operation == '/':
            data = value / number
        elif operation == '+':
            data = value + number
        elif operation == '-':
            data = value - number
    
    return data