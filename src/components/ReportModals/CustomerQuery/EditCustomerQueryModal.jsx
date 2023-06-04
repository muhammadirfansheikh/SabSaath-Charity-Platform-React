import moment from "moment"
import { useState, useEffect } from "react"
import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import FormGroupButton from "components/GeneralComponent/FormGroupButton"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import AddCommentModal from "./AddCommentModal"
import { ContactUsController } from "utils/CommonMethods"
import Swal from "sweetalert2"
import { DonorQueryStatuses } from "utils/Constants"
import CenteredLoader from "components/GeneralComponent/CenteredLoader"
import { LeadHandPickAnimals, LeadPayByCash, QurbaniModule } from "utils/Api"

const {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Spinner,
  Button,
  FormGroup,
  Label,
} = require("reactstrap")

const EditCustomerQueryModal = ({
  showModal,
  setShowModal,
  setClickedRow,
  clickedRow,
  isEdit,
  ReBindGrid,
}) => {
  const initialValues = {
    OperationID: 1,
    CustomerQueriesID: "",
    FirstName: "",
    LastName: "",
    Phoneno: "",
    Emailaddress: "",
    QueryMessage: "",
    QueryStatus: "",
    QueryStatusID: "",
    QuerySource: "",
    QuerySourceID: "",
    IsEmail: 0,
    TicketTypeID: null,
    TicketArea: "",
    TicketAreaID: null,
    ContactUS_Comments: null,
    TransactionLink: "",
    CityID: null,
  }
  const [loading, setLoading] = useState(true)
  const [commentsLoading, setCommentsLoading] = useState(true)
  const [response, setResponse] = useState({})
  const [data, setData] = useState(initialValues)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [comments, setComments] = useState([])
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

  const GetComments = async () => {
    setCommentsLoading(true)
    try {
      const data = await ContactUsController(4, clickedRow?.TicketID)
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          setCommentsLoading(false)

          setResponse(data?.DataSet?.Table[0])
          setData({
            ...data?.DataSet?.Table[0],
            QueryMessage: data?.DataSet?.Table[0]?.QueryMessage.replace(
              "/",
              ""
            ),
          })
          setComments(data?.DataSet?.Table1)
          return data?.DataSet?.Table
        } else {
          setCommentsLoading(false)
          return []
        }
      } else {
        setCommentsLoading(false)
        return []
      }
    } catch (error) {
      setCommentsLoading(false)
      return []
    }
  }
  console.log("data", data)

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!data?.TicketAreaID) {
      return Swal.fire({
        title: "Error",
        text: "Please Select Module.",
        icon: "error",
      })
    }
    if (!data?.TicketTypeID) {
      return Swal.fire({
        title: "Error",
        text: "Please Select Ticket Type.",
        icon: "error",
      })
    }

    if (!data?.QuerySourceID) {
      return Swal.fire({
        title: "Error",
        text: "Please Select Query Source",
        icon: "error",
      })
    }

    if (
      (data?.QueryStatusID == DonorQueryStatuses.InProgress ||
        data?.QueryStatusID == DonorQueryStatuses.Closed) &&
      !comments.length
    ) {
      return Swal.fire({
        title: "Error",
        text: "Please add atleast one comment.",
        icon: "error",
      })
    }
    setLoading(true)

    let res = await ContactUsController(
      1,
      data?.TicketID,
      data?.FirstName,
      data?.LastName,
      data?.Phoneno,
      data?.Emailaddress,
      data?.QueryMessage,
      data?.QueryStatusID,
      data?.QuerySourceID,
      data?.IsEmail,
      data?.TicketTypeID,
      data?.TicketAreaID,
      data?.ContactUS_Comments,
      data?.TransactionLink,
      null,
      data?.CityID
    )
    if (res.Response === true) {
      if (res.DataSet.Table[0].haserror === 1) {
        setLoading(false)
        Swal.fire({
          title: "Error",
          text: res.DataSet?.Table[0]?.MESSAGE,
          icon: "error",
        })
      } else {
        e.preventDefault()
        setLoading(false)
        Swal.fire({
          title: "Success",
          text: "Data Updated Successfully",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            ReBindGrid()
            setShowModal(false)
          }
        })
      }
    } else {
      setLoading(false)
      Swal.fire({
        title: "Error",
        text: "Some Thing Went Wrong",
        icon: "error",
      }).then((result) => {
        if (result.isConfirmed) {
          ReBindGrid()
          setShowModal(false)
        }
      })
    }
  }

  // useEffect(() => {
  //   // setData(clickedRow)
  //   return () => {
  //     if (showModal === false) {
  //       setStatusList([])
  //       setTicketList([])
  //       setModuleList([])
  //     }
  //   }
  // }, [showModal])

  useEffect(() => {
    GetCustomerQueryEdit()
    GetComments()
  }, [])

  const GetCustomerQueryEdit = async (OID = 3) => {
    setLoading(true)
    try {
      const data = await ContactUsController(OID, clickedRow?.TicketID)
      if (data != null) {
        if (data.Response === true && data.DataSet != null) {
          setLoading(false)

          const currentStatus = clickedRow?.QueryStatusID
          const allStatuses = data.DataSet.Table

          if (currentStatus === DonorQueryStatuses.Pending) {
            // If Pending
            const showedStatuses = allStatuses.filter(
              (status) =>
                status.SetupDetailId === DonorQueryStatuses.InProgress ||
                status.SetupDetailId === currentStatus
            )
            setStatusList(showedStatuses)
          }
          if (currentStatus === DonorQueryStatuses.InProgress) {
            // If In Progrss
            const showedStatuses = allStatuses.filter(
              (status) =>
                status.SetupDetailId === DonorQueryStatuses.Closed ||
                status.SetupDetailId === currentStatus
            )
            setStatusList(showedStatuses)
          }

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
      isOpen={showModal}
      toggle={() => {
        setShowModal(false)
        setClickedRow(null)
      }}
      size="lg"
      backdrop="static"
    >
      <ModalHeader toggle={() => setShowModal(false)}>
        {clickedRow?.FirstName + " " + clickedRow?.LastName} Record
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
                <Col md={12}>
                  <p className="text-primary">Ticket ID : {data?.TicketID}</p>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Module*</Label>
                    <select
                      className="form-control"
                      name="TicketAreaID"
                      value={data?.TicketAreaID ? data?.TicketAreaID : ""}
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                      disabled={
                        !isEdit || response?.TicketAreaID == QurbaniModule
                      }
                    >
                      <option value="">Select Module</option>
                      {moduleList?.map((item) => {
                        return (
                          <option value={item?.SetupDetailId}>
                            {item?.SetupDetailName}
                          </option>
                        )
                      })}
                    </select>
                  </FormGroup>

                  {/* <FormGroupSelect
                    label="Module*"
                    name="TicketAreaID"
                    value={data?.TicketAreaID}
                    onChange={(e) => {
                      handleInputChange(e)
                    }}
                    list={moduleList}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    disabled={!isEdit}
                  /> */}
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label>Ticket Type*</Label>
                    <select
                      className="form-control"
                      name="TicketTypeID"
                      value={data?.TicketTypeID ? data?.TicketTypeID : ""}
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                      disabled={
                        !isEdit ||
                        response?.TicketTypeID == LeadPayByCash ||
                        response?.TicketTypeID == LeadHandPickAnimals
                      }
                    >
                      <option value="">Select Ticket Type</option>
                      {ticketList?.map((item) => {
                        return (
                          <option value={item?.SetupDetailId}>
                            {item?.SetupDetailName}
                          </option>
                        )
                      })}
                    </select>
                  </FormGroup>
                  {/* <FormGroupSelect
                    label="Ticket Type*"
                    name="TicketTypeID"
                    value={data?.TicketTypeID}
                    onChange={(e) => {
                      handleInputChange(e)
                    }}
                    list={ticketList}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    disabled={!isEdit}
                  /> */}
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="First Name"
                    name="FirstName"
                    value={data?.FirstName}
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Last Name"
                    name="LastName"
                    value={data?.LastName}
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Phone"
                    name="Phoneno"
                    value={data?.Phoneno}
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Email"
                    name="Emailaddress"
                    value={data?.Emailaddress}
                    disabled
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
                      disabled
                    ></textarea>
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroupInput
                    label="Transaction Link"
                    name="TransactionLink"
                    value={data?.TransactionLink}
                    onChange={handleInputChange}
                    disabled={!isEdit}
                  />
                </Col>

                {isEdit ? (
                  <Col md={6}>
                    <FormGroupSelect
                      label="Status*"
                      name="QueryStatusID"
                      value={
                        data?.QueryStatusID
                          ? data?.QueryStatusID
                          : clickedRow?.QueryStatusID
                      }
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                      list={statusList}
                      fieldId="SetupDetailId"
                      fieldName="SetupDetailName"
                      disabled={!isEdit}
                    />
                  </Col>
                ) : (
                  <Col md={6}>
                    <FormGroupInput
                      label="Status"
                      name="Status"
                      value={data?.QueryStatus}
                      disabled
                    />
                  </Col>
                )}

                <Col md={6}>
                  <FormGroupInput
                    label="Source"
                    name="QuerySource"
                    value={data?.QuerySource}
                    disabled
                  />
                </Col>
                <Col md={12}>
                  <FormGroupInput
                    label="Comments"
                    name="Comments"
                    value={data?.Comments}
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Created Date"
                    name="CreatedDate"
                    value={
                      data?.CreatedDate
                        ? moment(data?.CreatedDate).format(
                            "MMM-Do-YYYY hh:mm A"
                          )
                        : ""
                    }
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Created By"
                    name="CreatedBy"
                    value={
                      data?.QuerySourceID === 328 ? "System" : data?.CreatedBy
                    }
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Last Updated Date"
                    name="LastUpdatedDate"
                    value={
                      data?.LastUpdatedDate
                        ? moment(data?.LastUpdatedDate).format(
                            "MMM-Do-YYYY hh:mm A"
                          )
                        : ""
                    }
                    disabled
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Last Updated By"
                    name="LastUpdatedBy"
                    value={data?.LastUpdatedBy}
                    disabled
                  />
                </Col>

                {isEdit && (
                  <Col className="text-right" md={12}>
                    <FormGroupButton loading={loading} title="Update" />
                  </Col>
                )}
              </Row>
            </form>
            <Row>
              <Col lg={12} md={12}>
                <div
                  className="card-header text-light mb-2"
                  style={{ background: "#d60b11", fontWeight: "bold" }}
                >
                  Comments
                </div>
              </Col>
            </Row>
            <Row>
              {isEdit && (
                <Col md={12} className="text-right">
                  <Button
                    type="button"
                    onClick={() => setShowCommentModal(true)}
                  >
                    Add Comment
                  </Button>
                </Col>
              )}
              {commentsLoading ? (
                <CenteredLoader />
              ) : comments?.length > 0 ? (
                comments.map((comment) => {
                  return (
                    <Col md={12}>
                      <div class="contact-query-comment">
                        <p class="contact-query-comment-text">
                          {comment.Comments}
                        </p>
                        <div class="contact-query-comment-info">
                          <span class="contact-query-comment-date">
                            {moment(comment.CreatedDate).format(
                              "MMM-Do-YYYY hh:mm A"
                            )}
                            {comment?.CreatedBy ? (
                              <span class="contact-query-comment-author">
                                {" "}
                                - {comment?.CreatedBy}
                              </span>
                            ) : null}
                          </span>
                        </div>
                      </div>
                    </Col>
                  )
                })
              ) : null}

              {!commentsLoading && !comments.length && (
                <Col md={12}>
                  <div class="contact-query-comment">
                    <p class="contact-query-comment-text">No Comments yet.</p>
                  </div>
                </Col>
              )}
            </Row>
          </>
        )}

        <AddCommentModal
          showCommentModal={showCommentModal}
          setShowCommentModal={setShowCommentModal}
          clickedRow={clickedRow}
          GetComments={GetComments}
        />
      </ModalBody>
    </Modal>
  )
}

export default EditCustomerQueryModal
