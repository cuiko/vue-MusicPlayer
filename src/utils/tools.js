// 毫秒转时分秒  需要除1000
function formatSeconds(value) {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  var hourTime = 0; // 小时
  if (secondTime > 60) {
    //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
    //如果分钟大于60，将分钟转换成小时
    if (minuteTime > 60) {
      //获取小时，获取分钟除以60，得到整数小时
      hourTime = parseInt(minuteTime / 60);
      //获取小时后取佘的分，获取分钟除以60取佘的分
      minuteTime = parseInt(minuteTime % 60);
    }
  }
  var result = "" + parseInt(secondTime) + "秒";

  if (minuteTime > 0) {
    result = "" + parseInt(minuteTime) + "分" + result;
  }
  if (hourTime > 0) {
    result = "" + parseInt(hourTime) + "小时" + result;
  }
  return result;
}
// 毫秒转分时 需要除1000
function formatMinute(value) {
  var secondTime = parseInt(value); // 秒
  var minuteTime = 0; // 分
  if (secondTime > 60) {
    //如果秒数大于60，将秒数转换成整数
    //获取分钟，除以60取整数，得到整数分钟
    minuteTime = parseInt(secondTime / 60);
    //获取秒数，秒数取佘，得到整数秒数
    secondTime = parseInt(secondTime % 60);
  }
  return (
    `${parseInt(minuteTime)}`.padStart(2, "0") +
    ":" +
    `${parseInt(secondTime)}`.padStart(2, "0")
  );
}
// 格式化date
const formatTime = (date, type) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  if (type == "year") {
    return [year, month, day].map(formatNumber).join("-");
  } else if (type == "time") {
    return [hour, minute, second].map(formatNumber).join(":");
  } else {
    return (
      [year, month, day].map(formatNumber).join("/") +
      " " +
      [hour, minute, second].map(formatNumber).join(":")
    );
  }
};
const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

// 时间预约
const planTime = (date, planTime = [0, 0]) => {
  let changeTime = {
    _hour: Number(date.getHours()),
    _minute: Number(date.getMinutes()),
    plan(ary) {
      let temp = 0,
        changeHour = ary[0] + this._hour,
        changeMinute = ary[1] + this._minute;
      // 分钟
      if (changeMinute >= 60) {
        this._minute = changeMinute - 60;
        temp = 1;
      } else if (changeMinute < 0) {
        this._minute = 60 + changeMinute;
        temp = -1;
      } else {
        this._minute = changeMinute;
      }
      // 小时
      if (changeHour >= 24) {
        this._hour = changeHour - 24;
      } else if (changeHour < 0) {
        this._hour = 24 + changeHour;
      } else {
        this._hour = changeHour;
      }
      this._hour += temp;

      // return [changeHour, changeMinute];
      return [this._hour, this._minute];
    }
  };
  return changeTime
    .plan(planTime)
    .map(formatNumber)
    .join(":");
};

// 重置对象
function reset(target) {
  // eslint-disable-next-line valid-typeof
  if (typeof target != "object" && typeof target != "array") {
    target = null;
  } else {
    for (let key in target) {
      target[key] = null;
    }
  }
  return target;
}

// 歌手对象过滤
function filterSonger(
  objArr = [],
  defaultVal = "unknown",
  keyName = "name",
  separator = " ",
  keyId = "id"
) {
  let res = "",
    res_values = [],
    ids = [];
  if (objArr.length == 1) {
    res = objArr[0][keyName];
    res_values.push(objArr[0][keyName]);
    ids.push(objArr[0][keyId]);
  } else if (objArr.length > 1) {
    for (let i = 0, length = objArr.length; i < length; i++) {
      res += objArr[i][keyName] + separator;
      res_values.push(objArr[i][keyName]);
      ids.push(objArr[i][keyId]);
    }
    res = res.slice(0, res.lastIndexOf(separator));
  } else {
    res = defaultVal;
  }
  return {
    res,
    values: res_values,
    ids
  };
}

// 指定范围内随机
function random(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default {
  formatSeconds,
  formatTime,
  formatMinute,
  planTime,
  reset,
  filterSonger,
  random
};
