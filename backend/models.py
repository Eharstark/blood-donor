from database import get_db_connection
from eligibility import is_eligible

class DonorModel:
    @staticmethod
    def create(data):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO donors (name, age, gender, blood_group, phone, city, area, last_donation, availability)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (data['name'], data['age'], data['gender'], data['blood_group'], 
              data['phone'], data['city'], data['area'], data['last_donation'], data['availability']))
        conn.commit()
        conn.close()

    @staticmethod
    def search_eligible(blood_group, city):
        conn = get_db_connection()
        cursor = conn.cursor()
        
        query = "SELECT * FROM donors WHERE blood_group = ? AND city LIKE ?"
        cursor.execute(query, (blood_group, f"%{city}%"))
        rows = cursor.fetchall()
        conn.close()

        # Filter by eligibility logic
        eligible_donors = []
        for row in rows:
            donor = dict(row)
            if is_eligible(donor['age'], donor['last_donation'], donor['availability']):
                eligible_donors.append(donor)
        
        return eligible_donors

class HospitalModel:
    @staticmethod
    def authenticate(username, password):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM hospitals WHERE username = ? AND password = ?', (username, password))
        hospital = cursor.fetchone()
        conn.close()
        return hospital is not None

class RequestModel:
    @staticmethod
    def create_emergency(data):
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO emergency_requests (blood_group, message, hospital_name)
            VALUES (?, ?, ?)
        ''', (data['blood_group'], data['message'], data['hospital_name']))
        conn.commit()
        conn.close()
