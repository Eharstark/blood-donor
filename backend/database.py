import sqlite3
import os

DB_PATH = 'lifelink.db'

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db_connection()
    cursor = conn.cursor()

    # Donors Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS donors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER,
            gender TEXT,
            blood_group TEXT,
            phone TEXT,
            city TEXT,
            area TEXT,
            last_donation DATE,
            availability TEXT DEFAULT 'Available'
        )
    ''')

    # Hospitals Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS hospitals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')

    # Emergency Requests Table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS emergency_requests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            blood_group TEXT,
            message TEXT,
            hospital_name TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # Insert Default Hospital (hospital1 / 123456)
    # Using Werkzeug for hashing in a real app, 
    # but strictly following your 123456 requirement here for the demo.
    try:
        cursor.execute('INSERT INTO hospitals (username, password) VALUES (?, ?)', 
                       ('hospital1', '123456'))
    except sqlite3.IntegrityError:
        pass 

    conn.commit()
    conn.close()

if __name__ == "__main__":
    init_db()
