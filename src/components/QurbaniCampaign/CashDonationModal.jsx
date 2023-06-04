import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  Row,
} from "reactstrap"
import Swal from "sweetalert2"
import { LeadPayByCash, QurbaniModule } from "utils/Api"
import {
  ContactUsController,
  ConvertNumricToComaSeparate,
} from "utils/CommonMethods"
import { SetupMasterIds } from "utils/Constants"

const CashDonationModal = ({
  Ismodalshow,
  toggle,
  qurbaniDetails,
  currency,
  hissaQuantity,
  ExchangeRate,
  CatWiseAmount,
  ngos,
}) => {
  const history = useHistory()
  const initialValues = {
    OperationID: 1,
    CustomerQueriesID: null,
    FirstName: "",
    LastName: "",
    Phoneno: "",
    Emailaddress: "",
    QueryMessage: "",
    QueryStatus: 1577,
    QuerySource: 328,
    IsEmail: 2,
    TicketTypeID: LeadPayByCash,
    TicketArea: QurbaniModule,
    ContactUS_Comments: null,
    CityID: null,
  }
  const [values, setValues] = useState(initialValues)
  const [cities, setCities] = useState([])
  const [ticketType, setTicketType] = useState([])
  const queryMessage = `Option : ${qurbaniDetails?.donationName} ${
    SetupMasterIds.Cash_Donation ===
    parseInt(qurbaniDetails?.donationsubcategoryid)
      ? ""
      : qurbaniDetails?.donationsubcategoryid == SetupMasterIds.Multiple_Animals
      ? `, Qty : ` +
        "Goat = " +
        hissaQuantity?.amtGoat +
        ", Cow = " +
        hissaQuantity?.amtCow +
        ", Hissa = " +
        hissaQuantity?.amtHissa
      : `, Qty : ` + qurbaniDetails.Quantity
  } , Amount : ${
    qurbaniDetails?.CurrencyFromSymbol === "PKR"
      ? // PKR started
        parseInt(qurbaniDetails?.donationsubcategoryid) ===
        SetupMasterIds.Cash_Donation
        ? currency?.amountInPKR + " " + qurbaniDetails?.CurrencyFromSymbol
        : parseInt(qurbaniDetails?.donationsubcategoryid) ===
          SetupMasterIds.Multiple_Animals
        ? hissaQuantity?.amtGoat * CatWiseAmount[0] +
          hissaQuantity?.amtCow * CatWiseAmount[1] +
          hissaQuantity?.amtHissa * CatWiseAmount[2] +
          " " +
          qurbaniDetails?.CurrencyFromSymbol
        : currency.amountInPKR + " " + qurbaniDetails?.CurrencyFromSymbol
      : // PKR ended
      parseInt(qurbaniDetails?.donationsubcategoryid) ===
        SetupMasterIds.Cash_Donation
      ? currency?.amount +
        " " +
        qurbaniDetails?.CurrencyFromSymbol +
        " (" +
        ConvertNumricToComaSeparate(Math.round(currency.amountInPKR)) +
        " PKR)"
      : parseInt(qurbaniDetails?.donationsubcategoryid) ===
        SetupMasterIds.Multiple_Animals
      ? ConvertNumricToComaSeparate(
          (
            (hissaQuantity?.amtGoat * CatWiseAmount[0]) / ExchangeRate +
            (hissaQuantity?.amtCow * CatWiseAmount[1]) / ExchangeRate +
            (hissaQuantity?.amtHissa * CatWiseAmount[2]) / ExchangeRate
          ).toFixed(2)
        ) +
        " " +
        qurbaniDetails?.CurrencyFromSymbol +
        " (" +
        ConvertNumricToComaSeparate(
          (
            hissaQuantity?.amtGoat * CatWiseAmount[0] +
            hissaQuantity?.amtCow * CatWiseAmount[1] +
            hissaQuantity?.amtHissa * CatWiseAmount[2]
          ).toFixed(2)
        ) +
        " PKR)"
      : parseFloat(currency.amount.toFixed(2)) +
        " " +
        qurbaniDetails?.CurrencyFromSymbol +
        " (" +
        ConvertNumricToComaSeparate(Math.round(currency.amountInPKR)) +
        " PKR) "
  } , -  ${values.QueryMessage}/ 
NGO : ${ngos.find((ngo) => ngo.NGOFeatureID == qurbaniDetails.NGOId)?.Heading}
    `

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const getCities = async () => {
    try {
      const { DataSet } = await ContactUsController(3)
      setCities(DataSet?.Table3)
      setTicketType(
        DataSet?.Table2.find(
          (item) =>
            item?.ConstantValue === qurbaniDetails?.donationsubcategoryid
        )
      )
    } catch (error) {
      console.log(error)
    }
  }

  const resetFormelement = () => {
    setValues(initialValues)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!values.Phoneno || !values.Emailaddress) {
      return Swal.fire({
        title: "Error",
        text: "Phone No. and Email address is required",
        icon: "error",
      })
    }

    if (values.Phoneno.length < 7) {
      return Swal.fire({
        title: "Error",
        text: "Phone No. must be at least 7 digits",
        icon: "error",
      })
    }

    if (!values?.CityID) {
      return Swal.fire({
        title: "Error",
        text: "City is required",
        icon: "error",
      })
    }

    let data = await ContactUsController(
      values.OperationID,
      values.CustomerQueriesID,
      values.FirstName,
      values.LastName,
      values.Phoneno,
      values.Emailaddress,
      queryMessage,
      values.QueryStatus,
      values.QuerySource,
      values.IsEmail,
      ticketType?.SetupDetailId,
      values.TicketArea,
      values.ContactUS_Comments,
      null,
      null,
      values.CityID
    )
    if (data.Response === true) {
      if (data.DataSet.Table[0].haserror === 1) {
        Swal.fire({
          title: "Error",
          text: data.DataSet?.Table[0]?.MESSAGE,
          icon: "error",
        })
      } else {
        e.preventDefault()
        resetFormelement()
        Swal.fire({
          title: "Success",
          customClass: {
            container: "my-swal",
          },
          html: `<p>Thank you for choosing Sab Saath. <br/> We will get back to you within 2 business days.</p>`,
          icon: "success",
          showCancelButton: true,
          cancelButtonText: `Close`,
          cancelButtonColor: "#2f4050",
          allowOutsideClick: false,
          confirmButtonText: `Go to Homepage`,
          confirmButtonColor: "#bf1e2e",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/home")
          }

          if (result.isDismissed) {
            toggle()
          }
        })
      }
    } else {
      Swal.fire({
        title: "Error",
        text: "Some Thing Went Wrong",
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/home")
        }
      })
    }
  }

  useEffect(() => {
    getCities()
  }, [])

  return (
    <Modal isOpen={Ismodalshow} toggle={toggle} backdrop="off" size="lg">
      <ModalHeader toggle={toggle}></ModalHeader>
      <Card className="cardform">
        <h4 className="text-center">
          Request Form - Pay By Cash/Bank Transfer
        </h4>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <label className="form-label" for="">
                    First Name*
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="First Name"
                    name="FirstName"
                    max="100"
                    onChange={handleInputChange}
                    value={values.FirstName}
                    required={true}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <label className="form-label" for="">
                    Last Name*
                  </label>
                  <Input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    name="LastName"
                    max="100"
                    onChange={handleInputChange}
                    value={values.LastName}
                    required={true}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <label className="form-label" for="contactsFormFirstName">
                    Email*
                  </label>
                  <Input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="Emailaddress"
                    max="150"
                    onChange={handleInputChange}
                    value={values.Emailaddress}
                    required={true}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <FormGroupSelect
                    label="City*"
                    list={cities}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                    onChange={handleInputChange}
                    name="CityID"
                    value={values.CityID}
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroupInput
                  label="Phone*"
                  name="Phoneno"
                  value={values.Phoneno}
                  onChange={handleInputChange}
                  required={true}
                  maxLength="15"
                  isNumber="true"
                  placeholder="Phone"
                />
              </Col>
              <Col md={12}>
                <FormGroup>
                  <label className="form-label">Remarks</label>
                  <Input
                    type="text"
                    className="form-control"
                    id="QueryMessage"
                    placeholder="Remarks"
                    name="QueryMessage"
                    max="100"
                    onChange={handleInputChange}
                    value={values.QueryMessage}
                    required={true}
                  />
                </FormGroup>
              </Col>
              <Col md={12} className="d-flex justify-content-center">
                <Button
                  type="submit"
                  size="md"
                  className="btn-primary pt-3 text-center w-50 "
                >
                  Submit Request
                </Button>
              </Col>
            </Row>
          </form>
          <p className="text-primary pay-transaction-qurbani">
            * 100% of your donations net of transaction charges go to charity.
          </p>
        </CardBody>
      </Card>
    </Modal>
  )
}

export default CashDonationModal
