import React, {useEffect, useState, useRef, useCallback, memo, } from 'react';
import './App.css';

const log = console.log.bind(console)

let idSeq = Date.now()

const Control = memo(function(props) {
    const { addTodo } = props
    const inputRef = useRef()

    const onSubmit = (e) => {
        e.preventDefault()
        const newText = inputRef.current.value.trim()

        if (newText.length === 0) {
            return
        }
        addTodo({
            id: ++idSeq,
            text: newText,
            complete: false,
        })

        inputRef.current.value = ''
    }
    return (
        <div className="control">
            <h1>todos</h1>
            <form onSubmit={onSubmit}>
                <input
                    ref={inputRef}
                    type="text"
                    className="new-todo"
                    placeholder="new todo" 
                />
            </form>
        </div>
    )
})

const TodoItem = memo(function(props) {
    const {
        todo: {
            id,
            text,
            complete,
        },
        toggleTodo,
        removeTodo,
    } = props

    const onChange = () => {
        toggleTodo(id)
    }

    const onRemove = () => {
        removeTodo(id)
    }

    return (
        <li className="todo-item">
            <input
                type="checkbox"
                onChange={onChange}
                checked={complete}
            />
            <label className={complete ? 'complete' : ''}>{ text }</label>
            <button onClick={onRemove}>&#xd7;</button>
        </li>
    )
})

const Todos = memo(function (props) {
    const { todos, toggleTodo, removeTodo } = props
    return (
        <ul className="todos">
            {
                todos.map(todo => {
                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            toggleTodo={toggleTodo}
                            removeTodo={removeTodo}
                        />
                    )
                })
            }
        </ul>
    )
})

const LS_KEY = '__todos_key__'

function TodoList() {
    log('** render **')
    const [todos, setTodos] = useState([])

    const addTodo = useCallback((todo) => {
        setTodos(todos => [...todos, todo])
    }, [])

    const removeTodo = useCallback((id) => {
        setTodos(todos => todos.filter(todo => {
            return todo.id !== id
        }))
    }, [])

    const toggleTodo = useCallback((id) => {
        setTodos(todos => todos.map(todo => {
            if (todo.id === id) {
                return ({
                    ...todo,
                    complete: !todo.complete,
                })
            } else {
                return todo
            }
        }))
    }, [])

    useEffect(() => {
        const cacheTodos = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
        setTodos(cacheTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(todos))
    }, [todos])


    return (
        <div className="todo-list">
            <Control addTodo={addTodo} />
            <Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
        </div>
    )
}

export default TodoList;
