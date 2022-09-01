import React from "react";

import EditBillingAddress from "~/components/partials/account/EditBillingAddress";
import { scrollPageToTop } from "~/utilities/common-helpers";

import WPLayout from "~/wp-components/layouts/WPLayout";

const MyAccountPage = () => (
    <div ref={scrollPageToTop}>
        <WPLayout>
            <div className="ps-page--my-account">
                <EditBillingAddress />
            </div>
        </WPLayout>
    </div>
);

export default MyAccountPage;
