import React, { useState, Fragment, useEffect } from 'react';
import moment from 'moment';
import {
    Form,
    Table,
    Button,
    Input,
    Badge,
    Row,
    Col,
    Modal,
    Card,
    Switch,
    Skeleton,
    Divider,
    Popconfirm,
    InputNumber
} from 'antd';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import { HookGet } from '../../../utils/HookFetch';
import { Fetch } from '../../../utils/Fetch';
import { fetchData } from '../../../utils/utils';
import { useSetState } from '../../../common/hooks';

const initPageSize = 10; //每页数据数量

const modalColumns = [
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
        title: '类别',
        dataIndex: 'medType'
    },
    {
        title: '订单价格',
        dataIndex: 'orderPrice'
    },
    {
        title: '采购价格',
        dataIndex: 'buyPrice'
    },
    {
        title: '是否中标',
        dataIndex: 'isWin',
        render: (value, record, index) => {
            return <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={value} disabled />;
        }
    },
    {
        title: '品质及要求',
        dataIndex: 'description'
    }
];

function PagableTable({
    match: {
        params: { orderId, vender }
    },
    form,
    form: { getFieldDecorator }
}) {
    const [state, setState] = useSetState({
        pageIndex: 1,
        pageSize: initPageSize,
        query: { orderId },
        orderData: [],
        inputValue: {},
        modalVisible: false,
        modalData: [],
        modalLoading: false,
        medName: '',
        id: 0
    });
    const {
        pageIndex,
        pageSize,
        query,
        orderData,
        inputValue,
        modalVisible,
        modalData,
        modalLoading,
        medName,
        id
    } = state;

    const [getData, dataSource] = Fetch('/v1/med/one');

    function open({ id, medName }) {
        setState({ modalVisible: true, modalLoading: true, medName, id });
        getData({ medName });
        fetchData('/v1/med/one', { medName }).then(json => {
            console.log(json);
        });
    }
    useEffect(() => {
        setState({ modalData: dataSource, modalLoading: false });
    }, [dataSource]);

    function close() {
        setState({ modalVisible: false });
    }

    const [getOrderData, data, total, result, isLoading] = Fetch('/v1/order/detail');

    useEffect(() => {
        // handleGetData(query);
        getOrderData({ pageIndex, pageSize, ...query });
    }, [pageIndex, pageSize, query]);

    useEffect(() => {
        setState({ orderData: data });
    }, [data]);

    const handleTableChange = (pagination, filters, sorterArg) => {
        //分页
        let sorter = undefined;
        const { current, pageSize } = pagination;

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
        setState({ pageIndex: current, pageSize, query: Object.assign({}, query, { sorter }, { ...filtersData }) });
        // setQuery();
    };

    const columns = [
        {
            title: '序号',
            dataIndex: 'key',
            render: (value, record, index) => index + 1
        },
        {
            title: '品名',
            dataIndex: 'medName',
            render: (value, record, index) => (
                <a href="###" onClick={e => open(record)}>
                    {value}
                </a>
            )
        },
        {
            title: '类别',
            dataIndex: 'medType'
        },
        {
            title: '产地',
            dataIndex: 'origin'
        },
        {
            title: '计划采购量(Kg)',
            dataIndex: 'quantity'
        },
        {
            title: '采购价格(元)',
            dataIndex: 'buyPrice',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <InputNumber
                            onChange={value => handleFieldChange(value, 'buyPrice', record.id)}
                            placeholder={text ? text : '采购价格(元)'}
                            min={0}
                            step={0.5}
                        />
                    );
                }
                return text;
            }
        },
        {
            title: '订单价格(元)',
            dataIndex: 'orderPrice',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <InputNumber
                            onChange={value => handleFieldChange(value, 'orderPrice', record.id)}
                            placeholder={text ? text : '订单价格(元)'}
                            min={0}
                            step={0.5}
                        />
                    );
                }
                return text;
            }
        },
        {
            title: '是否中标',
            dataIndex: 'isWin',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Switch
                            defaultChecked={text}
                            onChange={value => handleFieldChange(value, 'isWin', record.id)}
                        />
                    );
                }
                return <Switch disabled={true} defaultChecked={text} />;
            }
        },
        {
            title: '是否结算',
            dataIndex: 'isCheck',
            render: (text, record) => {
                if (record.editable) {
                    return (
                        <Switch
                            defaultChecked={text}
                            onChange={value => handleFieldChange(value, 'isCheck', record.id)}
                        />
                    );
                }
                return <Switch disabled={true} defaultChecked={text} />;
            }
        },
        {
            title: '采购总价(元)',
            dataIndex: 'totalBuyPrice'
        },
        {
            title: '订单总价(元)',
            dataIndex: 'totalPrice'
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                if (record.editable) {
                    if (record.isNew) {
                        return (
                            <span>
                                <a onClick={e => saveRow(record.id)}>添加</a>
                                {/* <Divider type="vertical" />
                                <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record.key)}>
                                    <a>删除</a>
                                </Popconfirm> */}
                            </span>
                        );
                    }
                    return (
                        <span>
                            <a onClick={e => saveRow(record.id)}>保存</a>
                            <Divider type="vertical" />
                            <a onClick={e => cancel(record.id)}>取消</a>
                        </span>
                    );
                }
                return (
                    <span>
                        <a onClick={e => toggleEditable(record.id)}>编辑</a>
                        {/* <Divider type="vertical" />
                        <Popconfirm title="是否要删除此行？" onConfirm={() => remove(record.id)}>
                            <a>删除</a>
                        </Popconfirm> */}
                    </span>
                );
            }
        }
    ];

    const toggleEditable = id => {
        const newData = orderData.map(item => {
            if (item.id === id) {
                item.editable = true;
            } else {
                delete item.editable;
            }
            return item;
        });
        setState({ orderData: newData });
    };
    const remove = id => {
        console.log(id);
    };

    const saveRow = id => {
        fetchData('/v1/med/update', { data: { id, orderId, ...inputValue } }, 'PUT').then(json => {});

        const newData = orderData.map(item => {
            if (item.id === id) {
                item = Object.assign(item, inputValue);
                setState({ inputValue: {} });
                delete item.editable;
            }
            return item;
        });
        console.log(newData);
        setState({ orderData: newData });
    };
    const cancel = id => {
        const newData = orderData.map(item => {
            if (item.id === id) {
                delete item.editable;
            }
            return item;
        });
        setState({ orderData: newData });
    };

    const pagination = {
        current: pageIndex,
        total,
        showTotal: total => '共' + total + '条',
        pageSize,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40']
    };

    const handleFieldChange = (value, fieldName, id) => {
        let newValue = Object.assign(inputValue, {});
        newValue[fieldName] = value;
        setState({ inputValue: newValue });
    };
    const handleSave = e => {
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                fetchData('/v1/med/update', { data: { id, orderId, ...values } }, 'PUT').then(json => {
                    // getOrderData({ pageIndex, pageSize, ...query });
                    const newData = orderData.map(item => {
                        if (item.id === id) {
                            item = Object.assign(item, values);
                            // setState({ inputValue: {} });
                        }
                        return item;
                    });
                    setState({ orderData: newData });
                    close();
                });
            }
        });
    };

    const Footer = (
        <Row type="flex" justify="center" align="middle" gutter={16}>
            <Col>
                <Button type="primary" onClick={close}>
                    取消
                </Button>
            </Col>
            <Col>
                <Button type="primary" onClick={handleSave}>
                    确定
                </Button>
            </Col>
        </Row>
    );

    return (
        <PageHeaderWrapper title={`${vender}-${orderId}`}>
            <Card>
                <Skeleton loading={isLoading} active avatar>
                    <Table
                        loading={isLoading}
                        pagination={pagination}
                        dataSource={orderData}
                        columns={columns}
                        scroll={{ x: 1000 }}
                        onChange={handleTableChange}
                        rowKey={record => record.id}
                    />
                </Skeleton>
            </Card>

            <Modal
                visible={modalVisible}
                destroyOnClose={true}
                onCancel={close}
                title={`报价分析----${medName}`}
                width={'70%'}
                footer={Footer}>
                <div>
                    <Form onSubmit={handleSave}>
                        <Row gutter={5}>
                            <Col lg={12} md={12} sm={24}>
                                <Form.Item label="订单价格" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                                    {getFieldDecorator('orderPrice', {
                                        rules: [{ required: true, message: '订单价格(报价)' }]
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                            <Col lg={12} md={12} sm={24}>
                                <Form.Item label="采购价格" labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                                    {getFieldDecorator('buyPrice', {
                                        rules: [{ required: true, message: '采购价格(购买价格)' }]
                                    })(<Input />)}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Table
                            columns={modalColumns}
                            rowKey={record => record.id}
                            dataSource={modalData}
                            pagination={false}
                            loading={modalLoading}
                        />
                    </Form>
                </div>
            </Modal>
        </PageHeaderWrapper>
    );
}
const UsePagableTable = Form.create()(PagableTable);
export default UsePagableTable;
