import MyAccount2 from '@/app/components/partials/account/MyAccount2';
import WPLayout from '@/wp-components/layouts/WPLayout';

function MyAccountPage2() {
        return (
            <div>
                <WPLayout>
                    <div className="ps-page--my-account">
                        <MyAccount2 />
                    </div>
                </WPLayout>
            </div>
        );
}

export default MyAccountPage2;
