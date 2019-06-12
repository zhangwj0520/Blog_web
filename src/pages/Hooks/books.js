import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { message, Button } from 'antd';

import styles from '../Books/index.module.less';

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

const classData = [
    { id: 1, name: 'A搞笑通关班' },
    { id: 2, name: 'B名师搞笑班' },
    { id: 3, name: 'C智能搞笑班' },
    { id: 4, name: 'A+B+C无忧搞笑班' },
    { id: 5, name: '封神班' }
];

const defaultYearsData = [{ id: 1, name: '1年' }, { id: 2, name: '2年' }, { id: 3, name: '3年' }];
export function Books() {
    const [activeClass, setActiveAryClassAry] = useState(1);
    const [yearsData, setYearsData] = useState(defaultYearsData);
    const [activeYears, setActiveYears] = useState();
    const [activeAry, setActiveAry] = useState([]);

    const onClickClass = val => {
        setActiveAryClassAry(val);
        setActiveYears();
        setActiveAry([]);
        if (val === 5) {
            setYearsData([{ id: 5, name: '5年+2年' }]);
        } else if (val === 4) {
            setYearsData([{ id: 4, name: '5年' }]);
        } else {
            setYearsData(defaultYearsData);
        }
    };
    const onClickYears = val => {
        setActiveYears(val);
    };

    const onClick = val => {
        if (!activeYears) {
            message.error('请选择期限');
            return null;
        }
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
    const handleBuy = () => {
        if (activeClass && activeYears && activeAry.length) {
            // console.log('班级', activeClass);
            // console.log('期限', activeYears);
            console.log('选择的课程', activeAry);
        } else {
            message.error('反正就是错了');
        }
    };

    return (
        <div className={styles.go_buy_subject}>
            <div className={styles.go_choose_subject}>
                {classData.map(item => {
                    return (
                        <span
                            className={classNames(styles.book_item, activeClass === item.id ? styles.active : null)}
                            key={item.id}
                            onClick={() => onClickClass(item.id)}>
                            {item.name}
                        </span>
                    );
                })}
            </div>
            <div className={styles.go_choose_subject}>
                {yearsData.map(item => {
                    return (
                        <span
                            className={classNames(styles.book_item, activeYears === item.id ? styles.active : null)}
                            key={item.id}
                            onClick={() => onClickYears(item.id)}>
                            {item.name}
                        </span>
                    );
                })}
            </div>
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
            <Button onClick={handleBuy}>购买</Button>
        </div>
    );
}

export const source = `const goodsDetails = [
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

const classData = [
    {id: 1, name: 'A搞笑通关班'},
    {id: 2, name: 'B名师搞笑班'},
    {id: 3, name: 'C智能搞笑班'},
    {id: 4, name: 'A+B+C无忧搞笑班'},
    {id: 5, name: '封神班'}
];

const defaultYearsData = [{id: 1, name: '1年'}, {id: 2, name: '2年'}, {id: 3, name: '3年'}];
export function Books() {
    const [activeClass, setActiveAryClassAry] = useState(1);
    const [yearsData, setYearsData] = useState(defaultYearsData);
    const [activeYears, setActiveYears] = useState();
    const [activeAry, setActiveAry] = useState([]);

    const onClickClass = val => {
        setActiveAryClassAry(val);
        setActiveYears();
        setActiveAry([]);
        if (val === 5) {
            setYearsData([{id: 5, name: '5年+2年'}]);
        } else if (val === 4) {
            setYearsData([{id: 4, name: '5年'}]);
        } else {
            setYearsData(defaultYearsData);
        }
    };
    const onClickYears = val => {
        setActiveYears(val);
    };

    const onClick = val => {
        if (!activeYears) {
            message.error('请选择期限');
            return null;
        }
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
    const handleBuy = () => {
        if (activeClass && activeYears && activeAry.length) {
            console.log('班级', activeClass);
            console.log('期限', activeYears);
            console.log('选择的课程', activeAry);
        } else {
            message.error('反正就是错了');
        }
    };

    useEffect(() => {
        console.log(activeAry);
    }, [activeAry]);

    return (
        <div className={styles.go_buy_subject}>
            <div className={styles.go_choose_subject}>
                {classData.map(item => {
                    return (
                        <span
                            className={classNames(styles.book_item, activeClass === item.id ? styles.active : null)}
                            key={item.id}
                            onClick={() => onClickClass(item.id)}>
                            {item.name}
                        </span>
                    );
                })}
            </div>
            <div className={styles.go_choose_subject}>
                {yearsData.map(item => {
                    return (
                        <span
                            className={classNames(styles.book_item, activeYears === item.id ? styles.active : null)}
                            key={item.id}
                            onClick={() => onClickYears(item.id)}>
                            {item.name}
                        </span>
                    );
                })}
            </div>
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
            <Button onClick={handleBuy}>购买</Button>
        </div>
    );
}
`;
