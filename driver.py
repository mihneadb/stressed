from collections import OrderedDict
from datetime import datetime

from status import Status
from utils import datetime_to_timestamp


RESOLUTIONS = {
    'day': 86400,
    'hour': 3600,
    'minute': 60,
    'second': 1
}


def extract_since_until(request):
    """
    Get since and until (if any) from request.
    :return: (since, until)
    """
    since = request.args.get('since')
    if since:
        since = int(since)
    until = request.args.get('until')
    if until:
        until = int(until)
    return since, until


def apply_filters(statuses, request):
    """
    Restrict statuses query per request args.

    Allowed filters:
        * message: str
        * since: str (int)
        * until: str (int)
    """
    message = request.args.get('message')
    if message is not None:
        statuses = statuses.filter(Status.message == message)

    since, until = extract_since_until(request)
    if since is not None:
        dt = datetime.utcfromtimestamp(int(since))
        statuses = statuses.filter(Status.timestamp >= dt)

    if until is not None:
        dt = datetime.utcfromtimestamp(int(until))
        statuses = statuses.filter(Status.timestamp < dt)

    return statuses


def make_timeseries(statuses, since, until, resolution=RESOLUTIONS['day']):
    """
    Arrange statuses in timeseries format.

    Timeseries means dict with timestamp keys and counts as values.
    Aggregation is performed per `resolution`.
    """
    timeseries = OrderedDict()
    start = since / resolution * resolution
    for bucket_start in range(start, until, resolution):
        timeseries[bucket_start] = 0
    for status in statuses:
        bucket_start = datetime_to_timestamp(status.timestamp) / resolution * resolution
        timeseries[bucket_start] += 1
    return timeseries
