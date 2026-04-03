from sqlalchemy import Column, Integer, String, Float, Date
from datetime import date 
from database import Base

class Entry(Base):
    __tablename__ = "entries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    type = Column(String, nullable=False)  # income / expense
    date = Column(Date, default=date.today)