import React, { useState, } from 'react';


function TryHook(props) {
    // 声明一个叫 “count” 的 state 变量。
    console.log('__ render count __ ')
    const [name, setName] = useState('time');
    const [age, setAge] = useState(25);
    const [count, setCount] = useState(() => {
        console.log('init count')
        return props.count || 233;
    })

    // Similar to componentDidMount and componentDidUpdate:
    const logData = () => {
        console.log('name: ', name, ' age: ', age)
    }
    const printData = () => {
        const input = {
            name,
            age,
        }
        console.log('input data, ', input)
    }

    const SubButton = ({ handleClick }) => {
        return (
            <button onClick={handleClick}>subButton</button>
        )
    }
    return (
        <div>
            <input onChange={e => setName(e.target.value)} />
            <span>name: {name}</span>
            <input onChange={e => setAge(e.target.value)} />
            <span>age: {age}</span>
            <button onClick={logData}> submit </button>
            <SubButton handleClick={printData} />
            <span>count: {count}</span>
            <button onClick={() => setCount(count + 1)}>add count</button>
        </div>
    );
}

export default TryHook;