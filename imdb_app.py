from flask import Flask, jsonify, request, render_template
from services.imdb_api import *
import redis
import json

app = Flask(__name__)
r = redis.StrictRedis(host='localhost', port='6379', db=0)
api = MovieApi()


@app.route('/', methods=['GET'])
def get_root():
    return render_template('index.html')


@app.route('/api/v1/movies', methods=['GET'])
def get_movies():
    movies = []
    for key in r.scan_iter():
        movie = r.get(key)
        movies.append(json.loads(movie))
    return jsonify(movies)


@app.route('/api/v1/movie', methods=['POST'])
def post_movie():
    print request.json.get('Title', '')
    movie = {
        'Title': request.json['Title'],
        'Plot': request.json.get('Plot', ''),
        'imdbRating': request.json['imdbRating'],
        'Poster': request.json.get('Poster', ''),
        'imdbID': request.json['imdbID'],
    }
    r.set(movie['imdbID'], json.dumps(movie))
    return jsonify({'movie': movie})


@app.route('/search', methods=['GET'])
def search_imdb():
    substring = request.args.get('query', '')
    content = api.get_movie_search(substring)
    return content
