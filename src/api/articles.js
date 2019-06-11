import axios from '../common/axios';

export async function fetchArticles(params) {
    return axios({
        url: '/blog/articles',
        data: params
    });
}
export async function addArticle(params) {
    console.log(params);
    return axios({
        url: '/blog/articles',
        method: 'POST',
        data: params
    });
}
export async function updateArticle(params) {
    return axios({
        url: '/articles',
        method: 'PUT',
        data: params
    });
}
export async function deleteArticle(params) {
    return axios({
        url: '/articles',
        method: 'DELETE',
        data: params
    });
}
