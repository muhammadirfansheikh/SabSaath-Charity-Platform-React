import React,{useState,useEffect} from 'react'
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
import mike from "../../assets/img/mike.jpg";
import { Link } from 'react-router-dom';
import { baseImageUrl } from 'utils/Api.js';
import { formatDate, Get_Blogs } from 'utils/CommonMethods.js';
import Swal from 'sweetalert2';
const BlogSingle = (props) => {
  var blogDetail = props.location.state != undefined ? props.location.state : ""
  var title = blogDetail.BlogsTitle
  var desc = blogDetail.BlogsDesc
  var image = blogDetail.imageUrL

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
                    <h1 className="mb-0">{title !== null ? title : "No Title Found"}</h1>
                  
                </div>
            </section>
            <section className='section section-storydetail section-blos-list'>
              <Container>
                <Row>
                  <Col md="12">
                    <div className='title-story'>
                      <h2>{title !== null ? title : "No Title Found"}</h2>
                      
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
                        <img src={baseImageUrl + image} width="100%" alt=''/>
                        
                        <p className='mt-4 mb-2'>
                        {desc !== null ? desc : "Lorem Ipsum"}
                        </p>
                      </div>
                    </div>
                  </Col>
                  <Col md="4">
                  <div className='inpusss'>
                          <input
                          placeholder='Search'
                          />
                          <Button color='primary'>Search</Button>
                        </div>
                        <h3 className='mb-2 mt-2'>Recent Posts</h3>
                        {blogs && blogs.filter((item, idx) => idx < 4).map((item, key) => (
                            <Card body className='mb-3' key={key}>
                            <div className='blogs'>
                              <img src={baseImageUrl + item.imageUrL} alt=""/>
                              <div>
                                <h5>{item.BlogsTitle}</h5>
                                <p style={{fontSize:'14px', marginBottom:'0'}}>{item.BlogsDesc.substring(0, 65)}...</p>
                                <h5 style={{color:'#776e6e'}}>Date: {formatDate(item.BlogsStartDate)} </h5>
                              </div>
                            </div>
                          </Card>
                        ))}
                        
                        {/* <div className='cat'>
                          <h3 className='mb-2'>Categories</h3>
                          <ul className='subbc'>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            <li><a href='#'>Lorem Ipsum</a></li>
                            </ul>
                        </div> */}
                  </Col>
                </Row>
              </Container>
            </section>
            </div>

            <HomeFooter />
        </div>
    )
}

export default BlogSingle



