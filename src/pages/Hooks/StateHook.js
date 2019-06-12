import React, {useState, useEffect} from 'react';

export function UseState() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);
    // Similar to componentDidMount and componentDidUpdate:
    // useEffect 默认情况下，它在第一次渲染之后和每次更新之后都会执行
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    }, [count]); // 仅在 count 更改时更新

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}
export const source = `import React, {useState} from 'react';

export function UseState() {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </div>
    );
}`;
