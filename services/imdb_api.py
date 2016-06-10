import requests


class MovieApi:
    def __init__(self):
        self.url = 'http://www.omdbapi.com/'

    def get_movie_search(self, movie):
        params = '?t=' + movie
        r = requests.get(self.url + params)
        return r.content
