import sqlite3

conn = sqlite3.connect("entries.db")
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    amount INTEGER NOT NULL,
    type TEXT NOT NULL
)
""")

conn.commit()
conn.close()

print("✅ entries table created successfully")