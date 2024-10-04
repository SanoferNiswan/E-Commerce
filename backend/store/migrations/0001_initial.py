# Generated by Django 5.1.1 on 2024-09-27 12:56

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('category_id', models.AutoField(primary_key=True, serialize=False)),
                ('category_name', models.CharField(max_length=255)),
                ('created_time', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'categories',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('product_id', models.AutoField(primary_key=True, serialize=False)),
                ('product_name', models.CharField(max_length=255)),
                ('image_url', models.CharField(max_length=255, null=True)),
                ('mrp', models.DecimalField(decimal_places=2, max_digits=10)),
                ('discounted_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('product_count', models.IntegerField()),
                ('category_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='store.category')),
            ],
            options={
                'db_table': 'products',
            },
        ),
    ]
