import React, { useEffect, useContext } from 'react';
import { context } from '../../store/context-hooks';
import { Button, message, Modal, Table, Tag, Tooltip, Card } from 'antd';
import EditArticle from './EditArticle';
import SearchForm from './SearchForm';
import { useSetState } from '../../common/hooks';
import { fetchData, checkDataStatus, dateFormat } from '../../common/utils';
import _ from 'lodash';
import './style.less';
const confirm = Modal.confirm;

const Articles = () => {
    const {
        globalState,
        globalState: { tags }
    } = useContext(context); //获取hooks全局状态
    // console.log(globalState);
    const [state, setState] = useSetState({
        data: [],
        article: {},
        visible: false,
        pageIndex: 1,
        pageSize: 10,
        query: {},
        totalSize: 0,
        isChangeTag: 0
    });

    const { data, article, visible, pageIndex, pageSize, query, totalSize, isChangeTag } = state;
    useEffect(() => {
        fetchData('/blog/articles', { pageIndex, pageSize, ...query }).then(res => {
            if (checkDataStatus(res)) {
                // console.log(res);
                const { totalSize, data } = res;
                setState({ data, totalSize });
            }
        });
    }, [pageIndex, pageSize, setState, isChangeTag, query]);

    const onChange = (pagination, filters, sorter) => {
        const { current, pageSize } = pagination;
        setState({ pageIndex: current, pageSize });
    };
    const deleteArticle = id => {
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
    const editArticle = article => {
        setState({ visible: true, article });
    };
    function close() {
        setState({ visible: false });
    }

    const columns = [
        {
            dataIndex: '_id',
            title: '序号',
            render: (text, row, index) => index + 1
        },
        {
            dataIndex: 'nature',
            title: '文章类型',
            render: text => <h4>{text}</h4>
        },
        {
            dataIndex: 'title',
            title: '文章标题',
            render: text => <h4>{text}</h4>
        },
        {
            dataIndex: 'abstract',
            title: '文章简介',
            render: val => (
                <Tooltip title={val}>
                    <p className="abstract">{val}</p>
                </Tooltip>
            )
        },
        {
            dataIndex: 'tag',
            title: '标签',
            render: (val, row) =>
                val.map(item => {
                    let index = _.findIndex(tags, ['value', item]);
                    let color = '#FFF';
                    if (index > -1) {
                        color = tags[index].color;
                    }
                    return (
                        <Tag key={item} color={color}>
                            {item}
                        </Tag>
                    );
                })
        },
        {
            dataIndex: 'type',
            title: '分类'
        },
        {
            dataIndex: 'create_at',
            title: '发表时间',
            render: val => dateFormat(val, 'yyyy-MM-dd HH:mm:ss')
            // render: val => <span>{new Date(val).toLocaleString()}</span>
        },
        {
            align: 'center',
            dataIndex: 'access',
            title: '浏览数量'
        },
        {
            dataIndex: 'action',
            render: (val, row) => (
                <span>
                    <Button
                        icon="edit"
                        type="primary"
                        size="small"
                        style={{ marginRight: 10 }}
                        onClick={() => editArticle(row)}>
                        编辑
                    </Button>
                    <Button icon="delete" type="danger" size="small" onClick={deleteArticle}>
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
                article={article}
                visible={visible}
                close={close}
                tags={tags}
                editArticle={editArticle}
                setState={setState}
            />
            <div className="search-form">
                <SearchForm setState={setState} />
            </div>
            <Table
                scroll={{ x: 1000 }}
                columns={columns}
                bordered={true}
                dataSource={data}
                rowKey="_id"
                onChange={onChange}
                pagination={{
                    defaultPageSize: 5,
                    pageSizeOptions: ['5', '10', '15', '20'],
                    current: pageIndex,
                    pageSize: pageSize,
                    showSizeChanger: true,
                    total: totalSize
                }}
            />
        </Card>
    );
};
export default Articles;
