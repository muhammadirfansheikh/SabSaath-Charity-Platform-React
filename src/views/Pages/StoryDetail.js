import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Col,
  Container,
  Progress,
  Row
} from "reactstrap";
import HomeHeader from '../../components/Header/HomeHeader.js'
import HomeFooter from '../../components/Footer/HomeFooter.js'

import school from "../../assets/img/home/school.png";
import { Link } from 'react-router-dom';
import { baseImageUrl } from "utils/Api";

const StoryDetail = (props) => {
  var storyData = props.location.state != undefined ? props.location.state : ""
  var title = storyData.CaseTitle
  var desc = storyData.CaseDescription
  var required = storyData.TotalFunds
  var raised = storyData.raised
  var percentage = storyData.percentage
  var storyUrl = baseImageUrl +  storyData.DocAttachment

    return (

        <div className="maincontent">
            <HomeHeader isShow={false} />

            <div className='content'>
            <section id="inner-banner" className="section">
                <div className="container">
                    <h1 className="mb-0">{title !== undefined ? title : "No Title Found"}</h1>
              
                </div>
            </section>
            <section className='section section-storydetail'>
              <Container>
                <Row>
                  <Col md="12">
                    <div className='title-story'>
                      <h2>{title !== undefined ? title : "No Title Found"}</h2>
                      
                    </div>
                    
                  </Col>
                </Row>
                <Row>
                  <Col md="8">
                    <div className='story'>
                      <ButtonGroup>
                        <Button style={{backgroundColor:'#00acee'}}>
                          <i className='fa fa-twitter' style={{fontSize:'15px', marginRight:'5px'}}></i>
                          Twitter
                        </Button>
                        <Button style={{backgroundColor:'#0077b5'}}>
                          <i className='fa fa-linkedin' style={{fontSize:'15px', marginRight:'5px'}}></i>
                          LinkedIn
                        </Button>
                        <Button style={{backgroundColor:'#43d854'}}>
                          <i className='fa fa-whatsapp' style={{fontSize:'15px', marginRight:'5px'}}></i>
                          Whatsapp
                        </Button>
                      </ButtonGroup>
                      <div className='story-detail'>
                        <img src={storyUrl} width="100%" alt=''/>
                        
                        <p className='mt-4 mb-2'>
                        {desc !== undefined ? desc : "No desc Found"}
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md="4">
                    <Card className='cardform rising text-center'>
                      <CardBody>
                      <h4>Total Funds</h4>
                      <h3 className='text-primary'>Rs. {required !== undefined ? required : "10,000"}</h3>
                          <Progress 
                          value={100}
                          color="primary"
                          className='mb-2'
                          />
                         <ul><li><span>Funded:</span> {percentage !== undefined ? percentage+ "%" : "0%" }</li><li><span>Raised:</span> Rs. {raised !== undefined ? raised : "10,000"}</li></ul>
                        
                          <p>Successfully Operated</p>
                          </CardBody>
                    </Card>
                  </Col>
                </Row>
              </Container>
            </section>
            </div>

            <HomeFooter />
        </div>
    )
}

export default StoryDetail



