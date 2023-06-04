import React,{useState, useEffect} from 'react'
import success1 from "../../assets/img/home/success1.png";
import success2 from "../../assets/img/home/success2.png";
import success3 from "../../assets/img/home/success3.png";
import { Row,Col, Container, Card} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Get_Success_Stories } from 'utils/CommonMethods';
import { baseImageUrl } from 'utils/Api';
import Swal from 'sweetalert2';


const SuccessStories = () => {
    const [successStoryddl, setSuccessStoryddl] = useState([]);
    const GetSuccessStories = async () => {
        try {
            var data =  await Get_Success_Stories(0, 0);
            if(data != null){
                setSuccessStoryddl(data.Table)
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
        GetSuccessStories()
    }, [])
  return (
    <section className='section section-success pt-4 pb-4'>
        <Container>
            <Row>
                <Col>
                    <div>
                        <h2 className='success-title mb-3'>Success Stories</h2>
                    </div>
                </Col>
            </Row>
            <Row>
                {successStoryddl && successStoryddl.filter((data, key) => key < 3).map((data, key)=>(
                    <Col lg="4" md="4" sm="4" xs="12" key={key}>
                    <Card body>
                        <div className='donation-box'>
                        <img src={baseImageUrl + data.DocAttachment} alt=''/>
                            <div className='success-dona '>
                                <h4 className=' mt-2  mb-0'>{data.CaseTitle != "" ? data.CaseTitle : "Success Story"}</h4>
                                <p>{data.SuccessStory_ShortDesc}</p>
                                {/* <div dangerouslySetInnerHTML={{__html: data.CaseDescription !== "" ? data.CaseDescription.substring(0, 66)+ ".." : "Success Story Desc" }}></div> */}
                                {/* <p className=''>
                                { data.CaseDescription != "" ? data.CaseDescription : "Success Story Desc"}
                                </p> */}
                                <h2 className='mb-2'>Rs. {data.TotalFunds !== null ? data.TotalFunds : "70,000" }</h2>
                                <Link 
                                to={{
                                    pathname: "/story-detail",
                                    state: data // your data array of objects
                                  }}
                                
                                >
                                    Read More</Link>
                            </div>
                        </div>
                    </Card>
                </Col>
                ))}
            </Row>
            <Row>
                <Col>
                    <div className='text-center'>
                        <Link className='btn custom-btn btn-primary' to="/story-list" style={{textDecoration:'none'}} color='primary'> View All Stories</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default SuccessStories