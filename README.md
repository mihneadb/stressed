# Stressed

Easy way to measure the amount of stress and frustration within a team/project/random context.

Data is stored in an sqlite db. It looks like this:

```json
    {
      "id": 1,
      "message": "frustrated",
      "timestamp": 1428273876
    }
```

## Up and running

### Docker

You can simply fire it up using `docker build -t stressed` and `docker run -t stressed`.

### Local install

Use the provided `requirements.txt` to install the deps and then you can either run
the Flask development server using `python app.py` or start the app via `gunicorn`,
using `gunicorn -k eventlet app:app`.

## URLs

`/` - home for frontend (TODO).

`/api/statuses/` - list endpoint for status objects (supports filtering via `message`, `since` and `until`).

Example:

```json
{
  "data": [
    {
      "id": 3,
      "message": "frustrated",
      "timestamp": 1428276198
    },
    {
      "id": 2,
      "message": "frustrated",
      "timestamp": 1428273877
    },
    {
      "id": 1,
      "message": "frustrated",
      "timestamp": 1428273876
    }
  ]
}
```

`/api/timeseries/` - data endpoint for building timeseries graphs on top of the data (supports same filters
as `statuses/` and, in addition, a `resolution` - `day`, `hour`, `minute` or `second` - defaulting to `day`).

Example:

```json
{
  "1428192000": 3,
  "1428278400": 0
}
```
