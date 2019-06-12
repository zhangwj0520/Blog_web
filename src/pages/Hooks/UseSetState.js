import React, { useState } from 'react';
import { Button } from 'antd';

export function UseSetState() {
    let [state, setState] = useSetState({
        count: 0,
        color: 'red'
    });

    return (
        <div>
            <Button
                style={{
                    color: state.color
                }}
                onClick={() => {
                    setState({
                        color: randomColor()
                    });
                }}>
                click me to change my color
            </Button>
            <div />
            <Button.Group>
                <Button
                    onClick={() => {
                        setState(prevState => {
                            return {
                                count: prevState.count - 1
                            };
                        });
                    }}>
                    -
                </Button>
                <Button>{state.count}</Button>
                <Button
                    onClick={() => {
                        setState({
                            count: state.count + 1
                        });
                    }}>
                    +
                </Button>
            </Button.Group>
        </div>
    );
}

function randomColor() {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

/**
 * 使函数组件具有 class 组件的 setState 方法
 * @param {Object} initState 初始状态，和 class 的 state 一样
 * @return {[Object, function]}
 */
function useSetState(initState = {}) {
    const [state, replaceState] = useState(initState);
    function setState(newState) {
        if (typeof newState === 'function') {
            replaceState(prevState => ({
                ...prevState,
                ...newState(prevState)
            }));
        } else {
            replaceState(prevState => ({
                ...prevState,
                ...newState
            }));
        }
    }
    return [state, setState];
}

export const source = `import React from 'react'
import { Button } from 'antd'
import { useSetState } from '../../common/hooks'

function randomColor() {
    return \`rgb(\${Math.random() * 255}, \${Math.random() * 255}, \${Math.random() * 255})\`
}

export default function UseSetState() {
    let [state, setState] = useSetState({
        count: 0,
        color: 'red',
    })

    return (
        <div>
            <h2
                style={{
                    color: state.color,
                }}
                onClick={() => {
                    setState({
                        color: randomColor(),
                    })
                }}
            >
                click me to change my color
            </h2>
            <Button.Group>
                <Button
                    onClick={() => {
                        setState((prevState) => {
                            return {
                                count: prevState.count - 1,
                            }
                        })
                    }}
                >
                    -
                </Button>
                <Button>{state.count}</Button>
                <Button
                    onClick={() => {
                        setState({
                            count: state.count + 1,
                        })
                    }}
                >
                    +
                </Button>
            </Button.Group>
        </div>
    )
}
`;
