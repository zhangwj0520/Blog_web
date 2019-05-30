/**
 * @LastEditors: zhang weijie
 * @Date: 2019-05-30 13:42:12
 * @LastEditTime: 2019-05-30 13:46:23
 * @Description:
 **/
import React from 'react';
import { Link } from 'react-router-dom';

export default function index({ id, title, theme, tag, created_at, abstract, views }) {
    return (
        <div className="article-item wow zoomIn animated">
            <div className="article-body" onMouseOver={this.handleMouseOver}>
                <Link to={`/article-detail/${id}`}>
                    <h4>{title}</h4>
                </Link>
                <p>
                    <span>post @ {created_at}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>category: {theme}</span>
                    &nbsp;&nbsp;&nbsp;
                    <span>浏览: {views}</span>
                </p>
                <div className="article-abstract">{abstract} ...</div>
                <span className="article-link">
                    <Link to={`/article-detail/${id}`}>阅读全文 >></Link>
                </span>
            </div>
        </div>
    );
}
