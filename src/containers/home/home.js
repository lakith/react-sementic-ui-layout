
import React, { Component } from 'react'
import Footer from '../../components/footer/Footer';
import ResponsiveContainer from '../../components/navbar/BaseLayout';

class HomepageLayout extends Component {

render(){   
    return (
        <ResponsiveContainer>
            <Footer />
        </ResponsiveContainer>
    )
}
}

export default HomepageLayout