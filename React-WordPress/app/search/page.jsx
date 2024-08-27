import React, { Suspense } from "react";
import WPLayout from "~/wp-components/layouts/WPLayout";
import SearchContent from "./SearchContent";

export default function WPSearchPage(){
    return (
        <div>
            <WPLayout title="Search Result">
                <Suspense fallback={null}>
                    <SearchContent/>
                </Suspense>
            </WPLayout>
        </div>
    );
};

