import React from 'react';
import { connect } from 'react-redux';

export const Aside = ({children}) => {
    return (
    <aside>{children}</aside>
)};

const mapStateToProps = () => {
    return {
    }
}

export default connect(mapStateToProps)(Aside);

