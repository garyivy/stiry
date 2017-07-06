import React from 'react';
import { connect } from 'react-redux';

const asides = {

}

export const AsidePresentation = ({pathName}) => {
    return (
    <aside>
        Path: 
       { pathName }
    </aside>
)};

const mapStateToProps = () => {
    return {
        pathName: location.pathname.toLowerCase()
    }
}

const Aside = connect(mapStateToProps)(AsidePresentation);

export default Aside;

