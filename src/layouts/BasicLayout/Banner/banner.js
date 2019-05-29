/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-29 10:03:10
 * @LastEditTime: 2019-05-29 11:56:26
 * @Description:
 **/
import { Row, Col } from 'antd';
import React, { Component } from 'react';

import styles from './style.module.less';

import bannerImg1 from '../../../assets/image/banner1.jpg';
import bannerImg2 from '../../../assets/image/banner2.jpg';
import bannerImg3 from '../../../assets/image/banner3.jpg';
import bannerImg4 from '../../../assets/image/banner4.jpg';

const imgList = [bannerImg1, bannerImg2, bannerImg3, bannerImg4];
let imgLen = imgList.length;

class Banner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0
        };
    }

    componentDidMount() {
        this.handle = setInterval(() => {
            this.setState({ index: (this.state.index + 1) % imgLen });
        }, 5000);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.index !== nextState.index;
    }

    componentWillUnmount() {
        clearInterval(this.handle);
    }

    handleClick = event => {
        clearInterval(this.handle);
        this.setState({ index: +event.target.getAttribute('data-key') });

        this.handle = setInterval(() => {
            this.setState({ index: (this.state.index + 1) % imgLen });
        }, 5000);
    };

    render() {
        return (
            <div className={styles.bannerWrap}>
                <Row gutter={5}>
                    <Col xs={19} sm={19}>
                        <div className={styles.bannerList}>
                            {imgList.map((img, index) => {
                                let opacity = this.state.index === index ? 1 : 0;
                                return (
                                    <div className={styles.bannerItem} key={index} style={{ opacity: opacity }}>
                                        <img src={img} alt="" />
                                    </div>
                                );
                            })}
                        </div>
                    </Col>
                    <Col xs={5} sm={5}>
                        <div className={styles.bannerPreview} onClick={this.handleClick}>
                            {imgList.map((img, index) => {
                                return (
                                    <div className={styles.bannerpreviewitem} key={index}>
                                        <img src={img} data-key={index} alt="" />
                                    </div>
                                );
                            })}
                            <div className={styles.bannerPreviewArrow} style={{ top: `${this.state.index * 25}%` }}>
                                <div className={styles.bannerPreviewArrawInner} />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Banner;
