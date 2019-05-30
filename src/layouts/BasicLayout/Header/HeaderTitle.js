/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 07:55:30
 * @LastEditTime: 2019-05-30 10:39:17
 * @Description:
 **/
import React, { useState } from 'react';
import TextyAnim from 'rc-texty';
import TweenOne from 'rc-tween-one';

import styles from './index.module.less';

const geInterval = e => {
    switch (e.index) {
        case 0:
            return 0;
        case 1:
            return 150;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            return 150 + 450 + (e.index - 2) * 10;
        default:
            return 150 + 450 + (e.index - 6) * 150;
    }
};
const getEnter = e => {
    const t = {
        opacity: 0,
        scale: 0.8,
        y: '-100%'
    };
    if (e.index >= 2 && e.index <= 6) {
        return { ...t, y: '-30%', duration: 150 };
    }
    return t;
};
const getSplit = e => {
    const t = e.split(' ');
    const c = [];
    t.forEach((str, i) => {
        c.push(<span key={`${str}-${i}`}>{str}</span>);
        if (i < t.length - 1) {
            c.push(<span key={` -${i}`} />);
        }
    });
    return c;
};

export default function HeaderTitle(props) {
    const [poetry, setPoetry] = useState('题 诗 寄 汝 非 无 意，莫 负 青 春 取 自 惭!');

    return (
        <div>
            <TextyAnim
                className={styles.title}
                type="mask-top"
                delay={400}
                enter={getEnter}
                interval={geInterval}
                component={TweenOne}
                componentProps={{
                    animation: [
                        { x: 130, type: 'set' },
                        { x: 100, delay: 500, duration: 450 },
                        {
                            duration: 300,
                            ease: 'easeOutQuart',
                            x: 0
                        },
                        {
                            delay: -300,
                            duration: 1000,
                            ease: 'easeInOutQuint',
                            letterSpacing: 0,
                            scale: 0.9
                        },
                        {
                            delay: -300,
                            duration: 1000,
                            ease: 'easeInOutQuint',
                            scale: 1,
                            width: '100%'
                        }
                    ]
                }}>
                哈哈哈哈哈哈
            </TextyAnim>
            <TweenOne
                className={styles.titleBar}
                animation={{
                    delay: 2000,
                    ease: 'easeInOutExpo',
                    type: 'from',
                    width: 0,
                    x: 158
                }}
            />
            <TextyAnim className={styles.content} type="bottom" split={getSplit} delay={2200} interval={30}>
                {poetry}
            </TextyAnim>
        </div>
    );
}
