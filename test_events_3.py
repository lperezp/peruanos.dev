from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://localhost:3000/events')
    time.sleep(2)

    # Try finding the event by title
    event = page.get_by_text("DevFest Open Lima 2026").first
    if event.is_visible():
        print("Event found on page!")
    else:
        print("Event not visible.")

    page.screenshot(path='events_page.png', full_page=True)
    browser.close()
