import yaml
import logging
from flask import Flask, jsonify
import requests
import json
import time

# setting up logging with format
logging.basicConfig(
    format='%(asctime)s %(levelname)s %(message)s',
    level=logging.INFO)
logger = logging.getLogger()

# initialise flask server
app = Flask(__name__)

# Loads yml file with configurations
with open('config.yml', 'r') as stream:
    config = yaml.safe_load(stream)
app.config.update(config)

error_response = {"status": "Internal Server Error"}


# convert currency from one currency to another currency code with amount.
@app.route('/from/<one_code>/to/<another_code>/with/<amount>')
def convert_currency(one_code, another_code, amount):
    endpoint_url = app.config['convert_url'] % (another_code, one_code, amount)
    logger.info("Incoming request : ".format(endpoint_url))
    try:
        response = requests.request('GET', endpoint_url, headers={'apikey': app.config['api_key']}, data={})
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        logger.error("Error occurred : {}".format(e))
        return error_response, 500
    return response.json(), 200


# defines fluctuation in currency from certain period.
@app.route('/fluctuation/<start_date>/<end_date>')
def fluctuate_currency(start_date, end_date):
    endpoint_url = app.config['fluctuate_url'] % (start_date, end_date)
    logger.info("Incoming request : ".format(endpoint_url))
    try:
        response = requests.request('GET', endpoint_url, headers={'apikey': app.config['api_key']}, data={})
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        logger.error("Error occurred : {}".format(e))
        return error_response, 500
    return response.json(), 200


# main class.
if __name__ == '__main__':
    app.run(debug=False)
