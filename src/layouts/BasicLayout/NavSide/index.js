/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-29 17:38:24
 * @LastEditTime: 2019-05-30 11:40:03
 * @Description:
 **/
import React, { useState } from 'react';
import { Card, Tag, Tooltip, Modal } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import portraitBg from '../../../assets/image/portrait_bg.jpg';
import meImg from '../../../assets/image/me.jpg';
import styles from './index.module.less';

const { Meta } = Card;

const colors = ['#f50', '#f8a72a', '#87d068', '#108ee9', '#6b61f0'];
const NavSide = props => {
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
    const category = [
        { id: 1, title: 'category1' },
        { id: 2, title: 'category2' },
        { id: 3, title: 'category3' },
        { id: 4, title: 'category4' },
        { id: 4, title: 'category5' },
        { id: 4, title: 'category6' },
        { id: 4, title: 'category7' },
        { id: 4, title: 'category8' }
    ];
    const links = [
        { id: 1, title: '哈哈哈' },
        { id: 2, title: '呼呼哟' },
        { id: 3, title: '嘻嘻嘻' },
        { id: 4, title: '你好女女女女' }
    ];
    const tag = ['node', 'react', 'vue'];

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
                                {/* <span style={{ marginRight: 5, marginLeft: 5 }}>|</span> */}
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
                                <span className={classNames('iconfont', 'icon-github')} />
                            </a>
                        </Tooltip>
                        <Tooltip title="微信">
                            <a href="###" onClick={open}>
                                <span className={classNames('iconfont', 'icon-wechat')} />
                            </a>
                        </Tooltip>
                        <Tooltip title="github">
                            <a href="https://github.com/zhangwj0520" target="view_window">
                                <span
                                    className={classNames('iconfont', 'icon-github')}
                                    style={{ transform: 'rotate(90deg)' }}
                                />
                            </a>
                        </Tooltip>
                        <Tooltip
                            title={
                                <img
                                    className="wx"
                                    src="https://www.zhangweijie.com.cn/weChat.jpg?Expires=1559129861&OSSAccessKeyId=TMP.AgEczaX62X09fnClMRRufdrn-pBRY6XSMO19Uy0KKaG0daWsIMi8PH9WnAkpAAAwLAIUNdK5QOOU6FgxLglMWhoxkPkHcQECFGCdG8XeU2Z2lnl9z7jZoHzXd8FG&Signature=XkJ8dG3warV4tSj6z%2BTx2MNnDEU%3D"
                                    alt="微信"
                                    width={100}
                                    height={100}
                                />
                            }>
                            <a href="###">
                                <span className={classNames('iconfont', 'icon-wechat')} />
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
                    {category &&
                        category.map((item, index) => (
                            <li key={index}>
                                <Link to={`/article/${item._id}`}>{item.title}</Link>
                            </li>
                        ))}
                </ul>
            </Card>

            <Card hoverable className={styles.card} title="云标签">
                {tag &&
                    tag.map((item, index) => (
                        <Tag
                            key={item}
                            color={item.color}
                            className={styles.tag}
                            style={{ backgroundColor: colors[index % 5] }}
                            onClick={() =>
                                //获取响应标签的数据
                                this.props.fetchArticle({
                                    pageIndex: 1,
                                    pageSize: 10,
                                    tagTitle: item
                                })
                            }>
                            <Link to="/"> {item}</Link>
                        </Tag>
                    ))}
            </Card>
            <Card hoverable className={[styles.card, styles.list]} title="连接">
                <ul>
                    {links &&
                        links.map((item, index) =>
                            index < 9 ? (
                                <li key={index} style={{ 'list-style': 'square' }}>
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
                    src="http://www.zhangweijie.com.cn/weChat.jpg?Expires=1559187746&OSSAccessKeyId=TMP.AgEjjnhRLegOPCj-G0worUWlccyvp62MglQl5u2JDjA-1EDRG7ZQJg2xtWMNMC4CFQCTnhHULPD8A6rogaN8H9ggKskYcgIVANtcJslzo8jbvxs-P-agSXDmpl2G&Signature=IzvJKuw%2BAqiY5RI%2FgxzjOmkwgE0%3D"
                />
            </Modal>
        </div>
    );
};
export default NavSide;
