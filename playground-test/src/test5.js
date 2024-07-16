const arr = [1, 2, 3, 4, [1, 2, 3, [1, 2, 3, [1, 2, 3]]], 5, "string", { name: "弹铁蛋同学" }];
console.log('arr', arr)

function flat(arr) {
  let arrResult = [];
  arr.forEach(item => {
    if (Array.isArray(item)) {
      arrResult = arrResult.concat(flat(item));
    } else {
      arrResult.push(item);
    }
  })
  return arrResult;
}
console.log('flat', flat(arr));

function flat1(arr) {
  return arr.reduce((pre, cur) => {
    return pre.concat(Array.isArray(cur) ? flat(cur) : cur)
  }, [])
}
console.log('flat1', flat1(arr));

function flat2(arr) {
  const result = [];
  const stack = [].concat(arr);
  while (stack.length) {
    const val = stack.pop();
    if (Array.isArray(val)) {
      stack.push(...val);
    } else {
      result.unshift(val)
    }
  }
  return result;
}
console.log('flat2', flat2(arr));

function flat3(arr, num = 1) {
  return num > 0
    ? arr.reduce((pre, cur) => {
      return pre.concat(Array.isArray(cur) ? flat3(cur, num - 1) : cur)
    }, [])
    : arr.slice()
}
console.log('flat3', flat3(arr));

function *flat4(arr, num) {
  if(!num) num = 1;
  for(const item of arr) {
    if(Array.isArray(item) && num > 0) {
      yield* flat4(item, num - 1);
    } else {
      yield item;
    }
  }
}
console.log('flat4', [...flat4(arr)]);

Array.prototype.fakeFlat = function(num) {
  if(!Number(num) || Number(num) < 0) return this;
  let arr = this.concat();
  while(num > 0) {
    if(arr.some(item => Array.isArray(item))) {
      arr = [].concat.apply([], arr);
    } else {
      break;
    }
    num--;
  }
  return arr;
}
console.log('fakeFlat', arr.fakeFlat(1))