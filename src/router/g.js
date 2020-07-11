export default {
  formatDateTime(timeStamp) {
    let date = new Date(timeStamp);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return y+'-'+ m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  formatDateTime1(timeStamp) {
    let date = new Date(timeStamp);
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  toFn(num, decimals) {
    let val1 = 0;
    // 判断是否数字
    if(typeof(num) == "number"){
      val1 = num;
    }else{
      val1 = parseFloat(num);
    }

    decimals = (decimals === undefined ? 2 : decimals); // bitNum默认值为2
    return val1.toFixed(decimals);
  },
  decimals(sum, decimals) {
    return sum / Math.pow(10, decimals)
  },
  decimals1(sum, prcie, decimals) {
    if (decimals <= 6) decimals = 8
    return sum / Math.pow(10, decimals) * prcie
  },
  compare(property, desc) {
    return function (a, b) {
      let value1 = a[property];
      let value2 = b[property];
      if (desc == true) {
        // 升序排列
        return value1 - value2;
      } else {
        // 降序排列
        return value2 - value1;
      }
    }
  },
  changeDecimalBuZero(number, bitNum) {
    console.log(bitNum);
    var f_x = parseFloat(number);
    if (isNaN(f_x)) {
      return 0;
    }
    var s_x = number.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
      pos_decimal = s_x.length;
      s_x += '.';
    }
    while (s_x.length <= pos_decimal + bitNum) {
      s_x += '0';
    }
    return s_x;
  }

}
