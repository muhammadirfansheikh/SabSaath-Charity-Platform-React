import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
} from "reactstrap"
import Swal from "sweetalert2"
import {
  InsertSetupDetail,
  Insert_Blogs,
  TestimonialController,
  UpdateSetupDetail,
} from "utils/CommonMethods"
import { SetupMasterIds } from "utils/Constants"
import { AllowAlphabatic } from "utils/CommonMethods"

const ModalTestimonialList = (props) => {
  var UserId = localStorage.getItem("UserId")
  var UserIp = localStorage.getItem("UserIP")
  const initialValues = {
    OperationID: 0,
    TestimonialsID: 0,
    TestimonialsDesc: "",
    Name: "",
    Caption: "",
    CreatedBy: UserId,
    UserIP: UserIp,
    IsPromoted: 0,
    TestimonialType: false,
    VideoURL: "",
  }
  const [basicValue, setBasicValue] = useState(initialValues)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    let _values = e.target.value

    if (name === "IsPromoted") {
      _values = e.target.checked ? 1 : 0
    }

    setBasicValue({
      ...basicValue,
      [name]: _values,
    })
  }

  function toggle() {
    props.closeNewmodal()
  }
  async function AddUpdateTestimonial(e) {
    try {
      e.preventDefault()
      var testimonialId = props.testimonialId ? props.testimonialId : 0
      let RequestData
      var data
      if (!testimonialId) {
        ///Insert Operation
        data = await TestimonialController(
          2,
          0,
          basicValue.TestimonialsDesc,
          basicValue.Name,
          basicValue.Caption,
          basicValue.UserIP,
          UserId,
          basicValue.VideoURL,
          basicValue.VideoURL ? true : false, // Testimonial Type
          basicValue.IsPromoted ? true : false
        )
        setBasicValue(initialValues)
        setTimeout(() => {
          props.setFetchAgain((x) => x + 1)
        }, 500)
        toggle()
      } else if (testimonialId) {
        basicValue.TestimonialsID = testimonialId
        //   Update Operation
        data = await TestimonialController(
          3,
          basicValue.TestimonialsID,
          basicValue.TestimonialsDesc,
          basicValue.Name,
          basicValue.Caption,
          basicValue.UserIP,
          UserId,
          basicValue.VideoURL,

          basicValue.VideoURL ? true : false, // Testimonial Type

          basicValue.IsPromoted ? true : false
        )
        setTimeout(() => {
          props.setFetchAgain((x) => x + 2)
        }, 500)
        toggle()
      }
    } catch (error) {}
  }
  useEffect(() => {
    if (props?.editData) {
      setBasicValue({
        ...basicValue,
        ...props.editData,
        TestimonialType: props.editData.TestimonialType === 1 ? true : false,
      })
    }
  }, [])
  return (
    <Modal
      isOpen={props.Ismodalshow}
      toggle={toggle}
      size="lg"
      backdrop="static"
    >
      <form onSubmit={AddUpdateTestimonial}>
        <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
        <ModalBody>
          <Row form>
            <Col className="px-1" md="12">
              <FormGroup>
                <Label>Description</Label>
                <Input
                  placeholder="Description"
                  type="textarea"
                  autoComplete="off"
                  name="TestimonialsDesc"
                  value={basicValue.TestimonialsDesc}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="6">
              <FormGroup>
                <Label>Name</Label>
                <Input
                  placeholder="Name"
                  type="text"
                  name="Name"
                  isalphabetic="true"
                  autoComplete="off"
                  value={basicValue.Name}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="6">
              <FormGroup>
                <Label>Caption</Label>
                <Input
                  placeholder="Caption"
                  type="text"
                  name="Caption"
                  isalphabetic="true"
                  autoComplete="off"
                  value={basicValue.Caption}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="12">
              <FormGroup>
                <Label>Video URL</Label>
                <Input
                  placeholder="Video URL"
                  type="text"
                  name="VideoURL"
                  isalphabetic="false"
                  autoComplete="off"
                  value={basicValue.VideoURL}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </Col>
            <Col className="px-1" md="6">
              {/* CheckBox */}
              <FormGroup>
                <div className="d-flex">
                  <div>
                    <Label className="mb-0">Promote : </Label>
                    <Input
                      type="checkbox"
                      name="IsPromoted"
                      checked={basicValue.IsPromoted}
                      onChange={handleInputChange}
                      className="ml-2"
                    />
                  </div>
                </div>
              </FormGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" size="sm">
            Save
          </Button>
          <Button color="secondary" size="sm" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default ModalTestimonialList
