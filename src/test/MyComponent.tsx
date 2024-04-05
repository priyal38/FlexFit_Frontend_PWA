import React , {useState} from "react";

const MyComponent: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  if (count === 5) {
    // Simulate an error when count reaches 5
    throw new Error('Error: count reached 5');
  }

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default MyComponent;