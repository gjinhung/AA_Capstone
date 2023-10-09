from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, SubmitField, DateField, TimeField
from wtforms.validators import DataRequired, NumberRange, Length

class BookingForm(FlaskForm):
    date = DateField('date', validators=[DataRequired()])
    time = TimeField('rating', validators=[DataRequired()])
    duration = FloatField('duration', validators=[DataRequired()])
    submit = SubmitField('Submit')