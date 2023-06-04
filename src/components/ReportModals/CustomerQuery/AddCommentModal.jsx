import { useState } from "react"
import { useEffect } from "react"
import FormGroupInput from "components/GeneralComponent/FormGroupInput"
import FormGroupButton from "components/GeneralComponent/FormGroupButton"
import {
  ContactUsController,
  dateFormat,
  dateFormatPlaceholder,
  getDate,
} from "utils/CommonMethods"
import DatePicker from "react-datepicker"
import Swal from "sweetalert2"

const {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Spinner,
  Label,
} = require("reactstrap")

const AddCommentModal = ({
  showCommentModal,
  setShowCommentModal,
  clickedRow,
  GetComments,
}) => {
  const initialValues = {
    OperationID: 1,
    CommentDate: getDate(Date.now(), "-", "yyyy/mm/dd"),
    Comment: "",
  }
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(initialValues)

  useEffect(() => {
    if (!showCommentModal) {
      setData(initialValues)
    }
  }, [showCommentModal])

  const handleInputChange = (e) => {
    let { name, value } = e.target
    setData({
      ...data,
      [name]: value,
    })
  }

  const handleDateChange = (event, type) => {
    setData({
      ...data,
      [type]: getDate(event, "-", "yyyy/mm/dd"),
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if (!data.Comment) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter a comment",
      })
    }

    if (data.CommentDate === getDate(Date.now(), "-", "yyyy/mm/dd")) {
      data.CommentDate = null
    }

    setLoading(true)
    try {
      let res = await ContactUsController(
        1,
        clickedRow?.TicketID,
        clickedRow?.FirstName,
        clickedRow?.LastName,
        clickedRow?.Phoneno,
        clickedRow?.Emailaddress,
        clickedRow?.QueryMessage,
        clickedRow?.QueryStatusID,
        clickedRow?.QuerySourceID,
        0,
        clickedRow?.TicketTypeID,
        clickedRow?.TicketAreaID,
        [
          {
            CustomerQueriesID: clickedRow?.TicketID,
            ID: null,
            CommentDate: data?.CommentDate,
            Comments: data?.Comment,
          },
        ],
        clickedRow?.TransactionLink,
        null,
        clickedRow?.CityID
      )
      if (res.Response === true) {
        if (res.DataSet.Table[0].haserror === 1) {
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
            text: "Submitted Successfully.",
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              setShowCommentModal(false)
              GetComments()
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
            setShowCommentModal(false)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal
      isOpen={showCommentModal}
      toggle={() => {
        setShowCommentModal(false)
        setData({
          OperationID: 1,
          CommentDate: getDate(Date.now(), "-", "yyyy/mm/dd"),
          Comment: "",
        })
      }}
      size="md"
      backdrop="static"
    >
      <ModalHeader toggle={() => setShowCommentModal(false)}>
        Add Comment
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
                  <Label for="InputDate">Date</Label>
                  <DatePicker
                    value={getDate(data.CommentDate, "/")}
                    dateFormat={dateFormat}
                    onChange={(e) => handleDateChange(e, "CommentDate")}
                    className="form-control"
                    name="CommentDate"
                    placeholderText={dateFormatPlaceholder}
                    showYearDropdown
                  />
                </Col>
                <Col md={12}>
                  <FormGroupInput
                    label="Comment"
                    name="Comment"
                    value={data?.Comment}
                    onChange={handleInputChange}
                    required
                  />
                </Col>

                <Col className="text-right" md={12}>
                  <FormGroupButton loading={loading} title="Add Comment" />
                </Col>
              </Row>
            </form>
          </>
        )}
      </ModalBody>
    </Modal>
  )
}

export default AddCommentModal
