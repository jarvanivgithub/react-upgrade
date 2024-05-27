import { useEffect } from 'react';
// import { useCookie } from 'react-use';
import useCookie from './hooks/useCookie';

const App = () => {
  const [value, updateCookie, deleteCookie] = useCookie('test');

  useEffect(() => {
    deleteCookie();
  }, []);

  const handleUpdateCookie = () => {
    updateCookie('test');
  }

  return <div>
    <p>cookie：{value}</p>
    <button onClick={handleUpdateCookie}>更新 Cookie</button>
    <br />
    <button onClick={deleteCookie}>删除 Cookie</button>
  </div>
}

export default App;