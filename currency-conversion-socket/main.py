from flask import Flask, render_template, request
from flask_socketio import SocketIO
from random import random
from threading import Lock
from datetime import datetime
import yaml
import requests
thread = None
thread_lock = Lock()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'Testing!'
socket = SocketIO(app, cors_allowed_origins='*')

# Loads yml file with configurations
with open('config.yml', 'r') as stream:
    config = yaml.safe_load(stream)
app.config.update(config)


def background_thread():
    print("Executing background task to fetch currency details")
    while True:
        endpoint_url = app.config['url']
        print(f'Incoming request : ' + endpoint_url)
        response = requests.request('GET', endpoint_url, headers={'apikey': app.config['api_key']}, data={})
        print(format(response.json()))
        socket.emit('currency-event', response.json())
        socket.sleep(10)


@socket.on('connect')
def connect():
    global thread
    print('Client connected')

    global thread
    with thread_lock:
        if thread is None:
            thread = socket.start_background_task(background_thread)


@socket.on('disconnect')
def disconnect():
    print('Client disconnected', request.sid)


if __name__ == '__main__':
    socket.run(app, debug=True, allow_unsafe_werkzeug=True)
