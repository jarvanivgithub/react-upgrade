function debounce(func, wait, immediate) {
  var timer, result;
  var debounced = function () {
    var context = this;
    var args = arguments;

    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(function () {
        timer = null;
      }, wait)
      if (callNow) result = func.apply(context, args);
    } else {
      timer = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
    return result;
  }

  debounced.cancel = function() {
    clearTimeout(timer);
    timer = null;
  }

  return debounced;
}