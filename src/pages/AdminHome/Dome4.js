/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-31 17:20:44
 * @LastEditTime: 2019-06-03 11:49:50
 * @Description:
 **/
import React from 'react';
import { Row, Col, Card } from 'antd';
import styles from './index.module.less';

const replaceHtml = /<(?:.|\s)*?>/g;
export default function Dome4({ lastArticle, lastSay }) {
    return (
        <Row gutter={6}>
            <Col xs={24} sm={24} md={12}>
                <Card className={styles.card3} bordered={false} hoverable={true}>
                    <div className={styles.lastItem}>
                        <div className={styles.avatar}>W</div>
                        <div className={styles.lastRight}>
                            <h5>{lastArticle.title}</h5>
                            <p className={styles.titleTag}>
                                <span>发表于：{lastArticle.create_at}</span>
                                <span>标签：{lastArticle.tag}</span>
                                <span>浏览：{lastArticle.access}</span>
                            </p>
                            <div className="abstract last-content">{lastArticle.abstract}...</div>
                        </div>
                    </div>
                </Card>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <Card className={styles.card3} bordered={false} hoverable={true}>
                    <div className={styles.lastItem}>
                        <div className={styles.avatar} style={{ backgroundColor: '#d078f2' }}>
                            C
                        </div>
                        <div className={styles.lastRight}>
                            <h5>{lastSay.title}</h5>
                            <p className={styles.titleTag}>
                                <span>发表于：{lastArticle.create_at}</span>
                                <span>标签：{lastArticle.tag}</span>
                            </p>
                            <div className="last-content">
                                {lastArticle.content && lastArticle.content.replace(replaceHtml, '')}
                            </div>
                        </div>
                    </div>
                </Card>
            </Col>
        </Row>
    );
}
