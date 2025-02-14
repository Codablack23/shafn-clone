import React from "react";
import Head from "next/head";
import FooterCopyright from "@/components/shared/footers/FooterCopyright";
import MenuSidebar from "@/components/shared/menus/MenuSidebar";
import WidgetEarningSidebar from "@/components/shared/widgets/WidgetEarningSidebar";
import WidgetUserWelcome from "@/components/shared/widgets/WidgetUserWelcome";
import HeaderDashboard from "@/components/shared/headers/HeaderDashboard";
import { CustomModal } from "@/components/elements/custom/index";

const ContainerDefault = ({ children, title }) => {
  let titleView;
  if (title !== undefined) {
    titleView = process.env.NEXT_PUBLIC_TITLE + " | " + title;
  } else {
    titleView =
      process.env.NEXT_PUBLIC_TITLE +
      " | " +
      process.env.NEXT_PUBLIC_TITLE_DESCRIPTION;
  }

  return (
    <div className="martfury-admin">
      <Head>
        <title>{titleView}</title>
      </Head>
      <main className="ps-main">
        <div className="ps-main__sidebar">
          <div className="ps-sidebar">
            <div className="ps-sidebar__top">
              <WidgetUserWelcome />
              <WidgetEarningSidebar />
            </div>
            <div className="ps-sidebar__content">
              <div className="ps-sidebar__center">
                <MenuSidebar />
              </div>
            </div>
            <div className="ps-sidebar__footer">
              <FooterCopyright />
            </div>
          </div>
        </div>
        <div className="ps-main__wrapper">{children}</div>
      </main>
    </div>
  );
};

export default ContainerDefault;
