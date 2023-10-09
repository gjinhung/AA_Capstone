from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, FloatField
from wtforms.validators import DataRequired, NumberRange, Length

class TourGuideForm(FlaskForm):
    language = StringField('language', validators=[DataRequired(), ])
    price = FloatField('price', validators=[DataRequired()])
    about = StringField('about', validators=[DataRequired()])
    submit = SubmitField('Submit')