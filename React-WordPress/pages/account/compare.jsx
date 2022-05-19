import React, { useEffect, useRef } from 'react';
import Compare from '~/components/partials/account/Compare';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPCompare from '~/wp-components/account/WPCompare';

const ComparePage = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            containerRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 250);
    }, []);

    return (
        <div ref={containerRef}>
            <WPLayout title="Compare">
                <div className="ps-page--simple">
                    <WPCompare />
                </div>
            </WPLayout>
        </div>
    );
};

export default ComparePage;
