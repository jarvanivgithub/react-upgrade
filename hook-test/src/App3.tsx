import { Reducer, useReducer, useState } from "react";
import { produce } from 'immer';

interface Data {
  result: number;
}

interface Action {
  type: 'add' | 'minus';
  num: number;
}

function reducer(state: Data, action: Action) {
  switch (action.type) {
    case 'add':
      // return {
      //   result: state.result + action.num
      // }
      return produce(state, (state) => {
        state.result += action.num;
      });
    case 'minus':
      return {
        result: state.result - action.num
      }
    default:
      break;
  }
  return state;
}

function App() {
  const [obj, setObj] = useState({
    a: {
      c: {
        e: 0,
        f: 0,
      },
      d: 0
    },
    b: 0
  })

  const [res, dispatch] = useReducer<Reducer<Data, Action>, string>(reducer, 'zore', (param) => {
    return {
      result: param === 'zore' ? 0 : 1
    }
  });

  return (
    <div>
      <div onClick={() => dispatch({type: 'add', num: 2})}>加</div>
      <div onClick={() => dispatch({type: 'minus', num: 1})}>减</div>
      <div>{res.result}</div>
      <div onClick={() => {
        setObj(produce(obj, (obj) => {obj.a.c.e++}));
      }}>obj加</div>
      <div>{JSON.stringify(obj)}</div>
    </div>
  )
}

export default App;