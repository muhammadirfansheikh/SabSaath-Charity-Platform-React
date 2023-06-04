import React,{useState,useEffect} from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  Button, 
  Card,
  CardBody,
  Col,
  Container,
  Row
} from "reactstrap";
import HomeHeader from '../../components/Header/HomeHeader.js'
import HomeFooter from '../../components/Footer/HomeFooter.js'
import success1 from "../../assets/img/home/success1.png";
import success2 from "../../assets/img/home/success2.png";
import mike from "../../assets/img/mike.jpg";

import { Link } from 'react-router-dom';
import { formatDate, Get_Blogs } from 'utils/CommonMethods.js';
import Swal from 'sweetalert2';
import { baseImageUrl } from 'utils/Api.js';
const Blog = (props) => {
  const [blogs, setBlogs] = useState([]);
    const GetBlogs = async () => {
        //
        try {
            var data =  await Get_Blogs(0, 0);
            if(data != null){
                setBlogs(data.Table)
                return data;
              
            }
            else{
                // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
                return [];
            }
        } catch (error) {
          // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
          return [];
        }
    }
    useEffect(() => {
        GetBlogs()
    }, [])
    return (

        <div className="maincontent">
            <HomeHeader isShow={false} />

            <div className='content'>
            <section id="inner-banner" className="section">
                <div className="container">
                    <h1 className="mb-0">Blog</h1>
                 
                </div>
            </section>
            <section className='section-blos-list mt-5 mb-4'>
                <Container>
                    <Row>
                      <Col md="8">
                        <Row>
                        {blogs && blogs.map((item,key) => (
                          <Col md="6 blogsCol" key={key}>
                          <Card body>
                          <img src={baseImageUrl + item.imageUrL} className="imgBlogs" alt=''/>
                            <div className='blogs-div'>
                              <h4>{item.BlogsTitle.substring(0, 22)}...</h4>
                              <h6>Date: {formatDate(item.BlogsStartDate)}</h6>
                              <p>{item.BlogsDesc.substring(0, 95)}...</p>
                              <Link 
                                to={{
                                    pathname: "/blog-single",
                                    state: item // your data array of objects
                                }}
                              >Read More</Link>
                            </div>
                          </Card>
                          
                        </Col>
                        ))}
                          
                        </Row>
                        
                      </Col>
                      <Col md="4">
                      <Card>
                      <CardBody>
                        <div className='inpusss'>
                          <input
                          placeholder='Search'
                          />
                          <Button color='primary'>Search</Button>
                        </div>
                      </CardBody>
                      </Card>
                      <Card>
                      <CardBody>
                      <h4 className='mb-2'>Recent Posts</h4>
                      {blogs && blogs.filter((item, idx) => idx < 4).map((item,key) => (
                        <Card body className='mb-3' key={key}>
                        <div className='blogs'>
                          <img src={baseImageUrl + item.imageUrL} alt=""/>
                          <div>
                          <h5>{item.BlogsTitle}</h5>
                            <p style={{fontSize:'14px', marginBottom:'0'}}>{item.BlogsDesc.substring(0, 60)}...</p>
                            <p><small>Date: {formatDate(item.BlogsStartDate)}</small></p>
                          </div>
                        </div>
                      </Card>
                      ))}
                        
                        
                        </CardBody>
                        </Card>
                        {/* <Card>
                        <CardBody>
                        <div className='cat'>
                          <h4 className='mb-2'>Categories</h4>
                          <ul className='subbc'>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            </ul>
                        </div>
                        </CardBody>
                        </Card> */}
                      </Col>
                    </Row>
                    
                </Container>
            </section>
            </div>

            <HomeFooter />
        </div>
    )
}

export default Blog



