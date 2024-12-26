from flask import Flask, request
from flask_cors import CORS
import json
import os
import re
from email.message import EmailMessage
from email.utils import make_msgid
from datetime import datetime
from email.utils import formatdate
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import redis

# Load configuration from the config file
with open("config.json") as config_file:
    config = json.load(config_file)

app = Flask(__name__)
CORS(app)
redis_url = config['redis_url']  
redis = redis.StrictRedis.from_url(redis_url, decode_responses=True)
limiter = Limiter(
    get_remote_address,
    app=app,
    storage_uri=redis_url
)

MAILDIR_PATH = os.path.expanduser('~') + '/Mail'

def is_valid_email(email):
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
    return re.match(email_regex, email) is not None
@app.route('/contact', methods=['POST'])
@limiter.limit("5 per minute")
def contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')

    if not name or not email or not message:
        return json.dumps({'success': False, 'message': 'Missing required fields'}), 400
    if not is_valid_email(email):
        return json.dumps({'success': False, 'message': 'Invalid email address'}), 400
    try:
        msg = EmailMessage()
        msg.set_content(f"Message: {message}")
        msg['Subject'] = f"Contact Form Submission from {name}"
        msg['From'] = email
        msg['To'] = config['email']

        msg['Date'] = formatdate(timeval=None, localtime=True, usegmt=False)
        msg['Message-ID'] = make_msgid(config['domain'])
        new_dir = os.path.join(MAILDIR_PATH, 'new')

        email_filename = f"{int(datetime.now().timestamp())}.{os.getpid()}"
        email_filepath = os.path.join(new_dir, email_filename)


        with open(email_filepath, 'w') as f:
            f.write(msg.as_string())

        return json.dumps({'success': True}), 200

    except Exception as e:
        return json.dumps({'success': False, 'message': str(e)}), 500
@app.errorhandler(429)
def ratelimit_handler(e):
    return json.dumps({'success': False, 'message': 'Rate limit exceeded'}), 429

if __name__ == '__main__':
    app.run(port=config['port'])