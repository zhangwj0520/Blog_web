/**
 * @LastEditors: zhang weijie
 * @Date: 2018-02-04 07:33:22
 * @LastEditTime: 2019-05-29 08:05:13
 * @Description:
 **/

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Icon, Popover } from 'antd';

import styles from './index.module.less';
import { hidden } from 'ansi-colors';
// import {showMessage} from '../common/show';
let handle1 = null,
    handle2 = null;

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
                        <h2>
                            <span>Te</span>
                            <span>sla</span>
                        </h2>
                        <p>XXXXXXXXXX</p>
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
