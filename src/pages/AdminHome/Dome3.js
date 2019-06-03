/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-31 17:20:44
 * @LastEditTime: 2019-06-03 11:27:26
 * @Description:
 **/
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Collapse, Progress, Timeline, Avatar, Tag } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import DataSet from '@antv/data-set';
import styles from './index.module.less';

const onTooltipChange = event => {
    const { items } = event;
    items.forEach(item => {
        if (item.name === 'say') {
            item.name = '说说';
        } else if (item.name === 'collect') {
            item.name = '收藏';
        } else {
            item.name = '文章';
        }
    });
};
const itemFormatter = text => {
    if (text === 'say') {
        return '说说';
    } else if (text === 'collect') {
        return '收藏';
    } else {
        return '文章';
    }
};

const ds = new DataSet();

const cols = {
    month: {
        range: [0, 1]
    }
};

export default function Dome2({ blogData, accessData }) {
    const dv = ds.createView().source(blogData);
    dv.transform({
        type: 'fold',
        fields: ['article', 'say', 'collect'],
        // 展开字段集
        key: 'city',
        // key字段
        value: 'temperature' // value字段
    });

    return (
        <Row gutter={6}>
            <Col xs={24} sm={24} md={12}>
                <Card className={styles.card2} hoverable={true} bordered={false}>
                    <Chart height={400} data={dv} scale={cols} forceFit onTooltipChange={onTooltipChange}>
                        <p className={styles.title}>博客各月份更新数据统计</p>
                        <Legend itemFormatter={itemFormatter} />
                        <Axis name="month" />
                        <Axis
                            name="temperature"
                            label={{
                                formatter: val => val
                            }}
                        />
                        <Tooltip
                            crosshairs={{
                                type: 'y'
                            }}
                        />
                        <Geom type="line" position="month*temperature" size={2} color={'city'} shape={'smooth'} />
                        <Geom
                            type="point"
                            position="month*temperature"
                            size={4}
                            shape={'circle'}
                            color={'city'}
                            style={{
                                stroke: '#fff',
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Card className={styles.card2} hoverable={true} bordered={false}>
                    <p className={styles.title}>博客各月份访问人数统计</p>
                    <Chart height={400} data={accessData} forceFit={true} style={{ maxWidth: 750, paddingBottom: 50 }}>
                        <Axis name="month" />
                        <Axis name="value" />
                        <Tooltip />
                        <Legend />
                        <Geom type="interval" position="month*value" color="month" />
                    </Chart>
                </Card>
            </Col>
        </Row>
    );
}
