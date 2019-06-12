import React, {useState, Fragment, useEffect} from 'react';
import moment from 'moment';
import {Form, Table, Button, Input, Badge, Row, Col, Select, Card, Alert, Skeleton} from 'antd';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import {HookPost, HookGet} from '../../../utils/HookFetch';
import styles from '../TableList/index.module.less';

import axios from '../../../utils/axios';
import {pySegSort} from '../../../utils/utils';

const FormItem = Form.Item;
const {Option} = Select;
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];
const initPageSize = 10; //每页数据数量

const columns = [
    {
        title: '规则名称',
        dataIndex: 'name',
        render: text => <span onClick={() => this.previewItem(text)}>{text}</span>
    },
    {
        title: '描述',
        dataIndex: 'desc'
    },
    {
        title: '服务调用次数',
        dataIndex: 'callNo',
        sorter: true,
        render: val => val + '万',
        needTotal: true
    },
    {
        title: '状态',
        dataIndex: 'status',
        filters: [
            {
                text: status[0],
                value: 0
            },
            {
                text: status[1],
                value: 1
            },
            {
                text: status[2],
                value: 2
            },
            {
                text: status[3],
                value: 3
            }
        ],
        render(val) {
            return <Badge status={statusMap[val]} text={status[val]} />;
        }
    },
    {
        title: '状态22222',
        dataIndex: 'status1',
        filters: [
            {
                text: status[0],
                value: 0
            },
            {
                text: status[1],
                value: 1
            },
            {
                text: status[2],
                value: 2
            },
            {
                text: status[3],
                value: 3
            }
        ],
        render(val) {
            return <Badge status={statusMap[val]} text={status[val]} />;
        }
    },
    {
        title: '上次调度时间',
        dataIndex: 'updatedAt',
        sorter: true,
        render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
    }
];

function PagableTable(props) {
    const {
        form,
        form: {getFieldDecorator}
    } = props;
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(initPageSize);
    const [query, setQuery] = useState({});
    const [medData, setMedData] = useState([]);

    const [selectedRowKeys, setSelectedRowKeys] = useState([]); //选中的行数
    const [callTotal, setCallTotal] = useState(0); //计算总数

    const {isLoading, fetchStatus, result, handleGetData, total, data} = HookGet('/v1/order');

    useEffect(() => {
        handleGetData({pageIndex, pageSize, ...query});
    }, [pageIndex, pageSize, query]);

    useEffect(() => {
        let dataSourse = result.data;
        if (dataSourse) {
            let newData = dataSourse.map(item => item.medName);
            let sortData = pySegSort(newData);
            setMedData(sortData);
        }
    }, [result]);

    const handleTableChange = (pagination, filters, sorterArg) => {
        //分页
        let sorter = undefined;
        const {current, pageSize} = pagination;
        setPageIndex(current);
        setPageSize(pageSize);
        //筛选
        const filtersData = Object.keys(filters).reduce((obj, key) => {
            const newObj = {...obj};
            if (filters[key].length > 0) {
                newObj[key] = filters[key].join(',');
            }
            return newObj;
        }, {});
        //排序
        if (sorterArg.field) {
            sorter = sorterArg.field + '_' + sorterArg.order;
        }
        setQuery(Object.assign({}, query, {sorter}, {...filtersData}));
    };

    const handleSearch = e => {
        e.preventDefault();
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            setPageIndex(1);
            setQuery(Object.assign({}, query, {...fieldsValue}));
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

    const update = async () => {
        let response = await axios({
            url: '/v1/med/updata',
            method: 'post',
            data: result.data
        });
        console.log(response);
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
        <PageHeaderWrapper title="列表页">
            <Card>
                <Alert
                    style={{marginBottom: 10}}
                    message={
                        <Fragment>
                            已选择
                            <span style={{fontWeight: 600}}>{selectedRowKeys.length}</span>
                            项&nbsp;&nbsp;
                            <span>服务总计调用次数:{callTotal}</span>
                            <span
                                onClick={() => {
                                    handleSelectedChange([], []);
                                }}
                                style={{marginLeft: 24}}>
                                清空
                            </span>
                        </Fragment>
                    }
                    type="info"
                    showIcon
                />
                <Form onSubmit={handleSearch} layout="inline">
                    <Row type="flex" justify="space-between">
                        <Col>
                            <FormItem label="规则名称">
                                {getFieldDecorator('name')(<Input style={{width: 160}} placeholder="请输入" />)}
                            </FormItem>

                            <FormItem label="使用状态">
                                {getFieldDecorator('status')(
                                    <Select placeholder="请选择" style={{width: 160}}>
                                        {status.map((item, index) => (
                                            <Option key={index}>{item}</Option>
                                        ))}
                                    </Select>
                                )}
                            </FormItem>
                        </Col>
                        <Col>
                            <span className={styles.submitButtons}>
                                <Button type="primary" htmlType="submit">
                                    查询
                                </Button>
                                <Button style={{marginLeft: 8}} onClick={handleFormReset}>
                                    重置
                                </Button>
                                {/* <Button style={{marginLeft: 8}} onClick={update}>
                                    更新
                                </Button> */}
                            </span>
                        </Col>
                    </Row>
                </Form>
                <Skeleton loading={isLoading} active avatar>
                    <Table
                        loading={isLoading}
                        pagination={pagination}
                        dataSource={data.list}
                        columns={columns}
                        onChange={handleTableChange}
                        rowKey={record => record.key}
                        rowSelection={{
                            selectedRowKeys,
                            onChange: handleSelectedChange,
                            getCheckboxProps: record => ({
                                disabled: record.disabled
                            })
                        }}
                    />
                </Skeleton>
                <Button loading={isLoading}>状态: {fetchStatus}</Button>
            </Card>
        </PageHeaderWrapper>
    );
}
const UsePagableTable = Form.create()(PagableTable);
export default UsePagableTable;
