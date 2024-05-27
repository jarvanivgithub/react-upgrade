import React, { FC, PropsWithChildren, useEffect } from 'react';

interface AaaProps {
  children: React.ReactNode[];
}

const Aaa: FC<AaaProps> = (props) => {
  const { children } = props;

  // console.log(children.sort())

  const arr = React.Children.toArray(children);
  console.log('arr', arr.sort());

  return <div className="container">
    {
      children.map((item, index) => {
        return <div key={'item-' + index} className='item'>{item}</div>
      })
    }
  </div>
}

function App() {
  return <Aaa>
    {/* {
      [
        <a href="#">111</a>,
        <a href="#">222</a>,
        [<a href="#">333</a>, <a href="#">444</a>,]
      ]
    } */}
    {33}
    {22}
    <span>hello world</span>
    {11}
  </Aaa>
}

export default App;