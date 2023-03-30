import React, { useMemo, useCallback, useState } from 'react';

export function MyComponent() {
  const [count, setCount] = useState(0);

  const expensiveValue = useMemo(() => {
    return count * 2;
  }, [count]);

  const handleClick = useCallback(() => {

    setCount(count + 1);
  }, [count]);

  return (
    <div className='container-info'>
      <p>Expensive value: {expensiveValue}</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}