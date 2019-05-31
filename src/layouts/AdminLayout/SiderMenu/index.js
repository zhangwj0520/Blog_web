/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 19:00:03
 * @LastEditTime: 2019-05-31 13:50:42
 * @Description:
 **/
import React from 'react';

import { Drawer, Row, Col } from 'antd';

import LeftSider from './LeftSider';

const drawerWidth = 150;

const SiderMenu = React.memo(({ theme, collapsed, handleChangeTheme, visible, onClose }) => {
    return (
        <div>
            <Row>
                <Col xs={0} sm={24}>
                    <LeftSider theme={theme} handleChangeTheme={handleChangeTheme} collapsed={collapsed} />
                </Col>
                <Col xs={24} sm={0}>
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
                            width={drawerWidth}
                        />
                    </Drawer>
                </Col>
            </Row>
        </div>
    );
});

export default SiderMenu;
