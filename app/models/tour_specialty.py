from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

Base = declarative_base()

tour_specialty = db.Table(
    "tour_specialties",
    Base.metadata,
    Column("specialty_id", ForeignKey("specialties.id"), primary_key=True),
    Column("tour_id", ForeignKey("tour_guides.id"), primary_key=True))