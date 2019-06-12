import React, {useState} from 'react';
import {Button, Modal} from 'antd';

export function UseModal(props) {
    // let {visible, open, close} = useModal();
    const [visible, setVisible] = useState(false);
    function open() {
        setVisible(true);
    }
    function close() {
        setVisible(false);
    }
    return (
        <div>
            <Button onClick={open}>Open Modal</Button>
            <Modal visible={visible} onCancel={close}>
                Modal
            </Modal>
        </div>
    );
}

// /**
//  * 使用 antd Modal
//  * @param {boolean} initVisible
//  * @return {{visible: boolean, open: function, close: function}}
//  */
// function useModal(initVisible = false) {
//     const [visible, setVisible] = useState(initVisible);
//     function open() {
//         setVisible(true);
//     }
//     function close() {
//         setVisible(false);
//     }
//     return {
//         visible,
//         open,
//         close
//     };
// }

export const source = `import React from 'react'
import { Button, Modal } from 'antd'
import { useModal } from '../../common/hooks'

export default function(props) {
    let {visible, open, close} = useModal()
    return(
        <div>
            <Button onclick={open}>Open Modal</Button>
            <Modal visible={visible} onCancel={close}>
                Modal
            </Modal>
        </div>
    )
}
`;
