/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 13:29:27
 * @LastEditTime: 2019-05-30 13:30:27
 * @Description:
 **/
export const formatTime = date => {
    const myDate = new Date(date);
    const year = myDate.getFullYear();
    const month = myDate.getMonth() + 1;
    const day = myDate.getDate();
    return `${year}-${month}-${day}`;
};
