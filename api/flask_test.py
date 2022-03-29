#coding = utf-8
from copy import deepcopy
from flask import Flask, jsonify
import pandas as pd
import requests
import json
import appbk_sql
import time
import random


app = Flask(__name__)

use_fake = False
correct_res = {
    'data': {},
    'status': 200
}


url = "https://c.m.163.com/ug/api/wuhan/app/data/list-total"
header = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4878.0 Safari/537.36"
}


@app.route('/getdata', methods=['GET'])
def refresh():
    data = []
    resault = {}
    nowtime = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime())

    sql = "select id,name,value from `soaringList`;"
    res = appbk_sql.mysql_com(sql)
    for i in res:
        if len(i['name']) > 10:
            data.append({'id': i['id'], 'name': i['name']
                        [:10]+'...', 'value': i['value']})
        else:
            data.append(
                {'id': i['id'], 'name': i['name'], 'value': i['value']})

    resault['time'] = nowtime
    # 是否使用假数据
    if use_fake:
        fake_data = [{'id': 1, 'name': '你不是我，我不是我', 'value': 0}, {'id': 2, 'name': 'Intentiona...', 'value': 0}, {'id': 3, 'name': '独家屏蔽', 'value': 0}, {'id': 4, 'name': '喜欢你的', 'value': 0}, {'id': 5, 'name': '爱丫爱丫', 'value': 0}, {'id': 6, 'name': '千风诗', 'value': 0}, {'id': 7, 'name': '爱丫爱丫(1)', 'value': 0}, {
            'id': 8, 'name': '人间烟火', 'value': 0}, {'id': 9, 'name': 'Bet On Me', 'value': 0}, {'id': 10, 'name': '唯一', 'value': 0}, {'id': 11, 'name': '雪花雨', 'value': 0}, {'id': 12, 'name': '追寻你', 'value': 0}, {'id': 13, 'name': '願いごと', 'value': 0}, {'id': 14, 'name': '一样的月光', 'value': 0}, {'id': 15, 'name': '奔赴予你', 'value': 0}]
        for i in fake_data:
            i['value'] = random.randint(5000, 1000000)
        random.shuffle(fake_data)
        resault['data'] = fake_data
        print(fake_data)
    else:
        resault['data'] = data
    return jsonify(resault)


@app.route('/switch', methods=['GET'])
def switch():
    global use_fake
    if not use_fake:
        use_fake = True
    else:
        use_fake = False
    res = deepcopy(correct_res)
    res['data']['use_fake'] = use_fake
    return jsonify(res)


@app.route('/getcovie', methods=['GET'])
def getcovie():
    response = requests.get(url, headers=header)
    data = json.loads(response.text)

    chinese_covid_19_data = []
    for item in data["data"]["areaTree"][2]["children"]:
        tmp = {}
        tmp["name"] = item["name"]
        tmp["today_confirm"] = item["today"]["confirm"]
        tmp["total_confirm"] = item["total"]["confirm"]
        chinese_covid_19_data.append(tmp)
    return jsonify(chinese_covid_19_data)


if __name__ == "__main__":
    app.run(port=8000)
