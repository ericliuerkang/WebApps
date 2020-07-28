from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')

def index():
	return render_template('index.html')
	
@app.route('/young')

def young():
	return render_template('young.html')

@app.route('/old')

def old():
	return render_template('old.html')

@app.route('/todoList')

def to_do_list():
	return render_template('todoList.html')

@app.route('/calculator')

def calculator():
	return render_template('calculator.html')


if __name__ == "__main__":
	app.run(debug=True, host="0.0.0.0")
