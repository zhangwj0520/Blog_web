/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 19:00:03
 * @LastEditTime: 2019-06-03 14:44:44
 * @Description:
 **/
import React from 'react';

import { Drawer, Row, Col } from 'antd';

import LeftSider from './LeftSider';

const drawerWidth = 150;

const SiderMenu = React.memo(({ theme, collapsed, handleChangeTheme, visible, onClose, width }) => {
    return (
        <div style={{ maxHeight: '100vh' }}>
            <Row>
                <Col xs={0} sm={0} md={24}>
                    <LeftSider
                        theme={theme}
                        handleChangeTheme={handleChangeTheme}
                        collapsed={collapsed}
                        width={width}
                    />
                </Col>
                <Col xs={24} sm={24} md={0}>
                    <Drawer
                        // title="Basic Drawer"
                        placement={'left'}
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        width={drawerWidth}
                        bodyStyle={{ padding: 0 }}>
                        {/* <BaseMenu theme={theme} /> */}
                        <LeftSider
                            theme={theme}
                            handleChangeTheme={handleChangeTheme}
                            collapsed={collapsed}
                            drawerWidth={drawerWidth}
                            onClose={onClose}
                        />
                    </Drawer>
                </Col>
            </Row>
        </div>
    );
});

export default SiderMenu;
