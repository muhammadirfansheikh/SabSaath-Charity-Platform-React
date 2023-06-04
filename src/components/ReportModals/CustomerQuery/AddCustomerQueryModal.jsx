import moment from "moment"
import { useState } from "react"
import { useEffect } from "react"
import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import FormGroupButton from "components/GeneralComponent/FormGroupButton"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import { ContactUsController } from "utils/CommonMethods"
import Swal from "sweetalert2"

const {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Spinner,
  FormGroup,
} = require("reactstrap")

const AddCustomerQueryModal = ({
  showAddModal,
  setShowAddModal,
  ReBindGrid,
}) => {
  const initialValues = {
    OperationID: 1,
    CustomerQueriesID: null,
    FirstName: "",
    LastName: "",
    Phoneno: "",
    Emailaddress: "",
    QueryMessage: "",
    QueryStatusID: 1577,
    QuerySource: 102,
    IsEmail: 0,
    TicketTypeID: null,
    TicketArea: null,
    TicketAreaID: null,
    ContactUS_Comments: null,
    TransactionLink: "",
  }
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(initialValues)
  const [moduleList, setModuleList] = useState([])
  const [ticketList, setTicketList] = useState([])
  const [statusList, setStatusList] = useState([])

  const handleInputChange = (e) => {
    let { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    let res = await ContactUsController(
      data?.OperationID,
      data?.CustomerQueriesID,
      data?.FirstName,
      data?.LastName,
      data?.Phoneno,
      data?.Emailaddress,
      data?.QueryMessage,
      data?.QueryStatusID,
      data?.QuerySource,
      data?.IsEmail,
      data?.TicketTypeID,
      data?.TicketAreaID,
      data?.ContactUS_Comments,
      data?.TransactionLink
    )
    if (res.Response === true) {
      if (res.DataSet.Table[0].haserror === 1) {
        setLoading(false)
        setData(initialValues)

        Swal.fire({
          title: "Error",
          text: res.DataSet?.Table[0]?.MESSAGE,
          icon: "error",
        })
      } else {
        setLoading(false)
        e.preventDefault()
        setData(initialValues)

        Swal.fire({
          title: "Success",
          text: "Submitted Successfully.",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            setShowAddModal(false)
            ReBindGrid()
          }
        })
      }
    } else {
      setLoading(false)
      setData(initialValues)

      Swal.fire({
        title: "Error",
        text: "Some Thing Went Wrong",
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          setShowAddModal(false)
          ReBindGrid()
        }
      })
    }
    
  }

  useEffect(() => {
    GetCustomerQueryEdit()
    return () => {
      if (showAddModal === false) {
        setStatusList([])
        setTicketList([])
        setModuleList([])
      }
    }
  }, [])

  const GetCustomerQueryEdit = async (OID = 3) => {
    setLoading(true)
    try {
      const data = await ContactUsController(OID)
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          setLoading(false)
          setStatusList(data?.DataSet?.Table)
          setModuleList(data?.DataSet?.Table1)
          setTicketList(data?.DataSet?.Table2)
          return data?.DataSet?.Table
        } else {
          setLoading(false)
          return []
        }
      } else {
        setLoading(false)
        return []
      }
    } catch (error) {
      setLoading(false)
      return []
    }
  }

  return (
    <Modal
      isOpen={showAddModal}
      toggle={() => {
        setShowAddModal(false)
      }}
      size="lg"
      backdrop="static"
    >
      <ModalHeader toggle={() => setShowAddModal(false)}>
        Add Record
      </ModalHeader>

      <ModalBody>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "60px",
            }}
          >
            <Spinner
              style={{
                width: "10rem",
                height: "10rem",
              }}
              color="danger"
            />
          </div>
        ) : (
          <>
            <form onSubmit={onSubmitHandler}>
              <Row>
                <Col md={6}>
                  <FormGroupSelect
                    label="Module*"
                    name="TicketAreaID"
                    value={data?.TicketAreaID}
                    onChange={(e) => {
                      handleInputChange(e)
                    }}
                    list={moduleList}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                  />
                </Col>
                <Col md={6}>
                  <FormGroupSelect
                    label="Ticket Type*"
                    name="TicketTypeID"
                    value={data?.TicketTypeID}
                    onChange={(e) => {
                      handleInputChange(e)
                    }}
                    list={ticketList}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="First Name"
                    placeholder="First Name"
                    name="FirstName"
                    value={data?.FirstName}
                    required={true}
                    onChange={handleInputChange}
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Last Name"
                    placeholder="Last Name"
                    name="LastName"
                    value={data?.LastName}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Phone"
                    name="Phoneno"
                    value={data?.Phoneno}
                    required={true}
                    maxLength="15"
                    isNumber="true"
                    onChange={handleInputChange}
                    placeholder="Phone"
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Email"
                    placeholder="Email"
                    name="Emailaddress"
                    value={data?.Emailaddress}
                    onChange={handleInputChange}
                    required={true}
                  />
                </Col>

                <Col md={12}>
                  <FormGroup>
                    <label className="form-label">Message*</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="QueryMessage"
                      max="1000"
                      value={data?.QueryMessage}
                      onChange={handleInputChange}
                      required={true}
                    ></textarea>
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Source"
                    placeholder="Source"
                    name="Source"
                    value="Back End"
                    disabled
                  />
                </Col>

                <Col md={6}>
                  <FormGroupInput
                    label="Transaction Link"
                    placeholder="Transaction Link"
                    name="TransactionLink"
                    value={data?.TransactionLink}
                    onChange={handleInputChange}
                  />
                </Col>

                <Col md={6}>
                  <FormGroupSelect
                    label="Status*"
                    name="QueryStatusID"
                    value={data?.QueryStatusID}
                    onChange={(e) => {
                      handleInputChange(e)
                    }}
                    list={statusList}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                  />
                </Col>

                <Col className="text-right" md={12}>
                  <FormGroupButton loading={loading} title="Add" />
                </Col>
              </Row>
            </form>
          </>
        )}
      </ModalBody>
    </Modal>
  )
}

export default AddCustomerQueryModal
