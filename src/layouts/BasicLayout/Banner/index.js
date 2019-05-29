/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-29 10:00:58
 * @LastEditTime: 2019-05-29 13:39:26
 * @Description:
 **/
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import Banner from './banner';
import bordImage from '../../../assets/image/bord.jpg';
import styles from './style.module.less';

const HomeBanner = () => {
    const [sentence, setSentence] = useState('因为没有丰富阅历和经验！闲下来时多看看书，书本里的故事总有我要学的人生!');
    return (
        <div className={styles.container}>
            <Row gutter={12}>
                <Col sm={24} md={15}>
                    <Banner />
                </Col>
                <Col xs={0} sm={0} md={9}>
                    <div className={styles.word}>
                        <img src={bordImage} alt="" />
                        <p className={styles.wordTitle}>每日一语</p>
                        <p className={styles.wordBody}>{sentence}</p>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default HomeBanner;
