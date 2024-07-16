function forEach(array: any, iteratee: any) {
  let index = -1;
  const length = array.length;
  while(++index < length) {
    iteratee(array[index], index);
  }
  return array;
}

function isObject(target: any) {
  const type = typeof target;
  return target !== null && (type === 'object' || type === 'function');
}

function getInit(target: any) {
  const Ctor = target.constructor;
  return new Ctor();
}
// 需要递归遍历的数据类型
const mapTag = '[object Map]';
const setTag = '[object Set]';
const arrayTag = '[object Array]';
const objectTag = '[object Object]';
const argsTag = '[object Arguments]';
const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];
// 不需要递归遍历的数据类型
const boolTag = '[object Boolean]';
const dateTag = '[object Date]';
const errorTag = '[object Error]';
const numberTag = '[object Number]';
const regexpTag = '[object RegExp]';
const stringTag = '[object String]';
const symbolTag = '[object Symbol]';
const functionTag = '[object Function]';

function getType(target: any) {
  return Object.prototype.toString.call(target);
}

function cloneSymbol(target: Symbol) {
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneFunction(target: any) {
  const bodyReg = /(?<={)(.|\n)+(?=})/m;
  const paramReg = /(?<=\().+(?=\)\s+{)/;
  const funcString = target.toString();
  if(funcString.prototype) {
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if(body) {
      if(param) {
        const paramArr = param[0].split(',');
        return new Function(...paramArr, body[0]);
      } else {
        return new Function(body[0]);
      }
    }
  } else {
    return eval(funcString);
  }
}

function cloneReg(target: any) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return result;
}

function cloneOtherType(target: any, type: any) {
  const Ctor = target.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target);
    case regexpTag:
      return cloneReg(target);
    case symbolTag:
      return cloneSymbol(target);
    case functionTag:
      return cloneFunction(target);
    default:
      return null;
  }
}

function clone(target: any, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget: any;
  if(deepTag.includes(type)) {
    cloneTarget = getInit(target);
  } else {
    return cloneOtherType(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return target;
  }
  map.set(target, cloneTarget);

  // 克隆set
  if(type === setTag) {
    target.forEach((value: any) => {
      cloneTarget.add(clone(value));
    })
    return cloneTarget;
  }

  // 克隆map
  if(type === mapTag) {
    target.forEach((value: any, key: any) => {
      cloneTarget.set(key, clone(value))
    })
    return cloneTarget;
  }

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value:any, key: any) => {
    if(keys) key = value;
    cloneTarget[key] = clone(target[key], map);
  })

  return cloneTarget;
}

// function clone1(target: any, map = new WeakMap()) {
//   if (typeof target === 'object') {
//     let cloneTarget: any = Array.isArray(target) ? [] : {};

//     if (map.get(target)) {
//       return target;
//     }
//     map.set(target, cloneTarget);

//     for(const key in target) {
//       cloneTarget[key] = clone1(target[key], map)
//     }
//     return cloneTarget;
//   } else {
//     return target;
//   }
// }

const target:any = {
  field1: 1,
  field2: undefined,
  field3: {
      child: 'child'
  },
  field4: [2, 4, 8],
  f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: { f: {} } } } } } } } } } } },
};

target.target = target;

const result = clone(target);
console.log('result', result);