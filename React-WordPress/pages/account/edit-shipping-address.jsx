import React from "react";

import EditShippingAddress from "~/components/partials/account/EditShippingAddress";
import { scrollPageToTop } from "~/utilities/common-helpers";

import WPLayout from "~/wp-components/layouts/WPLayout";

const MyAccountPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout>
            <div className="ps-page--my-account">
                <EditShippingAddress />
            </div>
        </WPLayout>
    </div>
);

export default MyAccountPage;
