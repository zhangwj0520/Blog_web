/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 18:51:57
 * @LastEditTime: 2019-06-03 15:59:54
 * @Description:
 **/
import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'antd';
import CountUp from 'react-countup';

import { HookGet } from '../../common/fetch';
import MyIcon from '../../components/MyIcon';
import Dome2 from './Dome2';
import Dome3 from './Dome3';
import Dome4 from './Dome4';

import styles from './index.module.less';
const jinrishici = require('jinrishici');

const list = [
    {
        color: '#70ec9a',
        icon: 'icon-team',
        title: '访问人次',
        value: 111
    },
    {
        color: '#8fc9fb',
        icon: 'icon-file',
        title: '文章数量',
        value: 22
    },
    {
        color: '#ff0d01b8',
        icon: 'icon-heart',
        title: '收藏条数',
        value: 23
    },
    {
        color: '#f69899',
        icon: 'icon-message',
        title: '说说条数',
        value: 23
    }
];
export default function Index() {
    const [fetchData, data, total] = HookGet('/mock/blog/profile');

    useEffect(() => {
        // console.log(fetchData);
        fetchData();
        // fetchData();
        // fetchData();
        // fetchData();
    }, []);
    useEffect(() => {
        // console.log(data);
        // console.log(getContent.result);
    }, []);

    return (
        <div>
            <Row gutter={6}>
                {list.map((item, index) => (
                    <Col key={index} xs={24} sm={{ span: 12 }} md={{ span: 12 }} xl={{ span: 6 }} xxl={{ span: 6 }}>
                        <Card className={styles.card} bordered={false} hoverable={true}>
                            <div className={styles.cardItem}>
                                <MyIcon
                                    type={item.icon}
                                    style={{
                                        color: item.color,
                                        fontSize: 54
                                    }}
                                />
                                <div className={styles.cardRight}>
                                    <p className={styles.title}>{item.title}</p>
                                    <CountUp
                                        start={0}
                                        end={item.value}
                                        separator=""
                                        duration={3}
                                        style={{
                                            fontSize: 25
                                        }}
                                    />
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Dome2 motto={data.motto} />
            <Dome3 blogData={data.blogData || []} accessData={data.accessData || []} />
            <Dome4 lastArticle={data.lastArticle || {}} lastSay={data.lastSay || {}} />
        </div>
    );
}
