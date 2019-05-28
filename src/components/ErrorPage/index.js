/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 11:37:33
 * @LastEditTime: 2019-05-28 13:36:43
 * @Description: 错误提示
 **/
import React, { useEffect } from 'react';
import { Modal } from 'antd';

function ErrorComponent() {
    useEffect(() => {
        info();
    }, []);
    const info = () => {
        Modal.info({
            title: '友情提示',
            okText: '确定',
            content: (
                <div>
                    <p>页面开小差了！</p>
                    <p>请手动刷新页面（按F5或者CTL+F5）或者清理浏览器缓存</p>
                </div>
            ),
            onOk() {}
        });
    };

    return null;
}

// class ErrorComponent extends Component {
//     componentWillMount() {
//         this.info();
//     }
//     info = () => {
//         Modal.info({
//             title: '友情提示',
//             okText: '确定',
//             content: (
//                 <div>
//                     <p>页面开小差了！</p>
//                     <p>请手动刷新页面（按F5或者CTL+F5）或者清理浏览器缓存</p>
//                 </div>
//             ),
//             onOk() {}
//         });
//     };
//     render() {
//         return null;
//     }
// }

export default ErrorComponent;
