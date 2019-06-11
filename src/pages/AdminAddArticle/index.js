import React, { useContext } from 'react';
import { context } from '../../store/context-hooks';
import { Button, Form, Input, Select, message, Card, Row, Col } from 'antd';
import Editor from '../../components/Editor';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddArticle } from '../../store/articles/action';

import MyIcon from '../../components/MyIcon';

const Option = Select.Option;
const FormItem = Form.Item;

const AddArticlePage = props => {
    const { getFieldDecorator, validateFields } = props.form;

    const {
        globalState: { tags, artTypes }
    } = useContext(context); //获取hooks全局状态

    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                if (localStorage.getItem('identity') === 'manager') {
                    props.AddArticle(values);
                } else {
                    message.warning('游客无权编辑');
                }
            }
        });
    };

    const selectBefore = getFieldDecorator('nature', { initialValue: '原创' })(
        <Select style={{ width: 70 }}>
            <Option value="原创">原创</Option>
            <Option value="转载">转载</Option>
            <Option value="翻译">翻译</Option>
        </Select>
    );

    return (
        <Card>
            <Form layout={'vertical'} onSubmit={handleSubmit}>
                <FormItem hasFeedback={true} label="文章标题">
                    {getFieldDecorator('title', {
                        rules: [{ required: true, message: '请填写文章标题!' }]
                    })(<Input addonBefore={selectBefore} placeholder="请填写文章标题" />)}
                </FormItem>

                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem hasFeedback={true} label="文章标签">
                            {getFieldDecorator('tag', {
                                rules: [{ required: true, message: '文章标签!' }]
                            })(
                                <Select mode="tags" placeholder="填写个文章标签吧">
                                    {tags.map(item => (
                                        <Option key={item.value}>
                                            <MyIcon type={item.icon} style={{ marginRight: 5 }} />
                                            {item.value}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={12}>
                        <FormItem hasFeedback={true} label="文章类型">
                            {getFieldDecorator('type', {
                                initialValue: '',
                                rules: [{ required: true, message: '请选择文章类型!' }]
                            })(
                                <Select>
                                    {artTypes.map(typ => (
                                        <Option key={typ.value}>{typ.value}</Option>
                                    ))}
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <FormItem hasFeedback={true} label="文章摘要">
                    {getFieldDecorator('abstract', {
                        rules: [{ required: true, message: '文章摘要!' }]
                    })(<Input placeholder="文章摘要!" />)}
                </FormItem>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                发表文章
                            </Button>
                        </FormItem>
                    </Col>
                </Row>

                <FormItem>
                    {getFieldDecorator('content', {
                        rules: [{ required: true, message: '文章内容' }]
                    })(<Editor />)}
                </FormItem>
            </Form>
        </Card>
    );
};

// const mapStateToProps = state => {
//     return {
//         usersState: state.users.userLoginReducer
//     };
// };

const mapDispatchToProps = dispatch => {
    return {
        ...bindActionCreators({ AddArticle }, dispatch)
    };
};
// export default Form.create()(AddArticle);
// export default connect(
//     state => state,
//     action  // 全部引入
// )(Form.create()(AddArticlePage));
export default connect(
    state => state,
    mapDispatchToProps // 全部引入
)(Form.create()(AddArticlePage));
