import React,{useState,useEffect} from 'react'
import {
  Col,
  Container,
  Row
} from "reactstrap";
import HomeHeader from '../../components/Header/HomeHeader.js'
import HomeFooter from '../../components/Footer/HomeFooter.js'
import { baseImageUrl } from 'utils/Api.js';
const PaymentDetail = (props) => {
    console.log(props)
    
    return (

        <div className="maincontent">
            <HomeHeader isShow={true} />

            <div className='content'>
            {/* <section id="inner-banner" className="section">
                <div className="container">
                    <h1 className="mb-0">Blog</h1>
                   
                </div>
            </section> */}
            <section className='section-blos-list mt-5 mb-4'>
                <Container fluid>
                    <Row>
                      <Col md="12">
                      <iframe width="100%" height="800px" frameborder="0" src={props?.location?.state}></iframe>
                      </Col>
                     
                    </Row>
                    
                </Container>
            </section>
            </div>

            <HomeFooter />
        </div>
    )
}

export default PaymentDetail



