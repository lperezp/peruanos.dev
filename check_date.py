import json
import datetime

def get_day_of_week(year, month, day):
    return datetime.date(year, month, day).strftime("%A")

print(f"2025-04-25 is a {get_day_of_week(2025, 4, 25)}")
print(f"2026-04-25 is a {get_day_of_week(2026, 4, 25)}")
