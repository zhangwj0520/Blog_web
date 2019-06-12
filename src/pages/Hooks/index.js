import React, {Component} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {atomDark} from 'react-syntax-highlighter/dist/styles/prism';
import {Collapse} from 'antd';
// import {UseSetState, source as useSetStateSource} from './UseSetState';
import demos from './demos';

function Demo({title, des, children, source}) {
    return (
        <div className="demo" id={title} style={{marginBottom: 30}}>
            <h2>{title}</h2>
            <div>{des}</div>
            <Collapse defaultActiveKey={['Demo']}>
                <Collapse.Panel header="Demo" key="Demo">
                    {children}
                </Collapse.Panel>
                <Collapse.Panel header="Code" key="Code">
                    <SyntaxHighlighter language="jsx" style={atomDark} showLineNumbers>
                        {source}
                    </SyntaxHighlighter>
                </Collapse.Panel>
            </Collapse>
        </div>
    );
}

export default class Hooks extends Component {
    render() {
        return (
            <div>
                {demos.map(demoItem => {
                    const {title, des, source, Comp} = demoItem;
                    return (
                        <Demo title={title} des={des} key={title} source={source}>
                            <Comp />
                        </Demo>
                    );
                })}
            </div>
        );
    }
}
