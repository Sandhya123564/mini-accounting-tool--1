from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB = "database.db"

def get_db():
    return sqlite3.connect(DB)

@app.on_event("startup")
def init_db():
    db = get_db()
    db.execute("""
        CREATE TABLE IF NOT EXISTS entries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            description TEXT,
            income REAL,
            expense REAL
        )
    """)
    db.commit()
    db.close()

@app.get("/entries")
def get_entries():
    db = get_db()
    rows = db.execute("SELECT * FROM entries").fetchall()
    db.close()

    return [
        {
            "id": r[0],
            "date": r[1],
            "description": r[2],
            "income": r[3],
            "expense": r[4],
        } for r in rows
    ]

@app.post("/entries")
def add_entry(entry: dict):
    db = get_db()
    db.execute(
        "INSERT INTO entries (date, description, income, expense) VALUES (?, ?, ?, ?)",
        (entry["date"], entry["description"], entry["income"], entry["expense"])
    )
    db.commit()
    db.close()
    return {"status": "saved"}

@app.delete("/entries/{id}")
def delete_entry(id: int):
    db = get_db()
    db.execute("DELETE FROM entries WHERE id=?", (id,))
    db.commit()
    db.close()
    return {"status": "deleted"}
    @app.get("/")
def home():
    return {"message": "Backend running successfully"}
