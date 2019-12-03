import React, {Component, PureComponent, useEffect, useState, useRef, useCallback, } from 'react';
import './App.css';

const log = console.log.bind(console)

function useCounter(count) {
  const size = useSize()
  return (
    <div>
        <h1>{count}</h1>
        <h1>{size.height} * {size.width}</h1>
    </div>

  )
}

function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount)
  const it = useRef()

  useEffect(() => {
    log('effect 1')
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000);
  }, [])

  useEffect(() => {
    log('effect 2')
    if (count > 10) {
      clearInterval(it.current)
    }
  })

  return [count, setCount]
}

function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  })

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    })
  }, [])
  useEffect(() =>{
    window.addEventListener('resize', onResize, false)
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])
  return size
}
let id = 0

function App() {
  log('* render app *', id+=1)
  const [count, setCount] = useCount(0)
  const Counter = useCounter(count)
  const size = useSize()

  
  return ( 
    <div>
      <button
        type="button"
        onClick={() => {setCount(count + 1)}}
      >
        Click ({count}), {size.width}px * {size.height}px;
      </button>
      {Counter}
    </div>
  )
}

export default App;
