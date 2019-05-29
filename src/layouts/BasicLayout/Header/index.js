/**
 * @LastEditors: zhang weijie
 * @Date: 2018-02-04 07:33:22
 * @LastEditTime: 2019-05-29 16:37:29
 * @Description:
 **/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Icon, Popover } from 'antd';
import Texty from 'rc-texty';
import TweenOne from 'rc-tween-one';

import styles from './index.module.less';
let handle1 = null,
    handle2 = null;

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

function showMessage(ele, text, time = 4000, delay = 0) {
    clearTimeout(handle1);

    handle1 = setTimeout(() => {
        ele.innerHTML = text;
        ele.style.opacity = 100;

        clearTimeout(handle2);

        handle2 = setTimeout(() => {
            ele.style.opacity = 0;
        }, time);
    }, delay);
}

class HeaderNav extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            keyword: '',
            link: '',
            visible: false
        };
    }

    onSearch = keyword => {
        if (keyword.trim() == '') {
            return;
        }

        this.setState({ visible: false });
        keyword = keyword.substr(0, 15);
        this.context.router.push(`/search/${keyword}`);
    };

    handleChange = event => {
        this.setState({ keyword: event.target.value });
    };

    onClick = event => {
        this.setState({
            link: event.target.getAttribute('data-key')
        });
    };

    handleVisibleChange = visible => {
        this.setState({ visible: !this.state.visible });
    };

    // handleMouseOver = () => {
    //     if (loadlive2d) {
    //         showMessage(document.querySelector('.live2d-message'), '在找什么东西呢，需要帮忙吗？', 3000);
    //     }
    // };

    render() {
        const links = [
            { key: '', text: '主页' },
            { key: 'article', text: '文章' },
            { key: 'timeline', text: '归档' },
            { key: 'gather', text: '点滴' },
            { key: 'gossip', text: '慢生活' }
        ];

        let Search = Input.Search;
        let currLink = this.state.link;
        const content = (
            <Col sm={0}>
                <div onClick={this.onClick}>
                    {links.map(item =>
                        item.key === currLink ? (
                            <p
                                className={[styles.navbarTtem, styles.active]}
                                key={item.key}
                                onClick={this.handleVisibleChange}>
                                <Link to={'/' + item.key} data-key={item.key}>
                                    {item.text}
                                </Link>
                            </p>
                        ) : (
                            <p className={[styles.navbarTtem]} key={item.key}>
                                <Link to={'/' + item.key} data-key={item.key} onClick={this.handleVisibleChange}>
                                    {item.text}
                                </Link>
                            </p>
                        )
                    )}
                    <div style={{ padding: '10px' }}>
                        <Search
                            size="large"
                            placeholder="Search"
                            value={this.state.keyword}
                            onSearch={this.onSearch}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
            </Col>
        );

        return (
            <div className={styles.HeaderNav}>
                <div className={styles.container}>
                    <div className={styles.siteLogo}>
                        {/* <h2>
                            <span>Te</span>
                            <span>sla</span>
                        </h2> */}
                        <Texty
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
                        </Texty>
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
                        <Texty className={styles.content} type="bottom" split={getSplit} delay={2200} interval={30}>
                            题 诗 寄 汝 非 无 意，莫 负 青 春 取 自 惭!
                        </Texty>
                    </div>
                    <div className={styles.navbarCollapse}>
                        <Col xs={24} sm={0}>
                            <div className={styles.navbarCollapseButton}>
                                <Icon
                                    type={this.state.visible ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.handleVisibleChange}
                                />
                            </div>
                            <div className={styles.navbarCollapseBody} style={{ height: this.state.visible ? 280 : 0 }}>
                                {content}
                            </div>
                        </Col>
                    </div>
                </div>
                <Row>
                    <Col xs={0} sm={24}>
                        <div className={styles.navTop}>
                            <div className={styles.navContainer}>
                                <ul onClick={this.onClick} style={{ marginLeft: '-45px' }}>
                                    {links.map(item => (
                                        <li className={styles.navTopItem} key={item.key}>
                                            <Link to={`/${item.key}`} data-key={item.key}>
                                                {item.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                                <div className={styles.navTopSearch} onMouseOver={this.handleMouseOver}>
                                    <Search
                                        size="default"
                                        placeholder="Search"
                                        value={this.state.keyword}
                                        onSearch={this.onSearch}
                                        onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default HeaderNav;
