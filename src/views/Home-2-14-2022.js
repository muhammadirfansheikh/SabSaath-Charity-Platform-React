import React from 'react'

import HomeHeader from '../components/Header/HomeHeader.js'
import HomeFooter from '../components/Footer/HomeFooter.js'
//import {fetchData} from '../utils/Api.js'
//import {ApiMethods} from '../utils/Constants.js'

import hcimagel from "../assets/img/home/school.png";
import hcimage2 from "../assets/img/home/4.jpg";
import hcimage3 from "../assets/img/home/people.png";
import hcimage4 from "../assets/img/home/people1.png";
import hcimage5 from "../assets/img/home/icon-1.png";
import hcimage6 from "../assets/img/home/icon-2.png";
import hcimage7 from "../assets/img/home/plogo1.png";
import hcimage8 from "../assets/img/home/plogo2.png";
import hcimage9 from "../assets/img/home/plogo3.png";
import hcimage10 from "../assets/img/home/plogo4.png";
import hcimage11 from "../assets/img/home/student.png";
import hcimage12 from "../assets/img/home/water.png";
import hcimage13 from "../assets/img/home/patient.png";
import hcimage14 from "../assets/img/home/ration.png";

import {fetchIp} from "../utils/Api.js";
const Home = (props) => {

    React.useEffect(() => {

    const load = async () => {
   var result=await fetchIp();
  // 
   if(result!=undefined && result!=null)
   {
    localStorage.setItem('UserIP', result.IPv4+",CountryCode:"+result.country_code+",country_name:"+result.country_name+",latitude:"+result.latitude+",longitude:"+result.longitude);
   }
   else{
     localStorage.setItem('UserIP',"No Ip");
   }
    };
    load();
  }, []);
    return (

        <div>
            <HomeHeader />

            <section className="section jumbotron jumbotron-fluid">
                <div className="container align-items-center">
                    <div className="text-center">
                        <h1 className="masthead-heading mb-0">We want to make a pakistan a beacon of piece, prosperty and peice</h1>
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 text-center">
                            <h3 className="text-center">OUR MISSIONS TO ACHIEVE OUR VISION</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2 text-center">
                            <div className="post-article">
                                <div className="p-4">
                                    <p>STRIVING TOWARDS REALIZING
                                        EVERY PAKISTANI’S <strong> CONSTITUTION</strong></p>
                                    <h2 className="posta-heading">RIGHT TO EDUCATION</h2>
                                    <img className="img-fluid" src={hcimagel} alt="..." />
                                    <div className="news">
                                        <h4>WE BELIEVE</h4>
                                        <hr />
                                        <span>THE ROAD TO DEVELOPMENT OF ANY NATION STARTS FROM QUALITY EDUCATION FOR ALL.</span>
                                        <p>Pakistan has been long striving to provide for its burgeoning population. We are determined to break
                                            the vicious cycle of inequality by encouraging and facilitating access to academic scholarships and
                                            vocational training programmes.</p>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item active">CLOSER LOOK</li>
                                            <li className="list-group-item">Soup Kitchens/Dastarkhwan</li>
                                            <li className="list-group-item">Interest Free loans</li>
                                            <li className="list-group-item">Monthly Ration Programme</li>
                                            <li className="list-group-item">Disaster Relief Work</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="post-article">
                                <div className="p-4">
                                    <p>FIGHTING <strong>UN-EMPLOYMENT</strong> AND BANKRUPTCY
                                        WITH EASY ACCESS TO </p>
                                    <h2 className="posta-heading">QUALITY HEALTHCARE</h2>
                                    <img className="img-fluid" src={hcimage2} alt="..." />
                                    <div className="news">
                                        <h4>WE BELIEVE</h4>
                                        <hr />
                                        <span>THAT ACCESS TO QUALITY HEALTHCARE IS THE
                                            UNDENIABLE RIGHT OF EVERY HUMAN BEING.</span>

                                        <p>We help save lives by proactively working with communities on disease prevention as well as by helping
                                            those who are in dire need of healthcare. With the help of our panel of doctors and partner hospitals,
                                            we provide emergency care, effective vaccines, drugs, diagnostics, medical equipment and surgical
                                            intervention to deliver quality health services. After recovery, we strive to make patients financially
                                            independent by facilitating their re-entry into the job market. In case of children, after their
                                            treatment, we ensure they are able to return to school.</p>
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item active">CLOSER LOOK</li>
                                            <li className="list-group-item">Soup Kitchens/Dastarkhwan</li>
                                            <li className="list-group-item">Interest Free loans</li>
                                            <li className="list-group-item">Monthly Ration Programme</li>
                                            <li className="list-group-item">Disaster Relief Work</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="together" className="section bg-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="together-box">
                                <img className="icon" src={hcimage3} alt="..." />
                                <h3 className="heading">TOGETHER WE CAN UPLIFT OUR COMMUNITIES</h3>
                                <p>We require people of similar vision who are actively advocating or working towards uplifting of local
                                    communities</p>
                                <div className="text-center">
                                    <a href="#" className="btn btn-primary">Conatct Us</a>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="together-box">
                                <img className="icon" src={hcimage4} alt="..." />
                                <h3 className="heading">RELATIONSHIPS BUILT WITH PEOPLE AND PARTNERSHIPS</h3>
                                <p>Our network, team and partners act as building blocks and bring us closer to achieving our vision of a
                                    Pakistan where every person has access to basic rights of healthcare, education and well-being.</p>

                                <div className="text-center">
                                    <a href="#" className="btn btn-secondary">Partners</a>
                                    <a href="#" className="btn btn-secondary">Applicants</a>
                                    <a href="#" className="btn btn-secondary">Job Seeker</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="foundation" className="section bg-dblue">
                <div className="container">
                    <div className="row aaa">
                        <div className="col-lg-12">
                            <h2 className="font-weight-bold text-center my-4">WHAT MAKES ZAMAN FOUNDATION UNIQUE?</h2>
                        </div>
                        <div className="col-lg-6 mt-3">
                            <div className="card card-foundation">
                                <div className="card-img-top">
                                    <img className="" src={hcimage5} alt="..." />
                                </div>
                                <div className="card-body pr-5">
                                    <h4 className="card-title">FREE FROM DESCRIPTION</h4>
                                    <p className="card-text">Zaman Foundation actively works towards reintegrating the jobless by
                                        placing them through our partner organizations/companies hence making them self-reliant.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 mt-3">
                            <div className="card card-foundation">
                                <div className="card-img-top">
                                    <img className="" src={hcimage6} alt="..." />
                                </div>
                                <div className="card-body pr-5">
                                    <h4 className="card-title">ADOPTING THEIR FAMILIES</h4>
                                    <p className="card-text">Zaman Foundation actively works towards reintegrating the jobless by
                                        placing them through our partner organizations/companies hence making them self-reliant.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="partners" className="section">
                <div className="container">
                    <h2 className="font-weight-bold text-center my-4">PARTNERS</h2>
                    <div className="row">
                        <div className="partner-logo col-lg-3">
                            <img className="plogo" src={hcimage7} alt="..." />
                        </div>
                        <div className="partner-logo col-lg-3">
                            <img className="plogo" src={hcimage8} alt="..." />
                        </div>
                        <div className="partner-logo col-lg-3">
                            <img className="plogo" src={hcimage9} alt="..." />
                        </div>
                        <div className="partner-logo col-lg-3">
                            <img className="plogo" src={hcimage10} alt="..." />
                        </div>
                    </div>
                </div>
            </section>

            <section id="achievements" className="section bg-grey">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="font-weight-bold text-center my-4">ACHIEVEMENTS</h2>
                            <div class="mt-5"></div>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="achievement-counter">
                                <h5 className="ac-number">6</h5>
                                <p>WATER FILTRATION PLANTS</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="achievement-counter">
                                <h5 className="ac-number">1908</h5>
                                <p>SCHOLARSHIPS AWARDED</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="achievement-counter">
                                <h5 className="ac-number">5094</h5>
                                <p>MEDICAL BENEFICIARIES</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3">
                            <div className="achievement-counter">
                                <h5 className="ac-number">6543</h5>
                                <p>MEALS SERVED A MONTH</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="sponsor" className="section bg-dblue">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="font-weight-bold text-center my-4">SPONSOR WITH US</h2>
                        </div>
                        <div className="col-lg-3">
                            <div className="sponsor-box">
                                <img className="sponsor-img" src={hcimage11} alt="..." />
                                <h6 className="heading">SPONSOR A STUDENT</h6>
                                <h5 className="price">RS 1500</h5>
                                <h6 className="heading">/MONTH</h6>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="sponsor-box">
                            <img className="sponsor-img" src={hcimage12} alt="..." />
                            <h6 className="heading">SPONSOR A WATER</h6>
                            <h5 className="price">RS 5 LAKH</h5>
                            <h6 className="heading">/MONTH</h6>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="sponsor-box">
                            <img className="sponsor-img" src={hcimage13} alt="..." />
                            <h6 className="heading">SPONSOR A PATIENT</h6>
                            <h5 className="price">RS 25,000</h5>
                            <h6 className="heading">/MONTH</h6>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <div className="sponsor-box">
                            <img className="sponsor-img" src={hcimage14} alt="..." />
                            <h6 className="heading">SPONSOR A RATION</h6>
                            <h5 className="price">RS 75,000</h5>
                            <h6 className="heading">/MONTH</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="video" className="section p-0 bg-dblue">
                <div className="container">
                    <div className="row">
                        <div className="embed-responsive embed-responsive-21by9">
                            <iframe width="1349" height="759" src="https://www.youtube.com/embed/nuIvCqxjabM" title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen></iframe>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 offset-md-4">
                            <a href="#" className="btn-donate">Donate Us</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contactus" className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 offset-lg-2 col-md-8 offset-md-2">
                            <div className="contact-info">
                                <h2 className="font-weight-bold text-center my-4">Contact us</h2>
                                <p className="text-center mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you.</p>
                                <div className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <h2 className="contact-heading">Address</h2>
                                        <p>21 Waris Rd, Lahore, Pakistan.</p>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <h2 className="contact-heading">Email</h2>
                                        <p>info@zamanfoundation.pk</p>
                                    </div>
                                    <div className="col-lg-4 col-md-4">
                                        <h2 className="contact-heading">Phone</h2>
                                        <p>+92 42 111 222 500</p>
                                    </div>
                                </div>
                                <form>
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6">
                                            <label>Your Name</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col">
                                            <label>Your Email</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="col-12">
                                            <label>Your Message</label>
                                            <textarea type="text" className="form-control"></textarea>
                                        </div>
                                        <div className="form-check ">
                                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                                            <label className="form-check-label" for="exampleCheck1">I agree that my submitted data is being collected and
                                                stored. For further details on handling user data, see our Privacy Policy</label>
                                        </div>
                                        <div className="coll">
                                            <button type="button" className="btn btn-success">Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <HomeFooter />
        </div>

    )
}

export default Home



