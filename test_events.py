from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    response = page.goto('http://localhost:3000/events')

    if response.status == 500:
        print("Error: The /events page returned a 500 error!")
        print("Next server logs:")
        with open('dev_server.log', 'r') as f:
            print(f.read())
        exit(1)

    page.wait_for_selector('h1:has-text("Próximos Eventos")')
    print("Page loaded successfully!")

    # Check if elements are displayed
    events = page.locator('article')
    print(f"Found {events.count()} events on the page.")

    page.screenshot(path='events_page.png', full_page=True)
    browser.close()
