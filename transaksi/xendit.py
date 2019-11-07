import uuid
import requests

def makeInvoice(id, payerEmail, description, amount):
    data = {
        'external_id': id,
        'payer_email': payerEmail,
        'description': description,
        'amount': amount,
        'should_send_email': 'true',
        #'success_redirect_url': '',
        #'failure_redirect_url': '',
    }
    response = requests.post('https://api.xendit.co/v2/invoices', data=data, auth=('xnd_development_O46JfOtygef9kMNsK+ZPGT+ZZ9b3ooF4w3Dn+R1k+2fT/7GlCAN3jg==', ''))
    url = response.json()
    print(url)
    data = {
        'invoiceUrl': url['invoice_url'],
        'id': url['external_id'],
        'raw': url
    }
    return data

# { SAMPLE RETURN JSON
#     'id': '5dc318d6dbc24572692f5972',
#     'external_id': '3525',
#     'user_id': '57fdbb445eec38910d3a4c47',
#     'status': 'PENDING',
#     'merchant_name': 'Your Company',
#     'merchant_profile_picture_url': 'https://xnd-companies.s3.amazonaws.com/prod/1476344224287_930.png',
#     'amount': 2000000,
#     'payer_email': 'firjusles@gmail.com',
#     'description': 'description',
#     'expiry_date': '2019-11-07T19:02:46.281Z',
#     'invoice_url': 'https://invoice-staging.xendit.co/web/invoices/5dc318d6dbc24572692f5972',
#     'available_banks': [{
#         'bank_code': 'MANDIRI',
#         'collection_type': 'POOL',
#         'bank_account_number': '8860839531539',
#         'transfer_amount': 2000000,
#         'bank_branch': 'Virtual Account',
#         'account_holder_name': 'YOUR COMPANY',
#         'identity_amount': 0
#     }, {
#         'bank_code': 'BRI',
#         'collection_type': 'POOL',
#         'bank_account_number': '2621547352588',
#         'transfer_amount': 2000000,
#         'bank_branch': 'Virtual Account',
#         'account_holder_name': 'YOUR COMPANY',
#         'identity_amount': 0
#     }, {
#         'bank_code': 'BNI',
#         'collection_type': 'POOL',
#         'bank_account_number': '880847211827',
#         'transfer_amount': 2000000,
#         'bank_branch': 'Virtual Account',
#         'account_holder_name': 'YOUR COMPANY',
#         'identity_amount': 0
#     }, {
#         'bank_code': 'PERMATA',
#         'collection_type': 'POOL',
#         'bank_account_number': '821449116821',
#         'transfer_amount': 2000000,
#         'bank_branch': 'Virtual Account',
#         'account_holder_name': 'YOUR COMPANY',
#         'identity_amount': 0
#     }],
#     'available_ewallets': [],
#     'should_exclude_credit_card': False,
#     'should_send_email': True,
#     'created': '2019-11-06T19:02:46.525Z',
#     'updated': '2019-11-06T19:02:46.525Z',
#     'currency': 'IDR'
# }