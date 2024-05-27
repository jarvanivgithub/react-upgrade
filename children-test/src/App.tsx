import React, { FC, PropsWithChildren, useEffect } from 'react';

const Aaa: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  useEffect(() => {
    const count = React.Children.count(children);
    console.log('count', count);

    React.Children.forEach(children, (item, index) => {
      console.log(item, index);
    })

    const onlyone = React.Children.only(children);
    console.log('onlyone', onlyone);
  }, [])

  return <div className="container">
    {
      React.Children.map(children, (item) => {
        return <div className='item'>{item}</div>
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
    <a href="#">111</a>
  </Aaa>
}

export default App;