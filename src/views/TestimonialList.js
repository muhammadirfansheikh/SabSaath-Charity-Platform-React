import React, { useState, useEffect } from "react"
import ModalBlogList from "components/modal/ModalBlogList"
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import ModalTestimonialList from "components/modal/ModalTestimonailList"
import {
  TestimonialController,
} from "utils/CommonMethods"
import Swal from "sweetalert2"

const TestimonailList = (props) => {
    var UserId = localStorage.getItem("UserId");
    var UserIp = localStorage.getItem("UserIP");
  const initialValues = {
    Title: "",
    Desc: "",
    OperationID: 1,
    TestimonialsID: 0,
    TestimonialsDesc: "",
    Name: "",
    caption: "",
    UserIP: UserIp,
  }

//   OperationID: 0,
//   TestimonialsID: 0,
//   Title: "",
//   TestimonialsDesc: "",
//   Name: "",
//   caption: "",
//   isActive: 0,
//   CreatedBy: UserId,
//   UserIP: UserIp,


  const [searchValues, setSearchValues] = useState(initialValues)
  const [testEditId, setTestEditId] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [testimonials, setTestimonials] = useState([])
  const [fetchAgain, setFetchAgain] = useState(0)
  const [editTestimonials, setEditTestimonials] = useState([])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setSearchValues({
      ...searchValues,
      [name]: value,
    })
  }
  const handleSearchClick = async (e) => {
    e.preventDefault()
    try {
      var data = await TestimonailList(searchValues)
      if (data != null) {
        if (data.status === 200 && data.data != null > 0) {
          setTestimonials(data.data.Table)
          return data
        } else {
          return []
        }
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
  const handleCancelClick = async (e) => {
    e.preventDefault()
    setSearchValues(initialValues)
    TestimonailList(initialValues)
  }
  const openNewmodal = (testimonailId) => {
    setTestEditId(testimonailId)
    setOpenModal(true)
  }

  const closeNewmodal = () => {
    setTestEditId(0)
    setOpenModal(false)
  }
  useEffect(() => {
    TestimonailList()
  }, [fetchAgain])
  const TestimonailList = async (searchValues = initialValues) => {
    try {
      //   var data = await Testimonial_List(searchValues)
      var data = await TestimonialController(
        1,
        0,
        searchValues.TestimonialsDesc,
        searchValues.Name,
        null,
        null,
        UserId,
        null,
        null,
        null
      )
      if (data) {
        setTestimonials(data)
        return data
      }
        else {
          return []
        }
    } catch (error) {
      return []
    }
  }
  const onEdit = ({ data }) => {
    var testimonialId = data.TestimonialsID
    setEditTestimonials(data)
    openNewmodal(testimonialId)
  }

  const onDelete = async ({ testimonialId }) => {
    var OperationID = 4
    var deleteData = await TestimonialController(
        OperationID,
        testimonialId,
      )
    Swal.fire({
      title: "success",
      text: "Deleted Successfully",
      icon: "success",
    }).then((result) => {
      if (result.isDismissed) {
        setTimeout(() => {
          TestimonailList()
        }, 500)
      } else if (result.isConfirmed) {
        setTimeout(() => {
          TestimonailList()
        }, 500)
      }
    })
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col lg={12} md={12}>
            <Card className="card-user">
              <CardBody>
                <Form>
                  <Row form>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Name</Label>
                        <Input
                          type="text"
                          name="Name"
                          onChange={handleInputChange}
                          value={searchValues.Name}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Testimonail Description</Label>
                        <Input
                          type="text"
                          name="TestimonialsDesc"
                          onChange={handleInputChange}
                          value={searchValues.TestimonialsDesc}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={12} className="text-right">
                      <Button
                        color="primary"
                        size="sm"
                        className="mr-2"
                        onClick={handleSearchClick}
                      >
                        Search
                      </Button>
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={handleCancelClick}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col lg={6} md={6}>
                    Testimonial List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button
                      color="primary2"
                      size="sm"
                      className="m-0"
                      // onClick={() => openNewmodal({ testimonailId: 0 })}
                      onClick={(e) => onEdit({ data: {} })}
                    >
                      Add New
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Description</th>
                      <th>Name</th>
                      <th>Caption</th>
                      <th>Type</th>

                      <th className="text-center" style={{ width: 150 }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials &&
                      testimonials.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.TestimonialsDesc}</td>
                          <td>{item.Name}</td>
                          <td>{item.Caption}</td>
                          <td>{item.TestimonialType ? "Video" : "Text"  }</td>
                          <td className="text-center">
                            <Button
                              color="primary"
                              className="btn-circle"
                              size="sm"
                              onClick={(e) => onEdit({ data: item })}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i>
                            </Button>
                            <Button
                              color="danger"
                              className="btn-circle"
                              size="sm"
                              onClick={() =>
                                onDelete({ testimonialId: item.TestimonialsID })
                              }
                            >
                              <i className="nc-icon nc-simple-remove"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {openModal && (
          <ModalTestimonialList
            {...props}
            HeaderText="Add/Edit Testimonials"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            testimonialId={testEditId}
            setFetchAgain={setFetchAgain}
            editData={editTestimonials}
          />
        )}
      </div>
    </>
  )
}

export default TestimonailList
