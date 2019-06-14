import { UseRef, source as UseRefSource } from './useRef';
import { UseState, source as UseStateSource } from './StateHook';
import { UseSetState, source as useSetStateSource } from './UseSetState';
import { UseModal, source as useModalSource } from './UseModal';
import { UseAbortableFetch, source as UseAbortAbleFetchSource } from './UseAbortAbleFetch';
import { UsePagableTable, source as UsePagableTableSource } from './UsePagableTable';
import { Books, source as BooksSource } from './books';
import { NewRedux, source as NewReduxSource } from './ReactRedux7.1';

export default [
    {
        title: 'ReactRedux7.1',
        des: 'ReactRedux7.1',
        Comp: NewRedux,
        source: NewReduxSource
    },
    {
        title: 'useAbortAbleFetch',
        des: '可以取消的fetch',
        Comp: UseAbortableFetch,
        source: UseAbortAbleFetchSource
    },
    {
        title: 'UsePagableTable',
        des: 'UsePagableTable',
        Comp: UsePagableTable,
        source: UsePagableTableSource
    },
    {
        title: '书店',
        des: 'Books',
        Comp: Books,
        source: BooksSource
    },
    {
        title: 'UseRef',
        des: 'Hook的例子',
        Comp: UseRef,
        source: UseRefSource
    },
    {
        title: 'UseState',
        des: 'Hook的例子',
        Comp: UseState,
        source: UseStateSource
    },
    {
        title: 'useSetState',
        des: '使函数组件具有 class 组件的 setState 方法',
        Comp: UseSetState,
        source: useSetStateSource
    },
    {
        title: 'UseModal',
        des: '使函数组件具有 class 组件的 setState 方法',
        Comp: UseModal,
        source: useModalSource
    }
];
