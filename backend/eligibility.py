from datetime import datetime, timedelta

def is_eligible(age, last_donation_str, availability):
    """
    Returns True if donor meets healthcare criteria.
    """
    # Rule 1: Age Check
    if int(age) < 18:
        return False
    
    # Rule 2: Availability Check
    if availability.lower() != 'available':
        return False

    # Rule 3: 90 Days Gap Check
    if not last_donation_str:
        return True # Never donated before, so they are eligible
        
    try:
        last_date = datetime.strptime(last_donation_str, '%Y-%m-%d')
        days_since = (datetime.now() - last_date).days
        if days_since < 90:
            return False
    except ValueError:
        return False

    return True
