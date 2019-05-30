/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:45:17
 * @LastEditTime: 2019-05-30 18:38:28
 * @Description:
 **/
import React, { useState, useEffect } from 'react';
import { Row, Col, Modal } from 'antd';
import { HookGet } from '../../common/fetch';
import styles from './style.module.less';
import Note from './Note';

const Gather = () => {
    const { result, fetchData, isLoading, fetchStatus, total, data } = HookGet(
        'http://www.hanyuehui.site/get-articles'
    );
    const [visible, setVisible] = useState(false);
    function open() {
        setVisible(true);
    }
    function close() {
        setVisible(false);
    }
    const notes = [
        {
            created_at: '2018-06-14',
            detail:
                '<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#Preflighted_requests" target="_blank" _href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#Preflighted_requests"><strong>HTTP访问控制（CORS）</strong></a></p>',
            id: 2,
            tag: 'cors',
            title: '11111'
        },
        {
            created_at: '2018-06-14',
            detail:
                '<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#Preflighted_requests" target="_blank" _href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#Preflighted_requests"><strong>HTTP访问控制（CORS）</strong></a></p>',
            id: 44,
            tag: 'cors',
            title: '22222'
        }
    ];
    return (
        <div style={{ margin: '0 auto' }}>
            <Row gutter={24}>
                {notes.map((note, index) => (
                    <Col sm={12} key={index}>
                        <Note {...note} animate={index % 2 ? 'right' : 'left'} />
                    </Col>
                ))}
            </Row>

            <Modal visible={visible} footer={null} onCancel={close}>
                <img alt="example" style={{ width: '100%' }} src="http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg" />
            </Modal>
        </div>
    );
};
export default Gather;
