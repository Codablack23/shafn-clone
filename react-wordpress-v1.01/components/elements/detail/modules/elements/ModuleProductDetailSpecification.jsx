import React from 'react';
import Link from 'next/link';

const ModuleProductDetailSpecification = () => (
    <div className="ps-product__specification">
        <Link legacyBehavior href="/page/blank">
            <a className="report">Report Abuse</a>
        </Link>
        <p>
            <strong>SKU:</strong> SF1133569600-1
        </p>
        <p className="categories">
            <strong> Categories:</strong>
            <Link legacyBehavior href="/shop">
                <a>Consumer Electronics</a>
            </Link>
            <Link legacyBehavior href="/shop">
                <a>Refrigerator</a>
            </Link>
            <Link legacyBehavior href="/shop">
                <a>Babies & Moms</a>
            </Link>
        </p>
        <p className="tags">
            <strong> Tags</strong>
            <Link legacyBehavior href="/shop">
                <a>sofa</a>
            </Link>
            <Link legacyBehavior href="/shop">
                <a>technologies</a>
            </Link>
            <Link legacyBehavior href="/shop">
                <a>wireless</a>
            </Link>
        </p>
    </div>
);

export default ModuleProductDetailSpecification;
