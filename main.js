var numZhCn = ['日', '一', '二', '三', '四', '五', '六'];
var timeProperty = ['hour', 'minute', 'second'];
var dateProperty = ['year', 'month', 'date', 'day'];
var state = {};

function updateState(obj) {
  Object.keys(obj).map(key => (state[key] = obj[key]));
}

function toString(num) {
  return ('00' + num).substr(num.toString().length);
}

function setDataToDom(data, id) {
  document.getElementById(id).innerText = data;
}

function updateDate() {
  var date = new Date();
  updateState({
    year: date.getFullYear(),
  });
  updateState({
    month: toString(date.getMonth() + 1),
  });
  updateState({
    date: toString(date.getDate()),
  });
  updateState({
    day: numZhCn[date.getDay()],
  });
  runderDate();
}

function updateTime() {
  var date = new Date();
  updateState({
    hour: toString(date.getHours()),
  });
  updateState({
    minute: toString(date.getMinutes()),
  });
  updateState({
    second: toString(date.getSeconds()),
  });
  runderTime();
}

function runderTime() {
  timeProperty.forEach(e => setDataToDom(state[e], e));

  if (state['second'] === '59') {
    document.getElementById('minute').style.animation =
      'turn-page1 1000ms ease-in-out 500ms';
  } else if (state['second'] === '00') {
    document.getElementById('minute').style.animation = 'turn-page2 1000ms';
  } else {
    document.getElementById('minute').style.animation = '';
  }

  if (state['second'] === '59' && state['minute'] === '59') {
    document.getElementById('hour').style.animation =
      'turn-page1 1000ms linear 500ms';
  } else if (state['second'] === '00' && state['minute'] === '00') {
    document.getElementById('hour').style.animation = 'turn-page2 1000ms';
  } else {
    document.getElementById('hour').style.animation = '';
  }

  if (
    state['hour'] === '06' &&
    state['minute'] === '30' &&
    state['second'] === '30'
  ) {
    updateDate();
    updateWeather();
  }
}

function runderDate() {
  dateProperty.forEach(e => setDataToDom(state[e], e));
}

function runderWeather() {
  var e = state.forecast[0];
  var forecast = `${e.type} ${e.low}-${e.high} ${e.fengxiang}`;
  forecast = forecast.replace('高温', '').replace('低温', '');
  setDataToDom(forecast, `forecast`);
  setDataToDom(state['ganmao'], `ganmao`);
}

function updateWeather() {
  fetch('http://wthrcdn.etouch.cn/weather_mini?city=%E4%B8%8A%E6%B5%B7')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      //console.log(json);
      updateState(json.data);
      runderWeather(); // 暂时先放这里
    });
  // city: "上海"
  // forecast: Array(5)
  // 0: {date: "16日星期二", high: "高温 12℃", fengli: "<![CDATA[2级]]>", low: "低温 3℃", fengxiang: "东北风", …}
  // 1: {date: "17日星期三", high: "高温 8℃", fengli: "<![CDATA[3级]]>", low: "低温 1℃", fengxiang: "北风", …}
  // 2: {date: "18日星期四", high: "高温 9℃", fengli: "<![CDATA[3级]]>", low: "低温 3℃", fengxiang: "西北风", …}
  // 3: {date: "19日星期五", high: "高温 16℃", fengli: "<![CDATA[2级]]>", low: "低温 5℃", fengxiang: "西南风", …}
  // 4: {date: "20日星期六", high: "高温 20℃", fengli: "<![CDATA[3级]]>", low: "低温 11℃", fengxiang: "西南风", …}
  // length: 5
  // __proto__: Array(0)
  // ganmao: "感冒多发期，适当减少外出频率，适量补充水分，适当增减衣物。"
  // wendu: "10"
  // yesterday:
  // date: "15日星期一"
  // fl: "<![CDATA[3级]]>"
  // fx: "北风"
  // high: "高温 11℃"
  // low: "低温 4℃"
  // type: "阴"
}

setInterval(updateTime, 1000);
updateDate();
updateWeather();
