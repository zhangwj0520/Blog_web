/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:45:17
 * @LastEditTime: 2019-05-30 17:51:36
 * @Description:
 **/
import React, { useState, useEffect } from 'react';
import { Row, Col, Skeleton, Switch, Card, Icon, Modal } from 'antd';
import { HookGet } from '../../common/fetch';
import styles from './style.module.less';
const { Meta } = Card;

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
    const notes = [1, 2, 3, 4, 5];
    return (
        <div style={{ margin: '0 auto' }}>
            <Row gutter={24}>
                {notes.map((note, index) => (
                    <Col sm={12} key={index}>
                        <Card
                            size="small"
                            title="Small size card"
                            extra={<a href="#">More</a>}
                            // style={{ marginTop: 8 }}
                            className={styles.card}
                            actions={[
                                <Icon type="setting" onClick={open} />,
                                <Icon type="edit" />,
                                <Icon type="ellipsis" />
                            ]}>
                            <Skeleton loading={isLoading} avatar active>
                                <Meta
                                    title="Card title"
                                    description="This is the description,This is the description,This is the description,This is the description"
                                />
                            </Skeleton>
                            {/* <p>Card content</p>
                            <p>Card content</p>
                            <p>Card content</p> */}
                        </Card>

                        {/* <Note {...note} animate={index % 2 ? 'rotateInUpRight' : 'rotateInDownLeft'} /> */}
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
