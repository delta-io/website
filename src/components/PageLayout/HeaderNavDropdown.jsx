import * as React from "react";

const HeaderNavDropdown = ({ submenus }) => (
  <ul className="dropdown">
    {submenus.map((submenu) => (
      <li className="menu-items">
        <a href={submenu.url}>{submenu.label}</a>
      </li>
    ))}
  </ul>
);

export default HeaderNavDropdown;
