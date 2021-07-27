import * as React from "react";
import { Link } from "gatsby";
import * as menus from "config/menus";

const PageHeader = () => (
  <header>
    <nav>
      <Link to="/">Delta Lake</Link>
      {menus.main.map((link) => {
        const { label, url } = link;

        return (
          <Link key={label} to={url}>
            {label}
          </Link>
        );
      })}
    </nav>
  </header>
);

export default PageHeader;
