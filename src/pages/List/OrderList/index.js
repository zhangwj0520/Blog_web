import React, { useState, Fragment, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Form, Table, Button, Input, Badge, Row, Col, Select, Card, Alert, Skeleton } from 'antd';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { HookGet } from '../../../utils/HookFetch';
import styles from '../TableList/index.module.less';

const FormItem = Form.Item;
const initPageSize = 10; //每页数据数量

// const detailList = ({orderId}) => {
//     const {history} = props;
//     history.push({
//         pathname: `/profile/basic`,
//         orderId
//     });
// };

const columns = [
    {
        title: '序号',
        dataIndex: 'key',
        render: (value, record, index) => index + 1
    },
    {
        title: '订单编号',
        dataIndex: 'orderId'
    },
    {
        title: '厂家',
        dataIndex: 'vender'
    },
    {
        title: '品种总数',
        dataIndex: 'medCount'
    },
    {
        title: '中标数量',
        dataIndex: 'winCount'
    },
    {
        title: '订单总金额',
        dataIndex: 'orderTotalPrice'
    },
    {
        title: '中标总金额',
        dataIndex: 'winTotalPrice'
    },
    {
        title: '中标总采购金额',
        dataIndex: 'orderTotalBuyPrice'
    },
    {
        title: '操作',
        dataIndex: 'action',
        render: (value, { orderId, vender }, index) => {
            return (
                <Link to={{ pathname: `/order/detail/${orderId}/${vender}`, query: { vender, orderId } }}>查看</Link>
            );
        }
    }
];

function PagableTable(props) {
    const {
        form,
        form: { getFieldDecorator }
    } = props;
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(initPageSize);
    const [query, setQuery] = useState({});

    const [selectedRowKeys, setSelectedRowKeys] = useState([]); //选中的行数
    const [callTotal, setCallTotal] = useState(0); //计算总数

    const { isLoading, fetchStatus, result, handleGetData, total, data } = HookGet('/v1/order');

    useEffect(() => {
        // handleGetData(query);
        console.log('请求');
        handleGetData({ pageIndex, pageSize, ...query });
    }, [pageIndex, pageSize, query]);

    useEffect(() => {
        console.log(data);
    });

    const handleTableChange = (pagination, filters, sorterArg) => {
        //分页
        let sorter = undefined;
        const { current, pageSize } = pagination;
        setPageIndex(current);
        setPageSize(pageSize);
        //筛选
        const filtersData = Object.keys(filters).reduce((obj, key) => {
            const newObj = { ...obj };
            if (filters[key].length > 0) {
                newObj[key] = filters[key].join(',');
            }
            return newObj;
        }, {});
        //排序
        if (sorterArg.field) {
            sorter = sorterArg.field + '_' + sorterArg.order;
        }
        setQuery(Object.assign({}, query, { sorter }, { ...filtersData }));
    };

    const handleSearch = e => {
        e.preventDefault();
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            setPageIndex(1);
            setQuery(Object.assign({}, query, { ...fieldsValue }));
        });
    };
    const handleFormReset = () => {
        form.resetFields();
        setPageIndex(1);
        setPageSize(initPageSize);
        setQuery({});
    };

    const handleSelectedChange = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
        const total = selectedRows.reduce((sum, val) => sum + val.callNo, 0);
        setCallTotal(total);
    };

    const pagination = {
        current: pageIndex,
        total,
        showTotal: total => '共' + total + '条',
        pageSize,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '15', '20'],
        ...result.pagination
    };

    return (
        <PageHeaderWrapper title="详情页">
            <Card>
                <Skeleton loading={isLoading} active avatar>
                    <Table
                        loading={isLoading}
                        pagination={pagination}
                        dataSource={result.data}
                        columns={columns}
                        scroll={{ x: 1000 }}
                        onChange={handleTableChange}
                        rowKey={record => record.key}
                        // rowSelection={{
                        //     selectedRowKeys,
                        //     onChange: handleSelectedChange,
                        //     getCheckboxProps: record => ({
                        //         disabled: record.disabled
                        //     })
                        // }}
                    />
                </Skeleton>
            </Card>
        </PageHeaderWrapper>
    );
}
const UsePagableTable = Form.create()(PagableTable);
export default UsePagableTable;
