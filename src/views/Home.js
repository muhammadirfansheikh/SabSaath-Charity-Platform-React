import React, { useEffect, useState } from "react"
import HomeHeader from "../components/Header/HomeHeader.js"
import HomeFooter from "../components/Footer/HomeFooter.js"
import smile from "../assets/img/home/smile01.png"
import fbr from "../assets/img/home/fbr.png"
import {
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap"
import QuickDonation from "components/HomeComponent/QuickDonation.js"
import AllCases from "components/HomeComponent/AllCases.js"
import MainHome from "components/HomeComponent/MainHome.js"
import ImpactStrip from "components/HomeComponent/ImpactStrip.js"
import CaseOfTheDay from "components/HomeComponent/CaseOfTheDay.js"
import HowItWork from "components/HomeComponent/HowItWork.js"
import HomeSupport from "components/HomeComponent/HomeSupport.js"
import BlogsAndTestimonials from "components/HomeComponent/BlogsAndTestimonials.js"
import { Get_Active_Reserved_Cases } from "utils/CommonMethods.js"
import CorporatePartners from "./Pages/CorporatePartners.js"
import qurbani from "../assets/img/home/Qurbani.png"
// import FloodRelief from "components/HomeComponent/FloodRelief.png";
// import FloodRelief from "../../../assets/img/home/FloodRelief.png";
import QurbaniCampaign from "./Pages/QurbaniCampaign.js"
import { BaseAPIURL } from "utils/Constants.js"
import {
  baseImageUrl,
  baseUrl,
  QurbaniCampaignURL,
  casedetail_p,
  DisasterreliefURL,
} from "utils/Api.js"
import FloodRelief from "components/HomeComponent/FloodRelief.js"
import RamazanCampaignHome from "components/HomeComponent/RamazanCampaignHome.js"
import NGOFeaturedSection from "components/HomeComponent/NGOFeatureSection.jsx"
import SpecialAppeals from "components/HomeComponent/SpecialAppeals.jsx"
import TestimonialsSection from "components/HomeComponent/TestimonialsSection.jsx"
import HomeCarousel from "components/HomeComponent/HomeCarousel.js"
import AdsSection from "components/HomeComponent/AdsSection.jsx"

const Home = (props) => {
  const mealId = "mealSec"
  const [openCurrencySelect, setOpenCurrencySelect] = useState(false)
  const getPopup = localStorage.getItem("Popup") //manzoor
  useEffect(() => {
    //  setModalOpen(true); //manzoor
    const timer = setTimeout(() => GetCasesCount(), 500)
    return () => clearTimeout(timer)
  }, [])
  const initialValues = {
    position: "unset",
    bottom: "0",
    width: "auto",
    zIndex: "1",
  }
  const [caseCount, setCaseCount] = useState([])
  const [donorCount, setDonorCount] = useState([])
  const [iconCount, setIconCount] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [basicInfo, setBasicInfo] = useState(initialValues)
  const [btnClose, setBtnClose] = useState(false)
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 600) {
        setBtnClose(true)
        setBasicInfo({
          ...basicInfo,
          position: "fixed",
          bottom: "0",
          width: "100%",
          zIndex: "999",
        })
      } else {
        setBtnClose(false)
        setBasicInfo({ ...initialValues })
      }
    })
  }, [])

  const GetCasesCount = async () => {
    try {
      var data = await Get_Active_Reserved_Cases(0, 0)
      if (data) {
        setCaseCount(data.DataSet.Table[0])
        setIconCount({ ...data.DataSet.Table1[0] })
        setDonorCount({ ...data.DataSet.Table3[0] })
        return data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
  const toggle = () => {
    localStorage.setItem("Popup", "isOpen") //manzoor
    setModalOpen(false)
  }

  const scrollToSelect = (id) => {
    document.getElementById(id).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    })
  }

  const toggleCurrencySelect = (state) => {
    if (state === "close") {
      setOpenCurrencySelect(false)
      return
    }
    setOpenCurrencySelect(!openCurrencySelect)
    scrollToSelect("currency-select")
  }

  return (
    <div className="maincontent">
      <HomeHeader
        isShow={true}
        openSelect={openCurrencySelect}
        toggleCurrencySelect={toggleCurrencySelect}
      />
      <HomeCarousel />
      {/* <MainHome proplink={props} caseCountData={caseCount} /> */}
      <QuickDonation
        proplink={props}
        controls={basicInfo}
        btnClose={btnClose}
        toggleCurrencySelect={toggleCurrencySelect}
      />

      <NGOFeaturedSection />
      <SpecialAppeals />
      {/* <CaseOfTheDay proplink={props} /> */}


      {/* <BlogsAndTestimonials /> */}

      <RamazanCampaignHome />

      {/* <HowItWork proplink={props} /> */}
      {/* <AllCases proplink={props} /> */}
      <AdsSection />
 
      <ImpactStrip caseIconCount={iconCount} donorCount={donorCount} />

      {/* <section className="section pt-0 pb-0">
        <div className="smile">
          <img src={smile} alt="" />
        </div>
      </section> */}
      <TestimonialsSection />

      <CorporatePartners />
      <section className="section section-contact">
        <Container>
          <Row style={{ alignItems: "center" }}>
            <Col lg="2" md="12" sm="12"></Col>
            <Col lg="2" md="3" sm="3">
              <img src={fbr} alt="" />
            </Col>
            <Col lg="6" md="9" sm="9">
              <div className="contact">
                <h4>We are tax exempted under FBR act 2(36)(c)</h4>
                <p>
                  <span>NTN Number: 2544023-3</span>
                </p>
              </div>
            </Col>
            <Col lg="2" md="12" sm="12"></Col>
          </Row>
        </Container>
      </section>

      <HomeFooter />

      {/* <Modal size="lg" isOpen={modalOpen} toggle={toggle} backdrop="static"> ok*/}
      {/* <Modal size="lg" isOpen={getPopup === null && modalOpen} backdrop="static"> */}
      <Modal size="lg" isOpen={modalOpen} toggle={toggle} backdrop="static">
        <ModalHeader
          style={{ border: "0", backgroundColor: "#d60b11" }}
          toggle={toggle}
        >
          <div class="modal-title" style={{ color: "white" }}>
            <p>Pakistan Flood Relief 2022</p>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col>
              <div>
                <p>
                  <strong>Pakistan needs your help!</strong>
                </p>
                <p>
                  {/* <strong>Dear Visitors,</strong>  */}
                  {/* <p>Our Qurbani 2022 Campaign is live now. 
                Qurbani was never this easy!</p> */}
                  {/* <p><strong>#BaanteinBarhiKhushiyan</strong></p> */}
                  {/* <p>
                 <Button style={{ background :'rgb(214, 11, 17)' }}>
                 <a href={ QurbaniCampaignURL + "QurbaniCampaign"}  target="_blank"style={{ color :'white'}}>Start your Qurbani</a>
                </Button>
              </p> */}
                  {/* <p>35 million people across Pakistan are affected by devastating floods.</p> */}
                  {/* <p><strong>#BaanteinBarhiKhushiyan</strong></p> */}
                  {/* <p>
                    <Button style={{ background: 'rgb(214, 11, 17)' }}>
                      <a href={casedetail_p} target="_self" style={{ color: 'white' }}>Donate Now</a>
                    </Button>                 
                  </p> */}

                  <p>
                    35 million people across Pakistan are affected by
                    devastating floods.
                  </p>
                  {/* <p><strong>#BaanteinBarhiKhushiyan</strong></p> */}
                  <p>
                    <Button style={{ background: "rgb(214, 11, 17)" }}>
                      {/* <a href={casedetail_p} target="_self" style={{ color: 'white' }}>Donate Now</a> */}
                      <a
                        href={DisasterreliefURL}
                        target="_self"
                        style={{ color: "white" }}
                      >
                        Donate Now
                      </a>
                    </Button>
                    {/* <span className="casesurgent">URGENT</span> */}
                  </p>
                </p>
                {/* <p> 
                 Photos of only those people are published who have given
                informed consent.
                </p>  */}
                <p class="text-center">
                  {/* <img src={FloodRelief} alt="" /> */}
                </p>
              </div>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Home
