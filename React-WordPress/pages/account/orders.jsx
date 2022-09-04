import React from "react";

import { scrollPageToTop } from "~/utilities/common-helpers";

import WPLayout from "~/wp-components/layouts/WPLayout";
import Orders from "~/components/partials/account/Orders";

const MyOrders = () => (
    <div ref={scrollPageToTop}>
        <WPLayout>
            <div className="ps-page--my-account">
                <Orders />
            </div>
        </WPLayout>
    </div>
);

export default MyOrders;
