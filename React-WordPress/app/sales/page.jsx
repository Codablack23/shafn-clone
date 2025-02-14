import { Suspense } from "react";
import WPLayoutFullwidth from "@/wp-components/layouts/WPLayoutFullwidth";
import MainContent from "./MainContent";


const WPSalesPage = () => {
    return (
        <div>
            <WPLayoutFullwidth title="Sales">
                <Suspense fallback={null}>
                    <MainContent/>
                </Suspense>
            </WPLayoutFullwidth>
        </div>
    );
};


export default WPSalesPage;
