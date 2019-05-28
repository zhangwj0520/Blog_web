import React, { Fragment, Component } from 'react';
import { Layout, Icon } from 'antd';

import './index.less';
const { Footer } = Layout;

export default class FooterView extends Component {
    render() {
        const links = [
            {
                key: '个人主页',
                title: 'Pro 首页',
                // href: 'https://pro.ant.design',
                blankTarget: true
            },
            {
                key: 'github',
                title: <Icon type="github" />,
                // href: 'https://github.com/ant-design/ant-design-pro',
                blankTarget: true
            }
            // {
            //     key: 'Ant Design',
            //     title: 'Ant Design',
            //     // href: 'https://ant.design',
            //     blankTarget: true
            // }
        ];
        return (
            <Footer style={{ padding: 0 }}>
                <footer className="globalFooter">
                    <div className="links">
                        {links.map(link => (
                            <a
                                key={link.key}
                                title={link.key}
                                target={link.blankTarget ? '_blank' : '_self'}
                                href={link.href}>
                                {link.title}
                            </a>
                        ))}
                    </div>
                    <div className="copyright">
                        <Fragment>
                            Copyright <Icon type="copyright" /> 2019 张为杰
                        </Fragment>
                    </div>
                </footer>
            </Footer>
        );
    }
}
