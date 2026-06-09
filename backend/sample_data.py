from database import get_db_connection

def insert_samples():
    donors = [
        ('John Doe', 25, 'Male', 'O+', '555-0199', 'New York', 'Manhattan', '2023-01-10', 'Available'),
        ('Jane Smith', 19, 'Female', 'A-', '555-0288', 'New York', 'Brooklyn', '2024-05-15', 'Available'),
        ('Mike Ross', 30, 'Male', 'B+', '555-0377', 'Chicago', 'Downtown', '2024-02-01', 'Available'),
        ('Sarah Connor', 17, 'Female', 'O-', '555-0466', 'Los Angeles', 'Quarry', '2024-01-01', 'Available') # Underage
    ]
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.executemany('''
        INSERT INTO donors (name, age, gender, blood_group, phone, city, area, last_donation, availability)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', donors)
    conn.commit()
    conn.close()
    print("Sample donors inserted.")

if __name__ == "__main__":
    insert_samples()
