/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-29 10:00:58
 * @LastEditTime: 2019-06-04 14:46:09
 * @Description:
 **/
import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';

import Banner from './banner';
import bordImage from '../../../assets/image/bord.jpg';
import styles from './style.module.less';
import { HookGet, Fetch } from '../../../common/fetch';
import { useAbortableFetch } from '../../../common/hooks';

const str = '因为没有丰富阅历和经验！闲下来时多看看书，书本里的故事总有我要学的人生';

const HomeBanner = () => {
    const [sentence, setSentence] = useState(str);

    const [fetchData, result] = Fetch('https://v1.hitokoto.cn/');
    // const [fetchData, result] = HookGet('https://v1.hitokoto.cn/');

    /*  如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），
    可以传递一个空数组（[]）作为第二个参数。
    这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，
    所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循输入数组的工作方式。 */

    useEffect(() => {
        //这个连续执行了6次为了测试abort功能,打开浏览器查看
        fetchData({ c: 'f' });
        fetchData({ c: 'f' });
        fetchData({ c: 'f' });
        // fetchData({ c: 'f' });
        // fetchData({ c: 'f' });
        // fetchData({ c: 'f' });
    }, []);

    useEffect(() => {
        console.log(result);
        result.hitokoto && setSentence(result.hitokoto);
    }, [result]);

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
            <Row gutter={12}>
                <Col sm={24} md={0}>
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
