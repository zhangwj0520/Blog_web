/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-29 17:38:24
 * @LastEditTime: 2019-06-01 07:00:41
 * @Description:
 **/
import React, { useState, useContext } from 'react';
import { Card, Tag, Tooltip, Modal } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import portraitBg from '../../../assets/image/portrait_bg.jpg';
import meImg from '../../../assets/image/me.jpg';
import styles from './index.module.less';
import MyIcon from '../../../components/MyIcon';

const { Meta } = Card;

const colors = ['#f50', '#f8a72a', '#87d068', '#108ee9', '#6b61f0'];
const NavSide = props => {
    const { tags, artTypes } = useSelector(state => state.commonData);
    console.log(tags);

    const [visible, setVisible] = useState(false);

    function open() {
        setVisible(true);
    }
    function close() {
        setVisible(false);
    }

    const ArticleNum = 11;
    const totalAccess = 3;
    const articles = [
        { id: 1, title: 'title1' },
        { id: 2, title: 'title2' },
        { id: 3, title: 'title3' },
        { id: 4, title: 'title4' },
        { id: 4, title: 'title4' },
        { id: 4, title: 'title4' },
        { id: 4, title: 'title4' },
        { id: 4, title: 'title4' },
        { id: 4, title: 'title4' },
        { id: 4, title: 'title4' }
    ];

    const links = [
        { id: 1, title: '哈哈哈' },
        { id: 2, title: '呼呼哟' },
        { id: 3, title: '嘻嘻嘻' },
        { id: 4, title: '你好女女女女' }
    ];

    return (
        <div className={styles.sideBar}>
            <Card hoverable className={styles.card} cover={<img alt="example" src={portraitBg} />}>
                <div className={styles.authorImg}>
                    <Link to="/admin">
                        <img src={meImg} alt="" />
                    </Link>
                </div>
                <Meta
                    style={{ textAlign: 'center' }}
                    title={<span className={styles.cardTitle}>name</span>}
                    description={
                        <div>
                            <p className={styles.abstract}>斤斤计对对点点滴滴军军军军</p>
                            <p className={styles.abstract}>
                                <span className={styles.statisticItem}>文章 : {ArticleNum}</span>
                                <span className={styles.spliter} />
                                <span className={styles.statisticItem}>访问 :{totalAccess}</span>
                            </p>
                        </div>
                    }
                />
            </Card>

            <Card hoverable className={styles.card} title="FOLLOW ME">
                <div className={styles.iconWrp}>
                    <div className={styles.aboutMe}>
                        <Tooltip title="github">
                            <a href="https://github.com/zhangwj0520" target="view_window">
                                <MyIcon type="icon-github" />
                            </a>
                        </Tooltip>
                        <Tooltip title="微信">
                            <a href="###" onClick={open}>
                                <MyIcon type="icon-wechat" />
                            </a>
                        </Tooltip>
                        <Tooltip title="github">
                            <a href="https://github.com/zhangwj0520" target="view_window">
                                <MyIcon type="icon-github" style={{ transform: 'rotate(90deg)' }} />
                            </a>
                        </Tooltip>
                        <Tooltip
                            title={
                                <img
                                    className="wx"
                                    src="https://blog-zwj.oss-cn-beijing.aliyuncs.com/weChat.jpg"
                                    alt="微信"
                                    width={100}
                                    height={100}
                                />
                            }>
                            <a href="###">
                                <MyIcon type="icon-github" />
                            </a>
                        </Tooltip>
                    </div>
                </div>
            </Card>

            <Card hoverable className={[styles.card, styles.list]} title="文章列表">
                <ol>
                    {articles &&
                        articles.map((item, index) =>
                            index < 9 ? (
                                <li key={index}>
                                    <Link to={`/article/${item._id}`}>{item.title}</Link>
                                </li>
                            ) : null
                        )}
                </ol>
            </Card>
            <Card hoverable className={[styles.card, styles.list]} title="文章分类">
                <ul>
                    {artTypes &&
                        artTypes.map((item, index) => (
                            <li key={index}>
                                <Link to={`/article?artType=${item.value}`}>{item.value}</Link>
                            </li>
                        ))}
                </ul>
            </Card>

            <Card hoverable className={styles.card} title="云标签">
                {tags &&
                    tags.map((item, index) => (
                        <Tag key={item.value} className={styles.tag}>
                            <Link to={`/article?tag=${item.value}`}>
                                <MyIcon type={item.icon} />
                                <span style={{ color: item.color }}>{item.value}</span>
                            </Link>
                        </Tag>
                    ))}
            </Card>
            <Card hoverable className={[styles.card, styles.list]} title="连接">
                <ul>
                    {links &&
                        links.map((item, index) =>
                            index < 9 ? (
                                <li key={index} style={{ listStyle: 'square' }}>
                                    <Link to={`/article/${item._id}`}>{item.title}</Link>
                                </li>
                            ) : null
                        )}
                </ul>
            </Card>
            <Modal visible={visible} footer={null} onCancel={close}>
                <img
                    alt="example"
                    style={{ width: '100%' }}
                    src="https://blog-zwj.oss-cn-beijing.aliyuncs.com/weChat.jpg"
                />
            </Modal>
        </div>
    );
};
export default NavSide;
