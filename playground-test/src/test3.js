const curry = (fn, ...args) => {
  return args.length >= fn.length ? fn(...args) : (..._args) => curry(fn, ...args, ..._args);
}

function add(x, y, z) {
  return x + y + z;
}
const add1 = curry(add);

console.log(add1(1, 2, 3));
console.log(add1(1)(2, 3));
console.log(add1(1, 2)(3));
console.log(add1(1)(2)(3));


// 无限层级的add(1)(2)(3)(...)(n)实现方法
function argsSum(args) {
  return args.reduce((pre, cur) => {
    return pre + cur;
  })
}
function add2(...args1) {
  let sum1 = argsSum(args1);
  let fn = function (...args2) {
    let sum2 = argsSum(args2);
    return add2(sum1 + sum2);
  }
  fn.toString = function () {
    return sum1;
  }
  return fn;
}

function add3(...args) {
  let sum = args.reduce((acc, cur) => acc + cur);
  const fn = function (...nextArgs) {
    return nextArgs.length ? add3(sum, ...nextArgs) : sum
  }
  fn.toString = function() {
    return sum;
  }
  return fn;
}

console.log(add2(1)(2)(3)(4)(1)(2)(3)(4).toString())
console.log(add3(1)(2)(3)(4)(1)(2)(3)(4).toString())