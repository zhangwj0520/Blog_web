/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 13:44:20
 * @LastEditTime: 2019-05-30 18:54:32
 * @Description:
 **/
import client from './client';
import admin from './admin';
import user from './user';

const routerConfig = [...client, ...admin, ...user];

export default routerConfig;
