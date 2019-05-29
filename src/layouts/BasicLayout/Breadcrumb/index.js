/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 18:49:06
 * @LastEditTime: 2019-05-28 19:04:42
 * @Description:
 **/
import React from 'react';

import styles from './index.module.less';

export default ({ title }) => {
    console.log(title);
    return (
        <div className={styles.breadCrumb}>
            <span className="fl">当前位置 : {title}</span>
        </div>
    );
};
