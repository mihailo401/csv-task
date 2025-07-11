import os
import sys
from flask import Flask
from flask_cors import CORS

try:
    from .config import Config
    from .routes import api
except ImportError:
    from config import Config
    from routes import api

def create_app():
    app = Flask(__name__)
    CORS(app)
    Config.init_app(app)
    app.register_blueprint(api, url_prefix='/api')
    return app

app = create_app()

if __name__ == '__main__':
    host = os.environ.get('FLASK_RUN_HOST', '127.0.0.1')
    port = int(os.environ.get('FLASK_RUN_PORT', 5000))
    
    # Disable reloader on Windows to avoid socket issues
    use_reloader = not sys.platform.startswith('win')
    
    app.run(debug=True, host=host, port=port, use_reloader=use_reloader) 