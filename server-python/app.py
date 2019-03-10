from flask import Flask, jsonify
from bson.json_util import dumps
from db import collections

app = Flask(__name__)

@app.route("/api/packages")
def hello():
    packages = list(collections.packages.find({}))
    return dumps(packages)
