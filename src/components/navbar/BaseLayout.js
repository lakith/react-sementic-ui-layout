import React from 'react'
import DesktopContainer from "./desktop/desktopNavBar";
import MobileContainer from "./mobile/MobileNavBar";
import PropTypes from 'prop-types';

const ResponsiveContainer = ({ children }) => (
    <div>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </div>
  )
  
  ResponsiveContainer.propTypes = {
    children: PropTypes.node,
  }

  export default ResponsiveContainer;