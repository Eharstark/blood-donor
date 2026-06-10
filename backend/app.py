from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, get_db_connection
from models import DonorModel, HospitalModel, RequestModel
from sample_data import insert_samples
import os

app = Flask(__name__)
CORS(app)

# Initialize DB on Startup
if not os.path.exists('lifelink.db'):
    init_db()
    insert_samples()

@app.route('/api/register', methods=['POST'])
def register_donor():
    data = request.json
    try:
        DonorModel.create(data)
        return jsonify({"message": "Donor registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if HospitalModel.authenticate(data.get('username'), data.get('password')):
        return jsonify({"message": "Login successful", "status": "success"}), 200
    return jsonify({"message": "Invalid credentials", "status": "fail"}), 401

@app.route('/api/search', methods=['GET'])
def search():
    blood_group = request.args.get('blood_group')
    city = request.args.get('city', '')
    if not blood_group:
        return jsonify({"error": "Blood group is required"}), 400
    
    results = DonorModel.search_eligible(blood_group, city)
    return jsonify(results), 200

@app.route('/api/emergency', methods=['POST'])
def emergency():
    data = request.json
    try:
        RequestModel.create_emergency(data)
        return jsonify({"message": "Emergency broadcast sent"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/notifications', methods=['GET'])
def get_notifications():
    conn = get_db_connection()
    requests = conn.execute('SELECT * FROM emergency_requests ORDER BY created_at DESC').fetchall()
    conn.close()
    return jsonify([dict(r) for r in requests]), 200

@app.route('/api/stats', methods=['GET'])
def get_stats():
    conn = get_db_connection()
    total_donors = conn.execute('SELECT COUNT(*) FROM donors').fetchone()[0]
    available_donors = conn.execute('SELECT COUNT(*) FROM donors WHERE availability = "Available"').fetchone()[0]
    req_count = conn.execute('SELECT COUNT(*) FROM emergency_requests').fetchone()[0]
    
    # Blood group counts
    bg_counts = conn.execute('SELECT blood_group, COUNT(*) as count FROM donors GROUP BY blood_group').fetchall()
    
    conn.close()
    
    return jsonify({
        "total_donors": total_donors,
        "available_donors": available_donors,
        "emergency_requests": req_count,
        "blood_groups": {row['blood_group']: row['count'] for row in bg_counts}
    }), 200
import os

if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=int(os.environ.get('PORT', 5000)),
        debug=False
    )