/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-31 17:20:44
 * @LastEditTime: 2019-06-03 11:01:44
 * @Description:
 **/
import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Collapse, Progress, Timeline, Avatar, Tag } from 'antd';
import _ from 'lodash';

import { HookGet } from '../../common/fetch';
import { useSetState } from '../../common/hooks';

import styles from './index.module.less';
const jinrishici = require('jinrishici');

const { Panel } = Collapse;
const { Meta } = Card;

export default function Dome2({ motto }) {
    // const { fetchData, isLoading, fetchStatus, result, total, data } = HookGet('https://api.gushi.ci/all.json');
    const [state, setState] = useSetState({
        matchTags: ['古诗'],
        author: '',
        content: '',
        dynasty: '',
        title: ''
    });
    useEffect(() => {
        jinrishici.load(
            result => {
                console.log(result.data);
                const {
                    matchTags,
                    origin: { author, content, dynasty, title }
                } = result.data;
                setState({ matchTags, author, content, dynasty, title });
            },
            err => {
                console.log(err);
            }
        );
    }, []);
    return (
        <Row gutter={6}>
            <Col xs={24} sm={24} md={12}>
                <Card title="项目进度" className={styles.card1} bordered={false} hoverable={true}>
                    {/* <div>
                        <h3>项目进度</h3>
                        <div>React-bolg</div>
                    </div> */}
                    <div className="pro">
                        <Row gutter={16}>
                            <Col span={12}>
                                <div>ACQ1</div>
                                <Progress type="dashboard" percent={25} width={100} id="pro1" />
                            </Col>
                            <Col span={12}>
                                <div>SmartPress</div>
                                <Progress type="dashboard" percent={50} width={100} id="pro2" />
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <div>BUILD6</div>
                                <Progress type="dashboard" percent={100} width={100} id="pro3" />
                            </Col>
                            <Col span={12}>
                                <div>MSPA</div>
                                <Progress type="dashboard" percent={100} width={100} format={() => 'Done'} id="pro4" />
                            </Col>
                        </Row>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Card title="项目流程" className={styles.card1} bordered={false} hoverable={true}>
                    {/* <div>
                        <h3>项目流程</h3>
                    </div> */}
                    <div className="timeline">
                        <Timeline>
                            <Timeline.Item color="green">
                                <div className="timeItem">创建项目 - 2018-09-01</div>
                                <div className="timeItem">搭建UI框架 - 2018-09-02</div>
                                <div className="timeItem">对接协议 - 2018-09-04</div>
                                <div className="timeItem">实现功能 - 2018-09-05</div>
                            </Timeline.Item>
                            <Timeline.Item color="red">
                                <div className="timeItem">通信调试 - 2018-09-10</div>
                                <div className="timeItem">功能测试 - 2018-09-11</div>
                                <div className="timeItem">错误调试 - 2018-09-13</div>
                            </Timeline.Item>
                            <Timeline.Item color="blue">
                                <div className="timeItem">界面优化 - 2018-09-15</div>
                                <div className="timeItem">性能优化 - 2018-09-17</div>
                                <div className="timeItem">发布版本 - 2018-09-20</div>
                            </Timeline.Item>
                        </Timeline>
                    </div>
                </Card>
            </Col>

            <Col xs={24} sm={24} md={12}>
                <Card title="唐诗宋词" className={styles.card1} bordered={false} hoverable={true}>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: 20 }}>{state.title}</p>
                        <p style={{ position: 'relative', left: 50 }}>-----{state.author}</p>
                        <div className={styles.tag}>
                            {state.matchTags.map((item, index) => (
                                <Tag key={index} color={index === 0 ? 'green' : 'cyan'}>
                                    {item}
                                </Tag>
                            ))}
                        </div>
                        <div className={styles.content}>{state.content}</div>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Card title="人生感悟" className={styles.card1} bordered={false} hoverable={true}>
                    <div className="collapse">
                        <Collapse accordion defaultActiveKey={'0'}>
                            {motto &&
                                motto.map(function(item, index) {
                                    return (
                                        <Panel header={item.classify} key={index}>
                                            <div>{item.text}</div>
                                            <p className="author">----{item.author}</p>
                                        </Panel>
                                    );
                                })}
                        </Collapse>
                    </div>
                </Card>
            </Col>
        </Row>
    );
}
