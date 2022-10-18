# Generated by Django 3.2.15 on 2022-10-18 09:47

import django.contrib.postgres.search
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import pint.core.db.fields
import pint.core.utils.editorjs
import pint.core.utils.json_serializer


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Initiative',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('private_metadata', models.JSONField(blank=True, default=dict, encoder=pint.core.utils.json_serializer.CustomJsonEncoder, null=True)),
                ('metadata', models.JSONField(blank=True, default=dict, encoder=pint.core.utils.json_serializer.CustomJsonEncoder, null=True)),
                ('seo_title', models.CharField(blank=True, max_length=70, null=True, validators=[django.core.validators.MaxLengthValidator(70)])),
                ('seo_description', models.CharField(blank=True, max_length=300, null=True, validators=[django.core.validators.MaxLengthValidator(300)])),
                ('title', models.CharField(max_length=250)),
                ('slug', models.SlugField(allow_unicode=True, max_length=255, unique=True)),
                ('description_plaintext', models.TextField(blank=True)),
                ('search_document', models.TextField(blank=True, default='')),
                ('search_vector', django.contrib.postgres.search.SearchVectorField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('updated_at', models.DateTimeField(auto_now=True, db_index=True)),
            ],
            options={
                'ordering': ('slug',),
                'permissions': (('manage_initiatives', 'Manage initiatives.'),),
            },
        ),
        migrations.CreateModel(
            name='PoliticalEntity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('private_metadata', models.JSONField(blank=True, default=dict, encoder=pint.core.utils.json_serializer.CustomJsonEncoder, null=True)),
                ('metadata', models.JSONField(blank=True, default=dict, encoder=pint.core.utils.json_serializer.CustomJsonEncoder, null=True)),
                ('seo_title', models.CharField(blank=True, max_length=70, null=True, validators=[django.core.validators.MaxLengthValidator(70)])),
                ('seo_description', models.CharField(blank=True, max_length=300, null=True, validators=[django.core.validators.MaxLengthValidator(300)])),
                ('name', models.CharField(max_length=255)),
            ],
            options={
                'permissions': (('manage_political_entities', 'Manage political entities.'),),
            },
        ),
        migrations.CreateModel(
            name='InitiativeMedia',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sort_order', models.IntegerField(db_index=True, editable=False, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='initiatives')),
                ('alt', models.CharField(blank=True, max_length=128)),
                ('type', models.CharField(choices=[('IMAGE', 'An uploaded image or an URL to an image'), ('VIDEO', 'A URL to an external video')], default='IMAGE', max_length=32)),
                ('external_url', models.CharField(blank=True, max_length=256, null=True)),
                ('oembed_data', models.JSONField(blank=True, default=dict)),
                ('to_remove', models.BooleanField(default=False)),
                ('initiative', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='media', to='initiative.initiative')),
            ],
            options={
                'ordering': ('sort_order', 'pk'),
            },
        ),
        migrations.CreateModel(
            name='InitiativeTranslation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('language_code', models.CharField(max_length=35)),
                ('seo_title', models.CharField(blank=True, max_length=70, null=True, validators=[django.core.validators.MaxLengthValidator(70)])),
                ('seo_description', models.CharField(blank=True, max_length=300, null=True, validators=[django.core.validators.MaxLengthValidator(300)])),
                ('name', models.CharField(blank=True, max_length=250, null=True)),
                ('description', pint.core.db.fields.SanitizedJSONField(blank=True, null=True, sanitizer=pint.core.utils.editorjs.clean_editor_js)),
                ('initiative', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='translations', to='initiative.initiative')),
            ],
            options={
                'unique_together': {('language_code', 'initiative')},
            },
        ),
    ]
