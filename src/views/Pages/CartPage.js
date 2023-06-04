import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Row,
  Progress,
} from "reactstrap";
import HomeHeader from '../../components/Header/HomeHeader.js'
import HomeFooter from '../../components/Footer/HomeFooter.js'
import Case from "../../assets/img/home/4.jpg";
//import {fetchData} from '../../utils/Api.js'
//import {ApiMethods} from '../../utils/Constants.js'

import {fetchIp} from "../../utils/Api.js";
import { Link } from 'react-router-dom';
const CartPage = (props) => {


    return (

        <div className="maincontent">
            <HomeHeader isShow={false} />

            <div className='content'>
            <section id="inner-banner" className="section">
                <div className="container">
                    <h1 className="mb-0">Cart</h1>
                
                </div>
            </section>
            <section className="section">
              <div className="container">
                  <Row >
                  <Col md={12}>
                  <Card body p-2>
                  <Row style={{alignItems: "center"}}>
                  <Col md={3}>
                  <div className='case-img'>
                  <img src={Case} alt=""/>
                  </div>
                  </Col>
                  <Col md={3}>
           
                  <div classame='case-content'>
                  <h5 className="pb-2 pt-3">Zubaida wants to Walk Again</h5>
                  </div>
                    <div classame='case-conten pb-2'>
                    <Progress
                      color="danger"
                      value="30"
                    />
                    </div>

                    <Row className="pt-2 pb-2">
                    <Col>
                        <div classame='case-content'>
                           <h5 className="">Rs. 368,094</h5> 
                           <span>Raised</span>
                        </div>
                    </Col>
               
                      <Col>
                           <div className='case-content'>
                               <h5>Rs. 352,342.75</h5>
                               <span>Remaining</span>
                           </div>
                       </Col>
                     </Row>
                  </Col>
                  <Col md={4}>
                  <Row style={{alignItems: "center", justifyContent: "center"}}>
                  <Col md={1}>
                  <div className='case-content'>
                 <span> <i class="fa fa-trash fa-2x" style={{color: "#d60b11"}}></i></span>
              </div>
              </Col>
                    <Col md={7}>
                      <div className='case-content'>
                    {/* <div class="form-group m-0">
                         <div class="input-group m-0">
                               <div class="input-group-addon" style={{border: "1px solid #f7d1d2", background:"#888", color:"#fff", display: "flex", alignItems:"center", padding: "8px", borderRadius: "4px 0px 0px 4px" }}>PKR *</div>
                                    <Input type="number"  class="form-control" />
                                </div>
                          </div>*/}

                          <div class="input-group">
                            <span class="input-group-text" style={{color: "#d60b11"}}>-</span>
                            <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)" />
                            <span class="input-group-text" style={{color: "#d60b11"}}>+</span>
                          </div>

                        </div>
                      </Col>
                        </Row>
                  </Col>

                  <Col md={2}>
                  <h4>Total: Rs.22,000</h4>
                  </Col>
                  </Row>
                  </Card>
                  </Col>
                  </Row>

            <Row style={{justifyContent: "end"}}>
            <Col md={6}>
            <Card body>
              <Row className="pt-2 pb-2">
              <Col md={6}>
              <div>
             <h5>No of Cases:</h5>
              </div>
              </Col>
              
              <Col md={6}>
              <div  className="text-right">
              <h5>1</h5>
              </div>
              </Col>
              </Row> 
              <hr />
              <Row className="pt-2 pb-2">
              <Col md={6}>
              <div>
              <h5>Total Amount:</h5>
              </div>
              </Col>
              
              <Col md={6}>
              <div className="text-right">
              <h5>PKR 2,000/-</h5>
              </div>
              </Col>
              </Row>
            
              <Row>
              <Col md={12}>
              <div className="text-right">
            <Button color="primary" href="\checkout">Confirm and next</Button>
              </div>
              </Col>
              </Row>
            </Card>
            </Col>
            </Row>
            </div>
            </section>

            </div>

            <HomeFooter />
        </div>
    )
}

export default CartPage



