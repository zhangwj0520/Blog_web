/**
 * @LastEditors: zhang weijie
 * @Date: 2019-06-03 14:18:30
 * @LastEditTime: 2019-06-03 14:32:18
 * @Description:
 **/
import { Button, message, Modal, Table, Tag, Tooltip, Card } from 'antd';
import React from 'react';
import EditArticle from './EditArticle';
import SearchForm from './SearchForm';
import './style.less';
const confirm = Modal.confirm;

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {},
            visible: false
        };
    }
    onChange = (pageIndex, pageSize) => {
        // if (this.props.articles.isSearch === undefined) {
        //     this.props.RequestArticles({ pageIndex, pageSize });
        // } else {
        //     this.props.SearchArticles({ ...this.props.articles.payload, pageIndex, pageSize });
        // }
    };
    onShowSizeChange = (pageIndex, pageSize) => {
        // if (this.props.articles.isSearch === undefined) {
        //     this.props.RequestArticles({ pageIndex, pageSize });
        // } else {
        //     this.props.SearchArticles({ ...this.props.articles.payload, pageIndex, pageSize });
        // }
    };
    componentDidMount() {
        // this.props.RequestArticles({ pageIndex: 1, pageSize: 5 });
    }
    deleteArticle = id => {
        confirm({
            cancelText: '取消',
            okText: '确定',
            onOk: () => {
                if (localStorage.getItem('identity') === '"manager"') {
                    this.props.DeleteArticle(id);
                } else {
                    message.warning('游客无权删除');
                }
            },
            title: '确定删除这篇文章吗？',
            onCancel() {
                message.warning('取消删除');
            }
        });
    };
    editArticle = article => {
        this.toggleVisible(true);
        this.setState({ article: article });
    };
    toggleVisible = boolean => {
        this.setState({ visible: boolean });
    };
    render() {
        // const { articles, payload, isSearch, len } = this.props.articles;
        const articles = [];
        const [pageIndex, pageSize] = [1, 10];
        const total = 12;

        const columns = [
            {
                key: 'nature',
                render: text => <h4>{text.nature}</h4>,
                title: '文章类型'
            },
            {
                key: 'title',
                render: text => <h4>{text.title}</h4>,
                title: '文章标题'
            },
            {
                key: 'abstract',
                render: _ => (
                    <Tooltip title={_.abstract}>
                        <p className="abstract">{_.abstract}</p>
                    </Tooltip>
                ),
                title: '文章简介'
            },
            {
                key: 'tag',
                render: _ => {
                    if (typeof _.tag === 'string') {
                        return <Tag key={_.tag}>{_.tag}</Tag>;
                    } else {
                        return (
                            <Tag key={_.tag.title} color={_.tag.color}>
                                {_.tag.title}
                            </Tag>
                        );
                    }
                },
                title: '标签'
            },
            {
                dataIndex: 'type',
                key: 'type',
                title: '分类'
            },
            {
                key: 'create_at',
                render: _ => <span>{new Date(_.create_at).toLocaleDateString()}</span>,
                title: '发表时间'
            },
            {
                align: 'center',
                dataIndex: 'access',
                key: 'access',
                title: '浏览数量'
            },
            {
                key: 'action',
                render: _ => (
                    <span>
                        <Button
                            icon="edit"
                            type="primary"
                            size="small"
                            style={{ marginRight: 10 }}
                            onClick={() => this.editArticle(_)}>
                            编辑
                        </Button>
                        <Button icon="delete" type="danger" size="small" onClick={() => this.deleteArticle(_._id)}>
                            删除
                        </Button>
                    </span>
                ),
                title: '操作'
            }
        ];
        return (
            <Card>
                <EditArticle
                    {...this.state.article}
                    toggleVisible={this.toggleVisible}
                    visible={this.state.visible}
                    editArticle={this.editArticle}
                />
                <div className="search-form">
                    <SearchForm />
                </div>
                <Table
                    scroll={{ x: 1000 }}
                    columns={columns}
                    bordered={true}
                    dataSource={articles}
                    rowKey="_id"
                    pagination={{
                        defaultPageSize: 5,
                        pageSizeOptions: ['5', '10', '15', '20'],
                        current: Number(pageIndex),
                        onChange: this.onChange,
                        onShowSizeChange: this.onShowSizeChange,
                        pageSize: Number(pageSize),
                        showSizeChanger: true,
                        total
                    }}
                />
            </Card>
        );
    }
}
export default Articles;
