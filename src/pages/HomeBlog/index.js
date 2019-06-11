/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:45:17
 * @LastEditTime: 2019-05-30 15:37:02
 * @Description:
 **/

import React from 'react';
import { Link } from 'react-router-dom';
import Articles from '../Articles';
import styles from './style.module.less';

const HomeBlog = () => {
    return (
        <div style={{ margin: '0 auto' }}>
            <Articles isHome={true} />
            <div className={[styles.blockLink]}>
                <Link to="/article">查看全部文章</Link>
            </div>
        </div>
    );
};
export default HomeBlog;
