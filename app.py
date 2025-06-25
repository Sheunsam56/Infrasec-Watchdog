# app.py
from flask import Flask, render_template, redirect, url_for, jsonify
import pandas as pd
import os
from scanner import run_scan

app = Flask(__name__)

@app.route('/')
def home():
    data = []
    if os.path.exists('results.csv') and os.path.getsize('results.csv') > 0:
        try:
            data = pd.read_csv('results.csv').to_dict(orient='records')
        except pd.errors.EmptyDataError:
            data = []
    return render_template('dashboard.html', data=data)


@app.route('/scan')
def scan():
    run_scan()
    return redirect(url_for('home'))

@app.route('/api/scan-results')
def api_results():
    if not os.path.exists('results.csv'):
        return jsonify([])
    df = pd.read_csv('results.csv')
    grouped = {}
    for _, row in df.iterrows():
        host = row['Host']
        port = row['Port']
        risk = row['Risk']
        if host not in grouped:
            grouped[host] = {
                'ip': host,
                'open_ports': [],
                'risk_level': 'Low'
            }
        grouped[host]['open_ports'].append(port)
        if risk == 'High':
            grouped[host]['risk_level'] = 'High'
        elif risk == 'Medium' and grouped[host]['risk_level'] != 'High':
            grouped[host]['risk_level'] = 'Medium'
    return jsonify(list(grouped.values()))

if __name__ == '__main__':
    app.run(debug=True)
