from pydantic import BaseModel
from datetime import date

class EntryCreate(BaseModel):
    title: str
    amount: float
    type: str

class EntryResponse(EntryCreate):
    id: int
    date: date

    class Config:
        from_attributes = True