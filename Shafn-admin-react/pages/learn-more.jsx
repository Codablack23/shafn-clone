import HomepageLayout from "~/components/layouts/HomePageLayout";
import VendorMilestone from "~/components/partials/vendors/VendorMilestone";

export default function Register(){
    return(
        <HomepageLayout title={"Steps"}>
             <VendorMilestone/>
        </HomepageLayout>
    )
}