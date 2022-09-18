import React, {useEffect, createContext, useContext, useState} from 'react';
import styles from './App.module.less';
import IndexRouter from '../configs/router.config';
const APPdata = createContext();

const Counter = () => {
  const count = useContext(APPdata);
  return <div>{count}</div>;
};
export default function App() {
  const [val, setval] = useState(1);
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>module Title</h1>
      <button onClick={() => setval(+val + 1)}>点击+1</button>
      <APPdata.Provider value={val}>
        <Counter></Counter>
      </APPdata.Provider>
      <IndexRouter></IndexRouter>
    </div>
  );
}
