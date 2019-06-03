/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 18:51:57
 * @LastEditTime: 2019-06-03 11:49:58
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
    const { fetchData, isLoading, fetchStatus, result, total, data } = HookGet('/mock/blog/profile');

    useEffect(() => {
        fetchData();
    }, []);
    useEffect(() => {
        console.log(result);
        // console.log(getContent.result);
    }, [result]);

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
            <Dome2 motto={result.motto} />
            <Dome3 blogData={result.blogData || []} accessData={result.accessData || []} />
            <Dome4 lastArticle={result.lastArticle || {}} lastSay={result.lastSay || {}} />
        </div>
    );
}
