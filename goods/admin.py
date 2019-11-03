from django.contrib import admin
from .models import SemuaJenis, Barang, SemuaBrand

class BarangAdmin(admin.ModelAdmin):
    
    def delete_queryset(self, requets, queryset):
        for obj in queryset:
            obj.delete()

admin.site.register(SemuaJenis)
admin.site.register(Barang)
admin.site.register(SemuaBrand)