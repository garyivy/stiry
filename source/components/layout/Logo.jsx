import React from 'react';

export const Logo = ({ isBusy }) => (
    <div className="logo">St<i>i</i>rytime{isBusy && <i className="fa fa-spinner fa-spin busy"></i>}</div>
);