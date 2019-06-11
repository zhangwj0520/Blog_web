import React from 'react';
import { Button, Form, Input, Select } from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;

const Search = ({ form: { getFieldDecorator, validateFields }, setState }) => {
    const handleSubmit = e => {
        e.preventDefault();
        validateFields((err, values) => {
            if (!err) {
                setState({ query: values });
            }
        });
    };

    const resetSearch = () => {
        setState({ query: {} });
    };

    const selectBefore = getFieldDecorator('nature', { initialValue: '' })(
        <Select style={{ width: 70 }}>
            <Option value="">全部</Option>
            <Option value="原创">原创</Option>
            <Option value="转载">转载</Option>
        </Select>
    );
    return (
        <Form onSubmit={handleSubmit} layout="inline">
            <FormItem label="文章标题">
                {getFieldDecorator('title')(
                    <Input addonBefore={selectBefore} placeholder="搜索文章标题" style={{ width: 220 }} />
                )}
            </FormItem>
            <FormItem label="文章类型" style={{ width: 300 }}>
                {getFieldDecorator('type', { initialValue: '' })(
                    <Select style={{ width: 200 }}>
                        <Option value="">请选择类型</Option>
                        <Option value="typescript">typescript</Option>
                        <Option value="javascript">javascript</Option>
                        <Option value="react">react</Option>
                        <Option value="node">node</Option>
                        <Option value="css">css</Option>
                    </Select>
                )}
            </FormItem>
            <FormItem>
                <Button onClick={resetSearch}>重置</Button>
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit" icon="search">
                    查询
                </Button>
            </FormItem>
        </Form>
    );
};

export default Form.create()(Search);
