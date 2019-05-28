import React, {Component} from 'react';
import {Layout, Icon} from 'antd';
import Animate from 'rc-animate';
import {Link} from 'react-router-dom';
import RightContent from './RightContent';

import './index.less';
const {Header} = Layout;

export default class HeaderView extends Component {
    state = {
        visible: true
    };
    // static getDerivedStateFromProps(props, state) {
    //     if (!props.autoHideHeader && !state.visible) {
    //         return {
    //             visible: true
    //         };
    //     }
    //     return null;
    // }
    componentDidMount() {
        document.addEventListener('scroll', this.handScroll, {passive: true});
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.handScroll);
    }

    handScroll = () => {
        const {autoHideHeader} = this.props;
        const {visible} = this.state;
        if (!autoHideHeader) {
            return;
        }
        const scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
        if (!this.ticking) {
            this.ticking = true;
            requestAnimationFrame(() => {
                if (this.oldScrollTop > scrollTop) {
                    this.setState({
                        visible: true
                    });
                } else if (scrollTop > 300 && visible) {
                    this.setState({
                        visible: false
                    });
                } else if (scrollTop < 300 && !visible) {
                    this.setState({
                        visible: true
                    });
                }
                this.oldScrollTop = scrollTop;
                this.ticking = false;
            });
        }
    };

    render() {
        const {isMobile, collapsed, onCollapse} = this.props;
        // console.log(collapsed);

        return (
            <Animate component="" transitionName="fade">
                <Header style={{padding: 0, width: '100%', zIndex: 2}}>
                    <div className="header">
                        {isMobile && (
                            <Link to="/" className="logo" key="logo">
                                <img
                                    src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
                                    alt="logo"
                                    width="32"
                                />
                            </Link>
                        )}
                        <span className="trigger" onClick={() => onCollapse(!collapsed)}>
                            <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'} />
                        </span>
                        <RightContent {...this.props} />
                    </div>
                </Header>
            </Animate>
        );
    }
}
