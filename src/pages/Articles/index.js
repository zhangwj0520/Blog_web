/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:45:17
 * @LastEditTime: 2019-06-03 15:33:23
 * @Description:
 **/
import React, { useState, useEffect } from 'react';
import { Card, Pagination } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { Link } from 'react-router-dom';
import { formatTime } from '../../common/time';

import { HookGet } from '../../common/fetch';
import styles from './index.module.less';

const initPageSize = 15; //每页数据数量

const Article = ({ isHome }) => {
    // console.log(location);
    // const { pathname } = location;
    // //http://www.hanyuehui.site/get-articles?count=15&current=1
    // http://www.hanyuehui.site/get-articles?count=15&current=1
    // http://www.hanyuehui.site/get-articles?count=10&current=1

    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(initPageSize);

    const [fetchData, data] = HookGet(
        // const { result, fetchData, isLoading, fetchStatus, total, data } = HookGet(
        'http://www.hanyuehui.site/get-articles'
    );

    useEffect(() => {
        // fetchData({ count: pageSize, current: pageIndex });
    }, [pageIndex, pageSize]);

    useEffect(() => {
        // console.log({pageIndex, pageSize, ...query});
        // console.log(result);
    }, [data]);

    const onChange = (pageIndex, pageSize) => {
        setPageIndex(pageIndex);
        setPageSize(pageSize);
    };

    let arts = [
        {
            abstract:
                '### 使用渐变↵```html↵↵```↵```css↵div {↵    width: 400px;↵    height: 200px;↵    margin-top: 100px;↵    margin-left: 100px;↵}↵.line {↵ ',
            created_at: '2018-06-17',
            id: 1,
            tag: '0.5px',
            theme: 'CSS',
            title: '用CSS绘制0.5px的线',
            views: 290
        },
        {
            abstract:
                '### 使用渐变↵```html↵↵```↵```css↵div {↵    width: 400px;↵    height: 200px;↵    margin-top: 100px;↵    margin-left: 100px;↵}↵.line {↵ ',
            created_at: '2018-06-17',
            id: 12,
            tag: '0.5px',
            theme: 'CSS',
            title: '用CSS绘制0.5px的线',
            views: 290
        },
        {
            abstract:
                '### 使用渐变↵```html↵↵```↵```css↵div {↵    width: 400px;↵    height: 200px;↵    margin-top: 100px;↵    margin-left: 100px;↵}↵.line {↵ ',
            created_at: '2018-06-17',
            id: 4,
            tag: '0.5px',
            theme: 'CSS',
            title: '用CSS绘制0.5px的线',
            views: 290
        },
        {
            abstract:
                '### 使用渐变↵```html↵↵```↵```css↵div {↵    width: 400px;↵    height: 200px;↵    margin-top: 100px;↵    margin-left: 100px;↵}↵.line {↵ ',
            created_at: '2018-06-17',
            id: 42,
            tag: '0.5px',
            theme: 'CSS',
            title: '用CSS绘制0.5px的线',
            views: 290
        },
        {
            abstract:
                '### 使用渐变↵```html↵↵```↵```css↵div {↵    width: 400px;↵    height: 200px;↵    margin-top: 100px;↵    margin-left: 100px;↵}↵.line {↵ ',
            created_at: '2018-06-17',
            id: 5,
            tag: '0.5px',
            theme: 'CSS',
            title: '用CSS绘制0.5px的线',
            views: 290
        },
        {
            abstract:
                '### 使用渐变↵```html↵↵```↵```css↵div {↵    width: 400px;↵    height: 200px;↵    margin-top: 100px;↵    margin-left: 100px;↵}↵.line {↵ ',
            created_at: '2018-06-17',
            id: 6,
            tag: '0.5px',
            theme: 'CSS',
            title: '用CSS绘制0.5px的线',
            views: 290
        },
        {
            abstract:
                '### 使用渐变↵```html↵↵```↵```css↵div {↵    width: 400px;↵    height: 200px;↵    margin-top: 100px;↵    margin-left: 100px;↵}↵.line {↵ ',
            created_at: '2018-06-17',
            id: 7,
            tag: '0.5px',
            theme: 'CSS',
            title: '用CSS绘制0.5px的线',
            views: 290
        },
        {
            abstract:
                '### 使用渐变↵```html↵↵```↵```css↵div {↵    width: 400px;↵    height: 200px;↵    margin-top: 100px;↵    margin-left: 100px;↵}↵.line {↵ ',
            created_at: '2018-06-17',
            id: 8,
            tag: '0.5px',
            theme: 'CSS',
            title: '用CSS绘制0.5px的线',
            views: 290
        },
        {
            abstract:
                '### 使用渐变↵```html↵↵```↵```css↵div {↵    width: 400px;↵    height: 200px;↵    margin-top: 100px;↵    margin-left: 100px;↵}↵.line {↵ ',
            created_at: '2018-06-17',
            id: 9,
            tag: '0.5px',
            theme: 'CSS',
            title: '用CSS绘制0.5px的线',
            views: 290
        },
        {
            abstract:
                '### 使用渐变↵```html↵↵```↵```css↵div {↵    width: 400px;↵    height: 200px;↵    margin-top: 100px;↵    margin-left: 100px;↵}↵.line {↵ ',
            created_at: '2018-06-17',
            id: 10,
            tag: '0.5px',
            theme: 'CSS',
            title: '用CSS绘制0.5px的线',
            views: 290
        }
    ];

    return (
        <div style={{ margin: '0 auto' }}>
            <QueueAnim
            // duration={1000}
            // animConfig={[{ opacity: [1, 0] }, { opacity: [1, 0] }]} // 此处修改透明度 动画周期太短
            >
                {arts.map(item => (
                    <Card
                        key={item.id}
                        bordered={false}
                        hoverable
                        // className={[styles.article]}
                        className={[styles.article, styles.animated]}
                        type="inner">
                        <div>
                            <h3>{item.title}</h3>
                            <p className={styles.tag}>
                                <span>发表于：{formatTime(item.create_at)}</span>
                                <span>标签：{item.tag && item.tag.title}</span>
                                <span>浏览：{item.access}</span>
                            </p>
                            <div className={styles.abstract}>{item.abstract}...</div>
                            <Link to={`/article/${item._id}`}>
                                <span className={styles.link}>阅读全文 >></span>
                            </Link>
                        </div>
                    </Card>
                ))}
            </QueueAnim>
            {!isHome && (
                <QueueAnim className={styles.pagination} delay={1000}>
                    <Pagination
                        pageSizeOptions={['5', '10', '15', '20']}
                        current={pageIndex}
                        pageSize={pageSize}
                        onChange={onChange}
                        key="pagination"
                        total={10}
                        showSizeChanger={true}
                        onShowSizeChange={onChange}
                    />
                </QueueAnim>
            )}
        </div>
    );
};
export default Article;
