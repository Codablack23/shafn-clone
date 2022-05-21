import React, { useEffect, useState, useRef } from 'react';
import RelatedPosts from '../../components/partials/post/RelatedPosts';
import PostComments from '../../components/partials/post/PostComments';
import { connect } from 'react-redux';
import WPPostRepository from '~/repositories/WP/WPPostRepository';
import WPPostDetail from '~/wp-components/elements/posts/WPPostDetail';
import WPLayout from '~/wp-components/layouts/WPLayout';
import SkeletonSinglePost from '~/components/elements/skeletons/SkeletonSinglePost';

const WPSinglePost = ({ query }) => {
    const containerRef = useRef(null);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getPost(postID) {
        const result = await WPPostRepository.getPostByID(postID);
        if (result) {
            setTimeout(function () {
                setLoading(false);
            }, 500);
            setPost(result);
        }
    }

    useEffect(() => {
        if (containerRef.current) {
            setTimeout(() => {
                containerRef.current.scrollIntoView({ behavior: 'smooth' });
            }, 250);
        }

        const { pid } = query;

        if (query) {
            getPost(pid);
        }

        /*Router.events.on('routeChangeStart', (url) => {
            const nextPid = url.split('/').pop();
            if (nextPid !== '' && isNaN(parseInt(nextPid)) === false) {
                getProduct(pid);
            }
        });*/
    }, []);

    //Views
    let singlePostView;
    if (!loading) {
        if (post) {
            singlePostView = <WPPostDetail post={post} />;
        }
    } else {
        singlePostView = <SkeletonSinglePost />;
    }

    return (
        <div ref={containerRef}>
            <WPLayout
                title={!loading && post ? post.title.rendered : 'Single post'}>
                {singlePostView}
                <div className="container">
                    <RelatedPosts />
                    <PostComments />
                </div>
            </WPLayout>
        </div>
    );
};

WPSinglePost.getInitialProps = async ({ query }) => {
    return { query: query };
};

export default WPSinglePost;
