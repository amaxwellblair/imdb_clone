from flask import Flask, jsonify, request, render_template
import redis
import json
app = Flask(__name__)
r = redis.StrictRedis(host='localhost', port='6379', db=0)


@app.route('/', methods=['GET'])
def get_root():
    return render_template('index.html')


@app.route('/api/v1/movies', methods=['GET'])
def get_movies():
    movies = []
    for key in r.scan_iter():
        movies.append(r.get(key))
    return jsonify({'movies': movies})


@app.route('/api/v1/movie', methods=['POST'])
def post_movie():
    movie = {
        'title': request.json['title'],
        'description': request.json.get('description', ""),
        'genre': request.json['genre']
    }
    r.set(movie['title'], movie)
    return jsonify({'movie': movie})
