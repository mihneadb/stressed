<<<<<<< HEAD
# Mood meter

Easy way to measure the amount of stress and happiness within a team/project/random context.
=======
# Stressed

Easy way to measure the amount of stress and frustration within a team/project/random context.
>>>>>>> a246be034873584e93e14f33fd910655d58fab21

Data is stored in an sqlite db. It looks like this:

```json
    {
      "id": 1,
<<<<<<< HEAD
      "message": "happy",
=======
      "message": "frustrated",
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
      "timestamp": 1428273876
    }
```

## Up and running

### Docker

You can simply fire it up using:

```bash
<<<<<<< HEAD
docker build -t mood .
docker run -p 5000:80 -it mood
=======
docker build -t stressed .
docker run -p 5000:80 -it stressed
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
```

The server will be available on `127.0.0.1:5000`.

### Local install

Use the provided `requirements.txt` to install the deps and then you can either run
the Flask development server using `python app.py` or start the app via `gunicorn`,
using `gunicorn -k eventlet app:app`.

Don't forget to build the JS as well - you can read everything about it in
`static/README.md`.

## URLs

`GET /` - home for frontend.

`GET /api/statuses/` - list endpoint for status objects (supports filtering via `message`, `since` and `until`).

Example:

```json
{
  "data": [
    {
      "id": 3,
<<<<<<< HEAD
      "message": "happy",
=======
      "message": "frustrated",
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
      "timestamp": 1428276198
    },
    {
      "id": 2,
<<<<<<< HEAD
      "message": "happy",
=======
      "message": "frustrated",
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
      "timestamp": 1428273877
    },
    {
      "id": 1,
<<<<<<< HEAD
      "message": "happy",
=======
      "message": "frustrated",
>>>>>>> a246be034873584e93e14f33fd910655d58fab21
      "timestamp": 1428273876
    }
  ]
}
```

`POST /api/statuses/` - adds a new status; needs content-type json and `{"message": $msg}`, with `$msg` one of
<<<<<<< HEAD
`"stressed"` and `"happy"`.
=======
`"stressed"` and `"frustrated"`.
>>>>>>> a246be034873584e93e14f33fd910655d58fab21

`GET /api/timeseries/` - data endpoint for building timeseries graphs on top of the data (supports same filters
as `statuses/` and, in addition, a `resolution` - `day`, `hour`, `minute` or `second` - defaulting to `day`).

Example:

```json
{
  "1428192000": 3,
  "1428278400": 0
}
```

## Changing what to count

The possible statuses are defined in `constants.py`. Feel free to change them
and everything will keep working!
<<<<<<< HEAD
=======

>>>>>>> a246be034873584e93e14f33fd910655d58fab21
