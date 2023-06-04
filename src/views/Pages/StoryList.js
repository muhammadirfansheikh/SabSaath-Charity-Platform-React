import React,{useState, useEffect} from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Card,
  Col,
  Container,
  Row
} from "reactstrap";
import HomeHeader from '../../components/Header/HomeHeader.js'
import HomeFooter from '../../components/Footer/HomeFooter.js'
import success1 from "../../assets/img/home/success1.png";
import success2 from "../../assets/img/home/success2.png";
import success3 from "../../assets/img/home/success3.png";
//import {fetchData} from '../../utils/Api.js'
//import {ApiMethods} from '../../utils/Constants.js'

import {baseImageUrl, fetchIp} from "../../utils/Api.js";
import { Link } from 'react-router-dom';
import { Get_Success_Stories } from 'utils/CommonMethods.js';
import Swal from 'sweetalert2';
const StoryList = (props) => {

    const [successStoryddl, setSuccessStoryddl] = useState([]);
    const GetSuccessStories = async () => {
        try {
            var data =  await Get_Success_Stories(0, 0);
            if(data != null){
                setSuccessStoryddl(data.Table)
                return data;
                
            }
            else{
                // Swal.fire({ title: "Error", text: "Story Data not found", icon: "error" });
                return [];
            }
            
        } catch (error) {
            // Swal.fire({ title: "Error", text: "Story Data not found", icon: "error" });
            return [];
        }
        
    }
    useEffect(() => {
        GetSuccessStories()
    }, [])
    return (

        <div className="maincontent">
            <HomeHeader isShow={false} />

            <div className='content'>
            <section id="inner-banner" className="section">
                <div className="container">
                    <h1 className="mb-0">Story List</h1>
                
                </div>
            </section>
            <section className='section-success mt-5 mb-4'>
                <Container>
                    <Row>
                    {successStoryddl && successStoryddl.map((data, key)=>(
                        <Col lg="4" md="4" sm="4" xs="12" key={key}>
                        <Card body>
                            <div className='donation-box'>
                            <img src={baseImageUrl + data.DocAttachment} alt=''/>
                                <div className='success-dona '>
                                    <h4 className=' mt-2  mb-0'>{data.CaseTitle != "" ? data.CaseTitle : "Success Story"}</h4>
                                    <p>{data.SuccessStory_ShortDesc}</p>
                                    {/* <div dangerouslySetInnerHTML={{__html: data.CaseDescription !== "" ? data.CaseDescription.substring(0, 66)+ ".." : "Success Story Desc" }}></div> */}
                                    <h2 className='mb-2'>Rs. {data.TotalFunds !== null ? data.TotalFunds : "70,000" }</h2>
                                    <Link 
                                    to={{
                                        pathname: "/story-detail",
                                        state: data // your data array of objects
                                    }}
                                    >Read More</Link>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    ))}
                    </Row>
                </Container>
            </section>
            </div>

            <HomeFooter />
        </div>
    )
}

export default StoryList



