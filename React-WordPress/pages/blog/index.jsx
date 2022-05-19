import React, { useEffect, useRef } from 'react';
import WPBlogGrid from '~/wp-components/blog/WPBlogGrid';
import WPLayout from '~/wp-components/layouts/WPLayout';

const BlogGridPage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    }, []);

    return (
        <div ref={containerRef}>
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
        </div>
    );
};

export default BlogGridPage;
