from datetime import datetime

from flask import Flask, jsonify, request, send_from_directory
from sqlalchemy import desc
from sqlalchemy.orm import sessionmaker
from werkzeug.exceptions import BadRequest

from constants import STATUS_CHOICES
from db import engine
from driver import (extract_since_until, apply_filters,
                    make_timeseries, RESOLUTIONS)
from status import Status
from utils import datetime_to_timestamp


app = Flask(__name__)
# app.debug = True
session = sessionmaker(bind=engine)()


@app.route('/api/statuses/', methods=['GET'])
def api_statuses_get_list():
    """
    Returns JSON data with list of statuses.

    Allows filtering (see `apply filters` for details).
    """
    statuses = session.query(Status)
    try:
        statuses = apply_filters(statuses, request)
    except:
        return BadRequest("Wrong query. Allowed filters: message, since, until.")

    statuses = statuses.order_by(desc(Status.timestamp))
    return jsonify(data=[s.serialize() for s in statuses])


@app.route('/api/timeseries/', methods=['GET'])
def api_timeseries_get_list():
    """
    Returns timeseries data for statuses.

    `since` is mandatory. `until` is optional - defaults to now.

    Allows filtering (see `apply filters` for details).
    Performs aggregation by resolution (default = day).
    """
    statuses = session.query(Status)
    try:
        statuses = apply_filters(statuses, request)
    except:
        return BadRequest("Wrong query. Allowed filters: message, since, until.")
    statuses = statuses.order_by(Status.timestamp)

    resolution = request.args.get('resolution', 'day')
    if resolution not in RESOLUTIONS.keys():
        return BadRequest("Wrong resolution. Allowed resolutions: %s" % RESOLUTIONS.keys())

    since, until = extract_since_until(request)
    if since is None:
        return BadRequest("`since` is mandatory.")
    if until is None:
        until = datetime_to_timestamp(datetime.utcnow())

    timeseries = make_timeseries(statuses, since, until, RESOLUTIONS[resolution])
    return jsonify(timeseries)


@app.route('/api/statuses/', methods=['POST'])
def api_statuses_post_list():
    if not request.mimetype == 'application/json':
        return BadRequest("Wrong content-type. Need json.")

    data = request.json
    if 'message' not in data or data['message'] not in STATUS_CHOICES:
        return BadRequest("Missing or invalid message field. "
                          "Possible values: %s." % STATUS_CHOICES)

    status = Status(message=data['message'])
    try:
        session.add(status)
        session.commit()
    except:
        # Not sure what else can happen but.. you never know!
        session.rollback()
        return BadRequest()

    return jsonify(status.serialize())


#####
# For dev purposes.
#####
@app.route('/')
def serve_index_static():
    return send_from_directory('static', 'index.html')


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)


if __name__ == '__main__':
    app.run(use_reloader=True)

