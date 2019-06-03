# Hooks used by mis

跳房子系统使用 React Hooks

完整 Demo 可在开发环境打开 [http://me.tiaofangzi.com:8083/#/demos](http://me.tiaofangzi.com:8083/#/demos) 查看

- Hooks
    - [useSetState](#usesetstate)
    - [usePagableTable](#usepagabletable)
    - [useModal](#usemodal)
    - [useAbortableFetch](#useabortablefetch)

## useSetState

与 class 组件中的 setState 用法一致

### 初始化 state 以及 setState 函数

```js
let [state, setState] = useSetState(initState)

// 类似于
constructor(props) {
    super(props)
    this.state = initState
}
```

### 参数

- **initState**: Object -  初始 state 对象

### 更新 state

```js
// 新的 state 将被 merge 到旧的 state 内
setState({
    count: 2,
})

// 和类中的 setState 一样，setState 可以接受函数
setState(prevState => ({
    count: prevState.count + 1,
}))
```

## usePagableTable

跳房子内最常见的 表单 + 表格 页面逻辑封装

### 初始化 pagable 对象

```js
let pagable = usePagableTable(fetchUrl, form, pageSize=20)
```

### 参数

- **fetchUrl**: string - 向后端请求数据的 url，**必传**
- **form** - antd form 组件包装过后的 form 属性
- **pageSize**: number - 每页数据条数，默认20

### pagable 对象属性

```typescript
pagable = {
    // 作为 Table 组件 props 的属性
    tableProps: {
        dataSource,
        pagination,
        loading,
    },
    gotoPage: function(pageNo: number), // 以当前参数 query 请求第 pageNo 页的数据，并跳转到第 pageNo 页
    fetchPageData: function(query: Object, pageNo: number), // 以指定参数 query 请求第 pageNo 页的数据，并跳转到第 pageNo 页
    refresh: function(), // 刷新当前页面
    submit: function(e), // 如果表单被 form 包装过，将验证表单后用表单数据 query 请求第 1 页数据，⚠️该请求只会包含表单内的参数
    updateDataSource: function(newDataSource: [data]), // 更新 dataSource，用于在不刷新列表的情况下修改列表内数据
    // table 相关状态
    state: {
        current: 1， // 当前页码
        total: 53, // 数据总条数
        query: {}, // 当前请求参数缓存（不包含 pageNo、pageSize）
    },
}
```

### 示例

```js
const columns = []

function MyPage(props) {
    const pagable = usePagableTable('/my/fetch/url', props.form)

    // 类似 componentDidMount 时，请求首页数据
    useEffect(() => {
        pagable.fetchPageData({name: 'Tom'}, 1)
    }, [])

    return (
        <div>
            <Form onSubmit={pagable.submit}>
                <FormItem>
                    {getFieldDecorator('name')(
                        <Input />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </FormItem>
            </Form>
            <Table 
                {...pagable.tableProps}
                columns={columns}
            />
        </div>
    )
}

export Form.create()(MyComp)
```

## useModal

使用 antd Modal 逻辑

### 初始化 modal

```js
const modal = useModal()
```

### 参数

- **initVisible**: Boolean - 初始可见性，默认 false

### modal 对象属性

```js
modal = {
    visible: boolean, // 可见性
    close: function(), // 关闭
    open: function(), // 打开
}
```

## useAbortableFetch

和 `fetchData` 函数类似，但是可以取消，并封装了 `fetching`状态、`result` 请求结果等。**多次连续请求会取消上一次的请求**。

### 使用

```js
const {
    abortableFetch, // fetch 函数
    abort, // 调用以取消该请求
    fetching, // 是否正在请求中(只需要判断是否在请求时用此标示)
    result, // 请求结果
} = useAbortableFetch(
    onSuccess=(json) => {}, // 可选：成功的回调函数
    onFailure=(json) => {}, // 可选：失败的回调函数
)

// 返回
Promise(): json // 如果需要额外处理返回数据
```

### 示例

```js
function Demo() {
    const {
        abortableFetch,
        abort,
        fetching,
    } = useAbortableFetch() 

    return (
        <div>
            <Button 
                onClick={() => {
                    abortableFetch('/some/api', query)
                }}
            >
                请求
            </Button>
            <Button loading={fetching}>
                状态
            </Button>
            <Button onClick={abort}>
                取消
            </Button>
        </div>
    )
}

// More:

// 如果需要根据请求状态进行不同渲染，可结合 status 与 result
const {status, result, abortableFetch} = useAbprtableFetch()

// 如果不关心请求状态，只关心请求结果，可以用 onSuccess 
const {abortableFetch} = useAbprtableFetch(
    (json) => {
        message.success('成功了')
        // doSthWith(json)
    },
    (json) => {
        message.error('失败了'),
    }
)
```

#### 详细示例：

```js
import { useAbortableFetch, STATUS } from './hooks'

function Demo() {
    const {
        abortableFetch,
        abort,
        status,
        result,
    } = useAbortableFetch(
        (json) => {
            message.success('操作成功')
        },
        (json) => {
            message.error('操作失败')
        }
    )

    let content
    switch (status) {
        case STATUS.INIT:
            content = <h1>还未发送请求</h1>
            break
        case STATUS.FETCHING:
            content = <h1>正在发送请求……</h1>
            break
        case STATUS.SUCCESS:
            content = <h1>请求成功，结果为{result}</h1>
            break
        case STATUS.FAILURE:
            content = <h1>请求失败……，原因：{result.msg}</h1>
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
                    abortableFetch('/some/api', query)
                }}
            >
                请求
            </Button>
            <Button onClick={abort}>
                取消
            </Button>
            {content}
        </div>
    )
}
```

#### status 状态


- `STATUS.INIT` 初始化，还未发送过请求
- `STATUS.FETCHING` 正在请求
- `STATUS.SUCCESS` 请求成功
- `STATUS.FAILURE` 请求失败
- `STATUS.ABORT` 请求被取消

*只有 `STATUS.FETCHING` 可以转变为 `STATUS.ABORT`*

*`fetching` 其实就是 `status === STATUS.FETCHING`*