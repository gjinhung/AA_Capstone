from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

Base = declarative_base()

tour_date = db.Table(
    "tour_dates",
    Base.metadata,
    Column("date_id", ForeignKey("dates.id"), primary_key=True),
    Column("tour_id", ForeignKey("tour_guides.id"), primary_key=True))