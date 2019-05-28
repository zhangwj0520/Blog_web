/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-28 10:59:01
 * @LastEditTime: 2019-05-28 13:53:36
 * @Description:
 **/
const { override, fixBabelImports, addLessLoader, addDecoratorsLegacy, disableEsLint } = require('customize-cra');

module.exports = override(
    addDecoratorsLegacy(),
    disableEsLint(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
    }),
    addLessLoader({
        localIdentName: '[local]--[hash:base64:5]',
        javascriptEnabled: true,
        modifyVars: {
            '@primary-color': '#1890FF',
            'link-color': '#1890FF', // 链接色
            'border-radius-base': '2px'
        }
    })
);
