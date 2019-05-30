/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:45:17
 * @LastEditTime: 2019-05-30 17:21:32
 * @Description:
 **/
import React, { useState, useEffect } from 'react';
import { Icon, Pagination, Timeline } from 'antd';
import { Link } from 'react-router-dom';
import QueueAnim from 'rc-queue-anim';
import styles from './style.module.less';

const colorArr = ['blue', 'red', 'green'];

const TimeLine = () => {
    const timeItem = [
        { created_at: '2019-05-27', id: 1, title: '1111' },
        { created_at: '2019-05-17', id: 2, title: '2222' },
        { created_at: '2019-05-02', id: 3, title: '3333' },
        { created_at: '2019-05-01', id: 32, title: '333322' },
        { created_at: '2019-03-27', id: 11, title: '11111' },
        { created_at: '2019-03-17', id: 12, title: '12222' },
        { created_at: '2019-03-02', id: 13, title: '13333' },
        { created_at: '2019-02-27', id: 21, title: '21111' },
        { created_at: '2019-01-17', id: 22, title: '22222' },
        { created_at: '2019-01-02', id: 23, title: '23333' }
    ];
    const timeAry = [];

    const onChange = () => {};

    timeItem.forEach((item, index, arr) => {
        let timeStr = item.created_at.substring(0, item.created_at.lastIndexOf('-'));

        if (
            index === 0 ||
            timeStr != arr[index - 1].created_at.substring(0, arr[index - 1].created_at.lastIndexOf('-'))
        ) {
            timeAry.push({
                type: 'time',
                key: index + timeStr,
                title: timeStr
            });
            timeAry.push({
                type: 'item',
                key: index,
                id: item.id,
                color: colorArr[index % 3],
                title: item.title
            });
        } else {
            timeAry.push({
                type: 'item',
                key: index,
                id: item.id,
                color: colorArr[index % 3],
                title: item.title
            });
        }
    });
    console.log(timeAry);

    return (
        <div style={{ margin: '0 auto' }}>
            <div className={styles.container}>
                <Timeline className={styles.alternate}>
                    {timeAry.map((item, index) => {
                        return item.type === 'time' ? (
                            <Timeline.Item
                                className={styles.itemRight}
                                key={item.key}
                                color={'#10e996'}
                                dot={<Icon type="clock-circle-o" style={{ fontSize: '16px', color: '#e94310' }} />}>
                                <QueueAnim
                                    animConfig={[
                                        { opacity: [1, 0], translateX: [0, 150] },
                                        { opacity: [1, 0], translateX: [0, -150] }
                                    ]}
                                    duration={1500}>
                                    <div key={index}>
                                        <p className="time">{item.title}</p>
                                    </div>
                                </QueueAnim>
                            </Timeline.Item>
                        ) : (
                            <Timeline.Item key={item.key} color={item.color} className={styles.itemLeft}>
                                <QueueAnim
                                    animConfig={[
                                        { opacity: [1, 0], translateX: [0, 150] },
                                        { opacity: [1, 0], translateX: [0, -150] }
                                    ]}
                                    duration={1500}>
                                    <div key={item.key}>
                                        <Link to={`/article/${item._id}`}>
                                            <p className="title">{item.title}</p>
                                        </Link>
                                    </div>
                                </QueueAnim>
                            </Timeline.Item>
                        );
                    })}
                </Timeline>
                <div className={styles.pagination}>
                    <Pagination current={1} pageSize={10} total={30} onChange={onChange} />
                </div>
            </div>
        </div>
    );
};
export default TimeLine;
