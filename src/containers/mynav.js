import React from "react";
import CIcon from "@coreui/icons-react";

const mynav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Menu"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "List Movie",
    to: "/movie",
    icon: "cil-cursor",
  },
  {
    _tag: "CSidebarNavItem",
    name: "List Genre",
    to: "/genre",
    icon: "cil-tags",
  },
];

export default mynav;
