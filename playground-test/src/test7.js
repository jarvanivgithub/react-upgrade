function throttleByDate(func, wait) {
  var context, args;
  var previous;

  return function() {
    var now = +new Date();
    context = this;
    args = arguments;
    if(now - previous > wait) {
      func.apply(context, args);
      previous = now;
    }
  }
}

function throttleByTimeout(func, wait) {
  var timer;

  return function() {
    var context = this;
    var args = arguments;
    if(timer) return;
    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      func.apply(context, args);
    }, wait);
  }
}

function throttle(func, wait, options) {
  var timer, context, args, result;
  var previous = 0;
  if(!options) options = {};

  var later = function() {
    previous = options.leading === false ? 0 : +new Date();
    timer = null;
    func.apply(context, args);
    if(!timer) context = args = null;
  }

  var throttled = function() {
    var now = +new Date();
    if(!previous && options.leading === false) previous = now;
    context = this;
    args = arguments;
    var remaining = wait - (now - previous);
    // 计算方式导致无法同时设置leading和trailing位false，会出现leading失效的情况
    if(remaining <= 0 || wait < remaining) {
      if(timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      func.apply(context, args);
      if(!timer) context = args = null;
    } else if(!timer && options.trailing !== false) {
      timer = setTimeout(later, wait);
    }
  }

  throttled.cancel = function() {
    clearTimeout(timer);
    timer = null;
    previous = 0;
  }

  return throttled;
}

var num = 1;
function handleScroll() {
  console.log(num++)
}

var handleScrollThrottle = throttle(handleScroll, 3000, {
  leading: false,
  trailing: false,
})

window.addEventListener('scroll', function() {
  handleScrollThrottle()
})