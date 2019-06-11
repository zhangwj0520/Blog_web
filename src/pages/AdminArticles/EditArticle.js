import React from 'react';
import { Form, Input, Select, message, Modal, Row, Col } from 'antd';
import Editor from '../../components/Editor';
import MyIcon from '../../components/MyIcon';
import { fetchData, checkDataStatus } from '../../common/utils';
const Option = Select.Option;
const FormItem = Form.Item;

const EditArticle = props => {
    const {
        form: { getFieldDecorator, validateFields },
        close,
        visible,
        tags,
        setState,
        article: { content, nature, tag, title, type, abstract, _id }
    } = props;

    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                if (localStorage.getItem('identity') === 'manager') {
                    fetchData('/blog/articles', { _id, ...values }, 'PUT').then(res => {
                        if (checkDataStatus(res)) {
                            setState(prevState => {
                                return {
                                    isChangeTag: prevState.isChangeTag + 1,
                                    visible: false
                                };
                            });
                        }
                    });
                } else {
                    message.warning('游客无权编辑');
                }
            }
        });
    };

    const selectBefore = getFieldDecorator('nature', { initialValue: nature })(
        <Select style={{ width: 70 }}>
            <Option value="原创">原创</Option>
            <Option value="转载">转载</Option>
            <Option value="翻译">翻译</Option>
        </Select>
    );

    return (
        <Modal
            width="80%"
            title="文章编辑"
            destroyOnClose={true}
            visible={visible}
            onOk={handleSubmit}
            onCancel={close}>
            <Form layout={'vertical'} onSubmit={handleSubmit}>
                <FormItem label="文章标题">
                    {getFieldDecorator('title', {
                        initialValue: title,
                        rules: [{ required: true, message: '请填写文章标题!' }]
                    })(<Input addonBefore={selectBefore} placeholder="请填写文章标题" />)}
                </FormItem>
                <Row gutter={24}>
                    <Col span={12}>
                        <FormItem label="文章标签">
                            {getFieldDecorator('tag', {
                                initialValue: tag,
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
                        <FormItem label="文章类型">
                            {getFieldDecorator('type', {
                                initialValue: type,
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

                <FormItem label="文章摘要">
                    {getFieldDecorator('abstract', {
                        initialValue: abstract,
                        rules: [{ required: true, message: '文章摘要!' }]
                    })(<Input placeholder="文章摘要!" />)}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('content', {
                        initialValue: content,
                        rules: [{ required: true, message: '文章内容' }]
                    })(<Editor />)}
                </FormItem>
            </Form>
        </Modal>
    );
};

export default Form.create()(EditArticle);
