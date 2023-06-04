import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button
} from "reactstrap";
import HomeHeader from '../../components/Header/HomeHeader.js'
import HomeFooter from '../../components/Footer/HomeFooter.js'
//import {fetchData} from '../../utils/Api.js'
//import {ApiMethods} from '../../utils/Constants.js'

import {fetchIp} from "../../utils/Api.js";
import { Link } from 'react-router-dom';
const WhatWeDo = (props) => {


    return (

        <div className="maincontent">
            <HomeHeader isShow={false} />

            <div className='content'>
            <section id="inner-banner" className="section">
                <div className="container">
                    <h1 className="mb-0">What We Do</h1>
              
                </div>
            </section>
            <section className="section">
              <div className="container">
                <h3 className='text-center'>We are an <span className='text-red'>NGO</span> that connects those who want to help with those who need help.</h3>
                <h5 className='text-center'>We ensure all cases are thoroughly investigated and verified by our team of investigation officers and/or certified partner organizations.</h5>
              </div>
            </section>
            <section className="section">
              <div className="container">
                <div className='text-center'>
                  <h4 className='mb-2'>Contributions with an impact</h4>
                  <Button color="primary" size="lg">Donate Now</Button>
                </div>
              </div>
            </section>
            </div>

            <HomeFooter />
        </div>
    )
}

export default WhatWeDo



