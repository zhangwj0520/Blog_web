/**
 * @LastEditors: zhang weijie
 * @Date: 2019-06-03 14:29:56
 * @LastEditTime: 2019-06-03 14:32:06
 * @Description:
 **/
import React, { useEffect } from 'react';
import { Button, Form, Input, Select, message, Card, Row, Col } from 'antd';
import Editor from '../../components/Editor';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddArticle } from '../../store/articles/action';
import { useSetState } from '../../common/hooks';
import { fetchData, checkDataStatus } from '../../common/utils';

import MyIcon from '../../components/MyIcon';

const Option = Select.Option;
const FormItem = Form.Item;

// const tag = [
//     { value: 'React', icon: 'icon-React', color: '#61dafb' },
//     { value: 'Vue', icon: 'icon-Vue', color: '#4fc08d' },
//     { value: 'Angular', icon: 'icon-angular', color: '#4fc08d' },
//     { value: 'JavaScript', icon: 'icon-js', color: '#4fc08d' },
//     { value: 'ES6', icon: 'icon-es6', color: '#4fc08d' },
//     { value: 'Node', icon: 'icon-node-js', color: '#4fc08d' },
//     { value: 'Chrome', icon: 'icon-Chrome', color: '#61dafb' },
//     { value: 'HTML', icon: 'icon-HTML', color: '#4fc08d' },
//     { value: 'CSS', icon: 'icon-CSS', color: '#4fc08d' },
//     { value: 'IOS', icon: 'icon-ios', color: '#4fc08d' },
//     { value: 'Android', icon: 'icon-Android', color: '#4fc08d' },
//     { value: 'Flutter', icon: 'icon-flutter', color: '#4fc08d' },
//     { value: 'ReactNative', icon: 'icon-ReactNative', color: '#4fc08d' },
//     { value: 'Java', icon: 'icon-java', color: '#4fc08d' },
//     { value: 'MongoDB', icon: 'icon-ziyuan', color: '#4fc08d' },
//     { value: 'Mysql', icon: 'icon-MYSQL', color: '#4fc08d' },
//     { value: 'Tools', icon: 'icon-tools', color: '#4fc08d' },
//     { value: '小程序', icon: 'icon-xiaochengxu', color: '#4fc08d' },
//     { value: '服务器', icon: 'icon-Nginx', color: '#4fc08d' }
// ];

const AddArticlePage = props => {
    const { getFieldDecorator, validateFields } = props.form;
    const [state, setState] = useSetState({ tags: [] });
    const { tags } = state;
    useEffect(() => {
        fetchData('/blog/tags').then(res => {
            if (checkDataStatus(res)) {
                setState({ tags: res.data });
            }
        });
    }, [setState]);

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

    const handleChange = value => {
        console.log(value);
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
                                <Select mode="tags" placeholder="填写个文章标签吧" onChange={handleChange}>
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
                                    <Option value="">请选择类型</Option>
                                    <Option value="css">css</Option>
                                    <Option value="javascript">javascript</Option>
                                    <Option value="vue">vue</Option>
                                    <Option value="react">react</Option>
                                    <Option value="node">node</Option>
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
