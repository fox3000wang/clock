var numZhCn = ['日', '一', '二', '三', '四', '五', '六'];
var timeProperty = ['hour', 'minute', 'second'];
var dateProperty = ['year', 'month', 'date', 'day'];
var state = {
  year: '',
  month: '1',
  date: '',
  day: '',
  hour: '00',
  minute: '00',
  second: '00',
}; // 这里的初始化数据随便写，无所谓

function updateState(obj) {
  state = {
    ...state,
    ...obj,
  };
  //console.log(JSON.stringify(state));
}

function toString(num) {
  return ('00' + num).substr(num.toString().length);
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

function updateWeather() {
  fetch('http://wthrcdn.etouch.cn/weather_mini?city=%E4%B8%8A%E6%B5%B7')
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      //console.log(json);
      updateState(json.data);
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

function runderTime() {
  timeProperty.forEach(function (e) {
    document.getElementById(e).innerText = state[e];
  });
  runderWeather();
}

function runderDate() {
  dateProperty.forEach(function (e) {
    document.getElementById(e).innerText = state[e];
  });
}

function runderWeather() {
  var forecast = document.getElementsByClassName('forecast');
  var forecastData = state.forecast;
  // console.log(forecastData);
  forecastData.forEach(function (e, i) {
    forecast[
      i
    ].innerText = `${e.date} ${e.type} ${e.fengxiang}\n${e.high} ${e.low}`;
  });
}

setInterval(updateTime, 1000);
updateDate();
updateWeather();
