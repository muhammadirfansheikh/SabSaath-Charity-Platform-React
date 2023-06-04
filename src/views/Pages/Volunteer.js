import React, { useEffect, useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  CardBody,
  Card,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Row,
  CardHeader,
  Table,
  Button,
  InputGroup,
  Alert,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import MultiSelectInput from "components/MultiSelect/MultiSelectInput.js"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import { SetupMasterIds } from "utils/Constants"
import { GetSetupMaster } from "utils/CommonMethods"
//import {fetchData} from '../../utils/Api.js'
//import {ApiMethods} from '../../utils/Constants.js'

import { fetchIp } from "../../utils/Api.js"
import { Link } from "react-router-dom"
const VolunteerForm = (props) => {
  const [dropDownList, setDropDownList] = useState({
    CityList: [],
    genderList: [],
    LearnAboutList: [],
    PreferredArea: [],
  })

  const initialValues_Save = {
    FullName: "",
    Gender: "",
    Age: "",
    Dateofbirth: "",
    HighestAcademicQualification: "",
    CityID: "0",
    CurrentOccupation: "",
    InstitutionOrganization: "",
    MobileNumber: "",
    EmailAddress: "",
    PostalAddress: "",
    LearnAboutIDS: "",
    preferredareas: "",
  }

  useEffect(() => {
    const fetchDropDownList = async () => {
      let genderList = await GetSetupMaster(SetupMasterIds.Gender, 0, "", 0)
      let CityList = await GetSetupMaster(SetupMasterIds.City, 0, "", 0)
      let LearnAboutList = await GetSetupMaster(
        SetupMasterIds.LearnAbout,
        0,
        "",
        0
      )
      let PreferredAreaList = await GetSetupMaster(
        SetupMasterIds.PreferredArea,
        0,
        "",
        0
      )

      //let genderList = await GetSetupMaster(SetupMasterIds.Gender, 0, "", 0);

      setDropDownList({
        ...dropDownList,
        CityList: CityList.data,
        genderList: genderList.data,
        LearnAboutList: LearnAboutList.data,
        PreferredAreaList: PreferredAreaList.data,
      })
    }
    fetchDropDownList()
    // fetchApplicantId();
  }, [])

  const initialValues = {
    CityId: -1,
    GenderID: -1,
    LearnAboutID: -1,
    PreferredAreaID: -1,
  }

  const [Volunteer, setVolunteer] = useState(initialValues)

  const handleVolunteerChange = (event) => {
    setVolunteer({
      ...Volunteer,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <div className="maincontent">
      <HomeHeader isShow={false} />
      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h2>Volunteer</h2>
          </div>
        </section>

        <section className="section m-4 p-4">
          <div className="container">
            <Row>
              <Col md={12}>
                <h5>This feature is yet to be launched.</h5>
              </Col>
            </Row>
          </div>
        </section>
      </div>

      <HomeFooter />
    </div>
  )
}

export default VolunteerForm
