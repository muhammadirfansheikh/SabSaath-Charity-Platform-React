import React,{useState} from 'react'
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Input, Row } from 'reactstrap';
//import {footer} from "reactstrap";
//import {fetchData} from '../utils/Api.js'
//import {ApiMethods} from '../utils/Constants.js'
import googleplay from "../../assets/img/home/googleplay.png";
import payment from "../../assets/img/home/payment.png";
const HomeFooter = (props) => {
    return (
        <>
        <footer className="footer">
            <section className='section footer-subscribe'>
                <Container>
                    <Row>
                        <Col sm="3"></Col>
                        <Col>
                            <div className='subscribe'>
                                <Input
                                className='input-subsc'
                                placeholder='Enter your Email'
                                />
                                <Button className='btn' color='primary'>Submit</Button>
                            </div>
                        </Col>
                        <Col sm="3">
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='section footer-inner'>
                <Container>
                    <Row>
                        <Col>
                            <div className='aboutus'>
                                <h4 className='footer-title'>About Us</h4>
                                <ul className='footer-list'>
                                    <li>
                                        <a href='#'>How it works</a>
                                    </li>
                                    <li>
                                        <a href='#'>Supporting Organization</a>
                                    </li>
                                    <li>
                                        <a href='#'>Transparency in our processes</a>
                                    </li>
                                    <li>
                                        <a href='#'>Careers</a>
                                    </li>
                                    <li>
                                        <a href='#'>Contact Us</a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col>
                            <div className='basics'>
                                <h4 className='footer-title'>Basics</h4>
                                <ul className='footer-list'>
                                    <li>
                                        <a href='#'>FAQs</a>
                                    </li>
                                    <li>
                                        <a href='#'>Payment FAQs</a>
                                    </li>
                                    <li>
                                        <a href='#'>Terms of Use</a>
                                    </li>
                                    <li>
                                        <a href='#'>Testimonials</a>
                                    </li>
                                    <li>
                                        <a href='#'>Stories</a>
                                    </li>
                                    <li>
                                        <a href='#'>Volunteer with us</a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col>
                            <div className='events'>
                                <h4 className='footer-title'>Events</h4>
                                <ul className='footer-list'>
                                    <li>
                                        <a href='#'>Daily Sadqa</a>
                                    </li>
                                    <li>
                                        <a href='#'>Christmas</a>
                                    </li>
                                    <li>
                                        <a href='#'>Thanksgiving</a>
                                    </li>
                                    <li>
                                        <a href='#'>Ramzan</a>
                                    </li>
                                    <li>
                                        <a href='#'>Eid-ul-Fitr</a>
                                    </li>
                                    <li>
                                        <a href='#'>Eid-ul-Azha</a>
                                    </li>
                                    <li>
                                        <a href='#'>Dhul Hijjah Donations</a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        <Col>
                            <div className='followus'>
                                <h4 className='footer-title'>Follow Us</h4>
                                <ul className='footer-list'>
                                    <li>
                                        <a href='#'>123A - Block C, Faisal Town, Karachi</a>
                                    </li>
                                    <li>
                                        <a href='#'>Tel: +92 (21) 23456789</a>
                                    </li>
                                    <li>
                                        <a href='#'>info@sabsaath.org</a>
                                    </li>
                                </ul>
                                <div className='questions'>
                                    <a href="#">Questions? We will reply in 15 minutes!</a>
                                    <Button className='btn' color='primary'>Chat with us via whatsapp</Button>
                                    <ul className='social-icons'>
                                        <li><a href="#"><i className='fa fa-facebook'></i></a></li>
                                        <li><a href="#"><i className='fa fa-twitter'></i></a></li>
                                        <li><a href="#"><i className='fa fa-youtube'></i></a></li>
                                        <li><a href="#"><i className='fa fa-instagram'></i></a></li>
                                        <li><a href="#"><i className='fa fa-rss'></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{alignItems:'flex-end'}}>
                        <Col>
                            <div className='googleplay'>
                                <img src={googleplay} />
                            </div>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                        <Col>
                            <div className='payment'>
                                <img src={payment} />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <section className='section footer-copyright'>
                <Container>
                    <Row>
                        <Col>
                            <div className='copyright text-center'>
                                <p className='copyright-text'>
                                    Copyright © 2021 SabSaath. All Rights Reserved.
                                </p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </footer>
        </>
        )
}
export default HomeFooter