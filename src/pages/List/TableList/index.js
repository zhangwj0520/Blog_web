import React, {PureComponent, Fragment} from 'react';
import moment from 'moment';
import {
    Row,
    Col,
    Card,
    Form,
    Input,
    Select,
    Icon,
    Button,
    Dropdown,
    Menu,
    InputNumber,
    DatePicker,
    message,
    Badge,
    Divider
} from 'antd';
import UpdateForm from './UpdateForm';
import CreateForm from './CreateForm';
import StandardTable from '../../../components/StandardTable';
import PageHeaderWrapper from '../../../components/PageHeaderWrapper';
import styles from './index.module.less';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getListData} from '../modules';

const FormItem = Form.Item;
const {Option} = Select;
const getValue = obj =>
    Object.keys(obj)
        .map(key => obj[key])
        .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['关闭', '运行中', '已上线', '异常'];

@Form.create()
class TableList extends PureComponent {
    state = {
        modalVisible: false,
        updateModalVisible: false,
        expandForm: false,
        selectedRows: [],
        formValues: {},
        stepFormValues: {},
        pagination: {pageIndex: 1, pageSize: 10}
    };

    columns = [
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
            render: val => `${val} 万`,
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
            title: '上次调度时间',
            dataIndex: 'updatedAt',
            sorter: true,
            render: val => <span>{moment(val).format('YYYY-MM-DD HH:mm:ss')}</span>
        },
        {
            title: '操作',
            render: (text, record) => (
                <Fragment>
                    <span onClick={() => this.handleUpdateModalVisible(true, record)}>配置</span>
                    <Divider type="vertical" />
                    <span href="">订阅警报</span>
                </Fragment>
            )
        }
    ];

    componentDidMount = () => {
        const {pagination} = this.state;
        this.props.getListData(Object.assign({}, {...pagination}));
    };

    handleStandardTableChange = (pagination, filtersArg, sorter) => {
        const filters = Object.keys(filtersArg).reduce((obj, key) => {
            const newObj = {...obj};
            newObj[key] = getValue(filtersArg[key]);
            return newObj;
        }, {});

        const params = {
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
            ...filters
        };
        if (sorter.field) {
            params.sorter = `${sorter.field}_${sorter.order}`;
        }
        this.props.getListData(Object.assign({}, {...params}));
    };

    previewItem = id => {
        const {history} = this.props;
        history.push({
            pathname: `/profile/basic`,
            id
        });
    };

    //重置 重新获取一次数据
    handleFormReset = () => {
        const {form} = this.props;
        form.resetFields();
        this.setState({
            formValues: {}
        });
        const {pagination} = this.state;
        this.props.getListData(Object.assign({}, {...pagination}));
    };

    toggleForm = () => {
        const {expandForm} = this.state;
        this.setState({
            expandForm: !expandForm
        });
    };

    //批量操作,删除等操作
    handleMenuClick = e => {
        const {selectedRows, pagination} = this.state;
        const deleteKey = selectedRows.map(row => row.key);

        if (selectedRows.length === 0) return;
        switch (e.key) {
            case 'remove':
                this.props.getListData(Object.assign({}, {...pagination, deleteKey}));
                break;
            default:
                break;
        }
    };

    handleSelectRows = rows => {
        this.setState({
            selectedRows: rows
        });
    };

    handleSearch = e => {
        e.preventDefault();

        const {form} = this.props;

        form.validateFields((err, fieldsValue) => {
            if (err) return;

            const values = {
                ...fieldsValue,
                updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf()
            };

            this.setState({
                formValues: values
            });
            // console.log(values);
            const {pagination} = this.state;
            this.props.getListData(Object.assign({}, {...pagination, ...values}));

            // dispatch({
            //     type: 'rule/fetch',
            //     payload: values
            // });
        });
    };

    //控制新建model的弹出
    handleModalVisible = flag => {
        this.setState({
            modalVisible: !!flag
        });
    };

    handleUpdateModalVisible = (flag, record) => {
        this.setState({
            updateModalVisible: !!flag,
            stepFormValues: record || {}
        });
    };

    //添加数据
    handleAdd = async fields => {
        const {pagination} = this.state;
        await this.props.getListData(Object.assign({}, {...pagination, ...fields}));

        message.success('添加成功');
        this.handleModalVisible();
    };

    handleUpdate = fields => {
        console.log(fields);

        message.success('配置成功');
        this.handleUpdateModalVisible();
    };

    renderSimpleForm() {
        const {
            form: {getFieldDecorator}
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={8} sm={24}>
                        <FormItem label="规则名称">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{width: '100%'}}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <span className={styles.submitButtons}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                                重置
                            </Button>
                            <span style={{marginLeft: 8}} onClick={this.toggleForm}>
                                展开 <Icon type="down" />
                            </span>
                        </span>
                    </Col>
                </Row>
            </Form>
        );
    }

    renderAdvancedForm() {
        const {
            form: {getFieldDecorator}
        } = this.props;
        return (
            <Form onSubmit={this.handleSearch} layout="inline">
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={8} sm={24}>
                        <FormItem label="规则名称">
                            {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator('status')(
                                <Select placeholder="请选择" style={{width: '100%'}}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="调用次数">
                            {getFieldDecorator('number')(<InputNumber style={{width: '100%'}} />)}
                        </FormItem>
                    </Col>
                </Row>
                <Row gutter={{md: 8, lg: 24, xl: 48}}>
                    <Col md={8} sm={24}>
                        <FormItem label="更新日期(假的)">
                            {getFieldDecorator('date')(
                                <DatePicker style={{width: '100%'}} placeholder="请输入更新日期" />
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator('status3')(
                                <Select placeholder="请选择(假的)" style={{width: '100%'}}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col md={8} sm={24}>
                        <FormItem label="使用状态">
                            {getFieldDecorator('status4')(
                                <Select placeholder="请选择(假的)" style={{width: '100%'}}>
                                    <Option value="0">关闭</Option>
                                    <Option value="1">运行中</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>
                <div style={{overflow: 'hidden'}}>
                    <div style={{marginBottom: 24}}>
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                        <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>
                            重置
                        </Button>
                        <span style={{marginLeft: 8}} onClick={this.toggleForm}>
                            收起 <Icon type="up" />
                        </span>
                    </div>
                </div>
            </Form>
        );
    }

    renderForm() {
        const {expandForm} = this.state;
        return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
    }

    render() {
        const {
            location: {pathname},
            chartData: {isLoading, data, pagination}
        } = this.props;
        // console.log(this.props);
        const {selectedRows, modalVisible, updateModalVisible, stepFormValues} = this.state;

        const menu = (
            <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
                <Menu.Item key="remove">删除</Menu.Item>
                <Menu.Item key="approval">批量审批</Menu.Item>
            </Menu>
        );

        const parentMethods = {
            handleAdd: this.handleAdd,
            handleModalVisible: this.handleModalVisible
        };
        const updateMethods = {
            handleUpdateModalVisible: this.handleUpdateModalVisible,
            handleUpdate: this.handleUpdate
        };
        return (
            <PageHeaderWrapper title="查询表格" pathname={pathname}>
                <Card bordered={false}>
                    <div className={styles.tableList}>
                        <div className={styles.tableListForm}>{this.renderForm()}</div>
                        <div className={styles.tableListOperator}>
                            <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                                新建
                            </Button>
                            {selectedRows.length > 0 && (
                                <span>
                                    <Button>批量操作</Button>
                                    <Dropdown overlay={menu}>
                                        <Button>
                                            更多操作 <Icon type="down" />
                                        </Button>
                                    </Dropdown>
                                </span>
                            )}
                        </div>
                        <StandardTable
                            selectedRows={selectedRows}
                            loading={isLoading}
                            data={data.list}
                            pagination={pagination}
                            columns={this.columns}
                            onSelectRow={this.handleSelectRows}
                            onChange={this.handleStandardTableChange}
                        />
                    </div>
                </Card>
                <CreateForm {...parentMethods} modalVisible={modalVisible} />
                {stepFormValues && Object.keys(stepFormValues).length ? (
                    <UpdateForm {...updateMethods} updateModalVisible={updateModalVisible} values={stepFormValues} />
                ) : null}
            </PageHeaderWrapper>
        );
    }
}

const mapStateToProps = state => {
    return {
        chartData: state.listreducer.listDataReducer
    };
};

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({getListData}, dispatch)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TableList);
// export default TableList;
