import React from 'react';
import Compare from '~/components/partials/account/Compare';
import WPLayout from '~/wp-components/layouts/WPLayout';
import WPCompare from '~/wp-components/account/WPCompare';

const ComparePage = () => {
    return (
        <WPLayout title="Compare">
            <div className="ps-page--simple">
                <WPCompare />
            </div>
        </WPLayout>
    );
};

export default ComparePage;
