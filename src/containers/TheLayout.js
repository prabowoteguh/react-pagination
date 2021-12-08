import React from "react";
import {
  TheContent,
  TheSidebar,
  MySidebar,
  TheFooter,
  TheHeader,
} from "./index";

const TheLayout = () => {
  return (
    <div className="c-app c-default-layout">
      <MySidebar />
      <div className="c-wrapper">
        <TheHeader />
        <div className="c-body">
          <TheContent />
        </div>
        {/* <TheFooter /> */}
      </div>
    </div>
  );
};

export default TheLayout;
