import React, { useEffect } from 'react';
import { HooksFetch, useSetState } from '../../common/utils';
import { Button, message, Card, Avatar, Tag } from 'antd';
import { STATUS } from '../../common/hooks';
const { Meta } = Card;

function randomColor() {
    return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

export function UseAbortableFetch(props) {
    const [state, setState] = useSetState({
        query: {
            client: 'npm-sdk/1.0',
            'X-User-Token': 'wOWWnM2MDTHLTMGUUQx4S+qNVkiLTG7e'
        },
        matchTags: [],
        author: '',
        content: [],
        dynasty: '',
        title: ''
    });
    const { query, matchTags, author, content, dynasty, title } = state;

    const [fetchData, data, total, result, isLoading, fetchStatus, abort] = HooksFetch(
        'https://v2.jinrishici.com/one.json',
        'get',
        false
    );
    useEffect(() => {
        fetchData(query);
        // fetchData(query);
        // fetchData(query);
        // fetchData(query);
    }, [fetchData, query]);

    useEffect(() => {
        if (result && result.status === 'success') {
            const {
                matchTags,
                origin: { author, content, dynasty, title }
            } = data;
            setState({ matchTags, author, content, dynasty, title });
        }
    }, [data, setState, result]);

    return (
        <div>
            <Button onClick={() => fetchData(query)}>fetch</Button>
            <Button loading={isLoading}>状态: {fetchStatus}</Button>
            <Button onClick={abort}>Abort</Button>
            <Card
                style={{ marginTop: 16, border: '1px solid #bbb' }}
                loading={isLoading}
                title={title}
                bordered={false}>
                <Meta
                    // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                    title={
                        <div>
                            <span>
                                {matchTags.map(item => (
                                    <Tag key={item} color={randomColor()}>
                                        {item}
                                    </Tag>
                                ))}
                            </span>
                            <span style={{ textAlign: 'right' }}> {`${author}～${dynasty}`}</span>
                        </div>
                    }
                    description={content.map(item => (
                        <p key={item}>{item}</p>
                    ))}
                />
                {/* <div style={{ marginTop: 10, paddingTop: 10 }}>
                    {content.map(item => (
                        <p key={item}>{item}</p>
                    ))}
                </div> */}
            </Card>
        </div>
    );
}

export const source = `import React from 'react'
import { Button } from 'antd'
import { useAbortableFetch, STATUS } from '../../common/hooks'

export default function UseAbortableFetch(props) {
    const { abortableFetch, abort, fetching, status, result } = useAbortableFetch()

    let content
    switch (status) {
        case STATUS.INIT:
            content = <h1>还未发送请求</h1>
            break
        case STATUS.FETCHING:
            content = <h1>正在发送请求……</h1>
            break
        case STATUS.SUCCESS:
            content = <h1>请求成功，结果：{result.msg}</h1>
            break
        case STATUS.FAILURE:
            content = <h1>请求失败……原因:{result.msg}</h1>
            break
        case STATUS.ABORT:
            content = <h1>您取消了请求</h1>
            break
        default:
            content = null
    }

    return (
        <div>
            <Button
                onClick={() => {
                    abortableFetch('/auth/emp/queryEmpInfoAndOrg', {})
                }}
            >
                fetch
            </Button>
            <Button loading={fetching}>状态: {status}</Button>
            <Button onClick={abort}>Abort</Button>
            {content}
        </div>
    )
}
`;
