import React from "react";
import PropTypes from "prop-types";

const Layout = ({ children }) => (
  <>
        <div
          style={{
            margin: `0 auto`,
            paddingTop: 0
          }}
        >
          <main>{children}</main>
        </div>
      </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
