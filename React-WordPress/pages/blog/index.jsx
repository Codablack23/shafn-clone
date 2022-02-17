import React from 'react';
import WPBlogGrid from '~/wp-components/blog/WPBlogGrid';
import WPLayout from '~/wp-components/layouts/WPLayout';

const BlogGridPage = () => {
    return (
        <WPLayout title="Blog">
            <div className="ps-page--blog">
                <div className="container">
                    <div className="ps-page__header">
                        <h1>Our Press</h1>
                    </div>
                    <WPBlogGrid />
                </div>
            </div>
        </WPLayout>
    );
};

export default BlogGridPage;
