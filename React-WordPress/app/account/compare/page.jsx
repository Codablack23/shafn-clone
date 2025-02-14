"use client";
import React from 'react';
import WPLayout from '@/wp-components/layouts/WPLayout';
import WPCompare from '@/wp-components/account/WPCompare';
import { scrollPageToTop } from '@/utilities/common-helpers';

const ComparePage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout title="Compare">
            <div className="ps-page--simple">
                <WPCompare />
            </div>
        </WPLayout>
    </div>
);

export default ComparePage;
