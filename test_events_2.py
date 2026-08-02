from playwright.sync_api import sync_playwright
import time

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    response = page.goto('http://localhost:3000/events')

    time.sleep(2)

    events = page.locator('div:has-text("Presencial")')
    print(f"Found something looking like an event? {events.count()}")

    # Let's inspect the DOM slightly to see what's rendering
    # Wait, events are grouped by Year/Month. We can check for a common text or element class.
    elements = page.query_selector_all('a[href*="gdg.community.dev"]')
    print(f"GDG links: {len(elements)}")
    elements = page.query_selector_all('a[href*="meetup.com"]')
    print(f"Meetup links: {len(elements)}")

    page.screenshot(path='events_page.png', full_page=True)
    browser.close()
