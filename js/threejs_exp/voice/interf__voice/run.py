'''
Server for communication with vehicule.
threaded = True in app.run for not blocking communication with SSE.
'''
import os, sys, time
#sys.path.append('/usr/lib/python2.7/dist-packages')
import numpy as np
from threading import Thread
from time import sleep
from flask import Flask, render_template,request,\
			redirect, url_for, session
import flask
import subprocess

app = Flask(__name__, static_url_path = '/static')

@app.route('/')
def index():
    return render_template('gallerie_locker_v1.html')

if __name__ == "__main__":
    import threading, webbrowser
    chrome_path = '/usr/bin/google-chrome %s'
    port = 9611
    url = "https://127.0.0.1:{0}".format(port)
    threading.Timer(1.25, lambda: webbrowser.get(chrome_path).open(url)).start() # open a page in the browser.
    app.run(threaded = True, port = port, debug = False, use_reloader = False, ssl_context='adhoc')
