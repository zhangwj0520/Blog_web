/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 17:55:52
 * @LastEditTime: 2019-05-30 18:31:19
 * @Description:
 **/
import React, { useState } from 'react';
import { Modal } from 'antd';
import { escape2Html } from '../../common/utils';
import styles from './style.module.less';
import classNames from 'classnames';
import classnames from 'classnames';

export default function Note({ animate, title, created_at, detail, tag }) {
    const [visible, setVisible] = useState(false);
    function open() {
        setVisible(true);
    }
    function close() {
        setVisible(false);
    }
    //animate
    const cls =
        animate === 'right'
            ? classNames(styles.noteWarp, styles.rotateInUpRight)
            : classNames(styles.noteWarp, styles.rotateInDownLeft);
    return (
        <div>
            <div className={cls} onClick={open}>
                <p className={styles.noteTitle}>{title}</p>
                <p className={styles.noteCreated}>{created_at}</p>
                <div className={styles.noteAbstract}>{escape2Html(detail).replace(/<\/?[^>]+(>|$)/g, '')}</div>
                <p className={styles.noteAuthor}>Tesla</p>
            </div>
            <Modal visible={visible} footer={null} onCancel={close} title={title} style={{ maxWidth: '100%' }}>
                <p className={styles.nodeTag}>
                    post@: {created_at} &nbsp;&nbsp; 标签: {tag}
                </p>
                <div className={styles.noteDetail} dangerouslySetInnerHTML={{ __html: detail }} />
            </Modal>
        </div>
    );
}
