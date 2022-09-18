import React, {lazy, Suspense} from 'react';

const LazyLoad = (path) => {
  console.log(path);
  const Ele = lazy(() => import(`../pages${path}`));
  return (
    <Suspense callback={<div>加载中···</div>}>
      <Ele></Ele>
    </Suspense>
  );
};

export default LazyLoad;
