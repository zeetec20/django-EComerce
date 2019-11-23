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

@register.filter
def mathMultiplication(value, input):
    return value * int(input)

@register.filter
def split(value, input):
    return value.split(input)

@register.filter
def length(value):
    return len(value)

@register.filter(name='splitSpace')
def splitSpace(value, input):
    return value.split(' ')[input - 1]

@register.filter(name='parse')
def parse(value, input):
    if input == 'int':
        value = int(value)
    if input == 'float':
        value = float(value)
    if input == 'string':
        value = str(value)
    return value

@register.filter
def zipSplitSpace(value, input):
    input = input.split(' ')
    intInput = []
    for inp in input:
        intInput.append(int(inp))
    return [value, intInput]

@register.filter
def index(value, input):
    return value[input - 1]