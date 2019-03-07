import React from 'react';

const DivWrapper = props => {
    return (
        <div id="main-wrapper" data-layout="vertical" data-navbarbg="skin5" data-sidebartype="full" data-sidebar-position="absolute" dataheader-position="absolute" data-boxed-layout="full">
            {props.children}
        </div>
    )
};

export default DivWrapper
