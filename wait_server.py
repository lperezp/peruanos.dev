import time
import os

print("Waiting for server to be ready...")
for _ in range(60):
    if os.path.exists('dev_server.log'):
        with open('dev_server.log', 'r') as f:
            if 'Ready in' in f.read():
                print("Server is ready!")
                break
    time.sleep(1)
