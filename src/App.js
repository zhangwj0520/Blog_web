import React from 'react';
import { Button, Switch } from 'antd';

function App() {
    const onChange = () => {
        console.log(111);
    };
    return (
        <div className="App">
            <Button type="primary">Button</Button>
            <Switch defaultChecked onChange={onChange} />
        </div>
    );
}

export default App;
