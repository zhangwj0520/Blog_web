import React, {useState, useEffect} from 'react';
import classNames from 'classnames';

import styles from './index.module.less';

const goodsDetails = [
    {
        goodsText: '会计',
        goodsSubject: 'kj'
    },
    {
        goodsText: '审计',
        goodsSubject: 'sj'
    },
    {
        goodsText: '财务管理',
        goodsSubject: 'cg'
    },
    {
        goodsText: '经济法',
        goodsSubject: 'jjf'
    },
    {
        goodsText: '税法',
        goodsSubject: 'sf'
    },
    {
        goodsText: '战略',
        goodsSubject: 'zl'
    },
    {
        goodsText: '六科同构',
        goodsSubject: 'tg'
    }
];

export default function Books() {
    const [activeAry, setActiveAry] = useState([]);
    const onClick = val => {
        let a = activeAry.some(item => val === item);
        let ary = [];
        if (val === 'tg') {
            return a ? setActiveAry([]) : setActiveAry(['tg']);
        } else {
            ary = activeAry.filter(item => item !== 'tg');
            if (a) {
                ary = ary.filter(item => item !== val);
            } else {
                ary = val === 'tg' ? [val] : [val, ...ary];
            }
            setActiveAry(ary);
        }
    };
    useEffect(() => {
        console.log(activeAry);
    }, [activeAry]);

    return (
        <div className={styles.go_buy_subject}>
            <div className={styles.go_choose_subject}>
                {goodsDetails.map(item => {
                    return (
                        <span
                            className={classNames(
                                styles.book_item,
                                activeAry.some(val => val === item.goodsSubject) ? styles.active : null
                            )}
                            key={item.goodsSubject}
                            onClick={() => onClick(item.goodsSubject)}>
                            {item.goodsText}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
