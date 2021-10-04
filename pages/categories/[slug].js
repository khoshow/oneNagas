import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import React, { useState, useEffect } from 'react';
import { singleCategory, listRelated } from '../../actions/category';
import { API, DOMAIN, APP_NAME, FB_APP_ID } from '../../config';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';

const Category = ({ category, blogs }) => {
    return (
        <React.Fragment>

            <Layout>
            <link rel="stylesheet" href="/static/css/home.css" />
                <main>
                    <header>
                        <br/>
                        <br/>
                        {console.log("Category: "+ category)}
                        {/* <h1>{category.name}</h1> */}
                        {blogs.map((b, i) => {
                            return <Card key={i} blog={b} />
                        })}
                    </header>
                </main>
            </Layout>
        </React.Fragment>
    )

}

Category.getInitialProps = ({ query }) => {
    return singleCategory(query.slug).then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            return { category: data.category, blogs: data.blogs }
        }
    })
}

export default Category