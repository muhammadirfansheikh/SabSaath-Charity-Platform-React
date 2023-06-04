import React, { useState, useEffect } from "react";

import {
  CarouselControl,
  Carousel,
  CarouselItem,
  CarouselIndicators, Button, Col, Container, Nav, NavItem, Row, TabContent, TabPane, NavLink, Card, CardTitle, CardText, Progress, Input, ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import ReactPlayer from "react-player";
import video from "../../assets/img/how-it-work-video.mp4";
import bgvideo from "../../assets/img/home/icon2/bg-video.png";
import { Get_All_Relief } from "utils/CommonMethods";
import { SetupMasterIds } from "../../utils/Constants.js";




const HowItWork = () => {

  const [allRelief, setAllRelief] = useState([]);
  useEffect(() => {

    async function fetch() {
      var data = await Get_All_Relief(0, 0);
      if (data != null) {
        setAllRelief(data.Table);
        return data;
      } else {
        return [];
      }
    }

    fetch()


  }
    , []);


  return (
    <section className='section section-work pt-4 pb-5'>
      <Container>
        <Row style={{ alignItems: 'center' }}>
          <Col lg="6" md="6" sm="6" xs="12">
            <div className='works'>
              <h2 className='works-title-top mb-2'><span className='title-bg'> Rebuilding Homes</span></h2>
              <h2 className='works-title-top mb-2'><span className=''>One Community At A Time </span></h2>
              <p className='works-text'>We are rebuilding 100 homes in Rajanpur, Southern Punjab for
                the rehabilitation of flood-affected families.</p>

              {allRelief.length > 0 &&
                allRelief
                  .map((item, key) => {
                    if (item.donationsubcategoryid === SetupMasterIds.Disaster_RebuildHome) {
                      return <Link
                        to={{
                          pathname: "/DisasterReliefDonate",
                          state: item,
                        }}
                        className="btn btn-primary mt-2" >Donate Now</Link>
                    }
                  }
                  )}
            </div>
          </Col>
          <Col lg="5" md="6" sm="6" xs="12">
            <div className='videoss'>
              {/*  <video width="500" controls>
                                <source src={video} type="video/mp4" /> 
                                Your browser does not support HTML video.
                            </video>  
                            {/* <iframe width="100%" height="300px" src="https://www.youtube.com/embed/nuIvCqxjabM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        {/* <img src={video} /> 
*/}
              <ReactPlayer
                url={video}
                playing={true}
                controls={true}
                loop={true}
                muted={true}
                playsinline={false}
                width={520}
                height={294}
                light={bgvideo}
                className="rebuilding-video"
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HowItWork