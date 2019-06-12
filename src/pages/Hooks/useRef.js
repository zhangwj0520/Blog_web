import React, {useRef} from 'react';
import {Button} from 'antd';

export function UseRef() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        // current 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };

    return (
        <>
            <input ref={inputEl} type="text" />
            <Button onClick={onButtonClick}>Focus the input</Button>
        </>
    );
}

export const source = `import React, {useRef} from 'react';
import {Button} from 'antd';

export function TextInputWithFocusButton() {
    const inputEl = useRef(null);
    const onButtonClick = () => {
        // current 指向已挂载到 DOM 上的文本输入元素
        inputEl.current.focus();
    };
    return (
        <>
            <input ref={inputEl} type="text" />
            <Button onClick={onButtonClick}>Focus the input</Button>
        </>
    );
}`;
