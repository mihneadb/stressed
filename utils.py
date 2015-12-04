from datetime import datetime


def datetime_to_timestamp(dt):
    precise = (dt - datetime(1970, 1, 1)).total_seconds()
    return int(precise)
