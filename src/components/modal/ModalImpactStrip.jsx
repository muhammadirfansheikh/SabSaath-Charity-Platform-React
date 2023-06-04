import React, { useEffect, useState } from "react"
import {
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
  Modal,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Tooltip,
} from "reactstrap"
import {
  AllowAlphabatic,
  MarketingContentController,
} from "../../utils/CommonMethods.js"
import Swal from "sweetalert2"
import FormGroupButton from "../GeneralComponent/FormGroupButton.jsx"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import { DefaultImgPath } from "utils/Constants.js"
import { baseImageUrl } from "utils/Api.js"

export const ModalImpactStrip = (props) => {
  const UserID = localStorage.getItem("UserId")
  const UserIP = localStorage.getItem("UserIP")
  const isEdit = props.editItem ? true : false

  const initialValues = {
    Content_Title: "",
    Content_Description: "",
    VideoURL: "",
    Content_MediaType: 1,
    Content_Position: "",
    Display: "",
    FileName: "",
    Content_Display: false,
    CommonAttachmentId: 0,
    Content_ID: 0,
    FileGeneratedName: "",
  }
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const [order, setOrder] = useState(order)
  const [state, setState] = useState(initialValues)
  const [imagePreview, setImagePreview] = useState("")
  const [formLoading, setFormLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let values = e.target.value
    if (e.target.getAttribute("isalphabetic") === "true") {
      values = AllowAlphabatic(e.target.value)
    }

    // Check if input is a checkbox
    if (e.target.type === "checkbox") {
      values = e.target.checked
    }

    setState({
      ...state,
      [name]: values,
    })
  }
  function toggle() {
    props.closeNewmodal()
  }
  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)

  useEffect(() => {
    // Create array of  numbers from 1 to maxOrder and set it to state like this [{ Order : 1 }, { Order : 2 }, { Order : 3 }, { Order : 4 }, { Order : 5 }]
    const order = Array.from(Array(props.maxOrder - 1), (_, i) => i + 1).map(
      (i) => {
        return {
          Order: i,
        }
      }
    )
    setOrder(order)
  }, [props.maxOrder])

  useEffect(() => {
    const load = async () => {
      if (props.editItem) {
        setState((prevState) => ({
          ...prevState,
          ...props.editItem,
          Content_ID: props.editItem.Content_ID,
        }))

        setImagePreview({
          file:
            baseImageUrl +
            props.editItem.DocAttachmentPath +
            "/" +
            props.editItem.FileGeneratedName,
          fileName: props.editItem.FileName,
        })
      }
    }
    load()
  }, [])
  async function handleSubmit(e) {
    try {
      e.preventDefault()
      setFormLoading(true)

      if (
        !state.Content_Title ||
        !state.Content_Description ||
        !state.FileName
      ) {
        setFormLoading(false)
        return Swal.fire({
          title: "Error",
          text: "Please fill all fields.",
          icon: "error",
        })
      }
      const OID = isEdit ? 4 : 3
      const { data } = await MarketingContentController(
        OID, //OID
        state.Content_ID, //Id
        props.activeModule.SetupDetailId, //ModuleId
        state.Content_Title, //Title
        state.Content_Description, //Description
        isEdit ? parseInt(state.Content_Position) : props.maxOrder, //Order
        false, // Is Promoted
        state.Content_Display, //Is Displayed
        true, // Media Type
        UserID, //UserId
        UserIP, //userIp
        state.CommonAttachmentId,
        state.FileName,
        state.FileGeneratedName,
        state.VideoURL
      )

      if (data && data.DataSet?.Table && data.DataSet?.Table[0]?.haserror) {
        setFormLoading(false)

        if (
          data.DataSet?.Table[0]?.ERRORMESSAGE.includes(
            "Violation of UNIQUE KEY constraint"
          )
        ) {
          return Swal.fire({
            title: "Error",
            text: "This title already exists.",
            icon: "error",
          })
        } else {
          return Swal.fire({
            title: "Error",
            text: data.DataSet?.Table[0]?.ERRORMESSAGE,
            icon: "error",
          })
        }
      }

      if (data) {
        setFormLoading(false)
        Swal.fire({
          title: "Success",
          text: isEdit ? "Updated Successfully" : "Added Successfully",
          icon: "success",
        })
        props.closeNewmodal()
      }

      setFormLoading(false)
    } catch (error) {
      setFormLoading(false)
      console.log(error)
    }
  }

  const Image_ChangeHandler = async (event) => {
    // GET File Name and Size and Type
    const file = event.target.files[0]
    const fileName = file.name
    const fileType = file.type

    // Show image size in KBs
    const fileSizeInKb = (file.size / 1000).toFixed(2)

    // Restrict file type to image only
    if (!fileType.match(/image.*/)) {
      document.getElementById("image-upload").value = null
      setImagePreview("")
      return Swal.fire({
        title: "Error",
        text: "Only image files are allowed",
        icon: "error",
      })
    }

    // Check image size is less than 200KB or not
    if (fileSizeInKb > 200) {
      document.getElementById("image-upload").value = null
      setImagePreview("")
      return Swal.fire({
        title: "Error",
        text: "Image size should be less than 200KB",
        icon: "error",
      })
    }

    setState({ ...state, FileName: event.target.files[0] })

    setImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
      fileName: fileName,
      fileSize: fileSizeInKb,
      fileType: fileType,
    })
  }

  return (
    <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off" size="lg">
      <form onSubmit={handleSubmit}>
        <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
        <ModalBody>
          <Row form>
            <Col md={4}>
              <>
                <Label>Web Module*</Label>
                <select
                  className="form-control"
                  name="WebModuleId"
                  value={props.activeModule.SetupDetailId}
                  disabled
                >
                  <option value={props.activeModule.SetupDetailId}>
                    {props.activeModule.SetupDetailName}
                  </option>
                </select>
              </>
            </Col>
            {isEdit && (
              <Col md={8}>
                <div className="text-right text-primary text-bold">
                  Content Code : {props?.editItem?.Content_Code}
                </div>
              </Col>
            )}
            <Col md={12}>
              <FormGroup>
                <Label for="">Title*</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="Content_Title"
                  name="Content_Title"
                  value={state.Content_Title}
                  onChange={handleInputChange}
                  required={true}
                  maxLength="60"
                />
              </FormGroup>
            </Col>
            <Col md={12}>
              <FormGroup>
                <Label for="">Number</Label>
                <Input
                  type="text"
                  className="form-control"
                  id="Content_Description"
                  name="Content_Description"
                  value={state.Content_Description}
                  onChange={handleInputChange}
                  // required={true}
                  maxLength="60"
                />
              </FormGroup>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="">Thumbnail/Image*</Label>
                <span className="float-right info-text-modal-ads ">
                  (Limit 200 KB)
                </span>
                <input
                  type="file"
                  className="form-control"
                  id="image-upload"
                  onChange={Image_ChangeHandler}
                  accept="image/*"
                />
              </FormGroup>

              <>
                <div id="imgp">
                  <img
                    src={
                      imagePreview?.file ? imagePreview?.file : DefaultImgPath
                    }
                    style={{
                      height: "130px",
                      width: "1500px",
                      objectFit: "contain",
                      overflow: "hidden",
                      //marginLeft: "-55px",
                    }}
                    alt={""}
                  ></img>
                  <br />
                  {imagePreview?.file && (
                    <p>
                      {" "}
                      <b>
                        {imagePreview?.fileName}{" "}
                        <span className="float-right">
                          {imagePreview?.fileSize &&
                            imagePreview?.fileSize + " KB"}
                        </span>
                      </b>
                    </p>
                  )}{" "}
                </div>
              </>
            </Col>
            <Col lg={6} md={6} sm={12}>
              <Col md={12} className="p-0">
                {!isEdit ? (
                  <>
                    <Label>Order</Label>
                    <select
                      className="form-control"
                      name="Content_Position"
                      value={props.maxOrder}
                      disabled
                    >
                      <option value={props.maxOrder}>{props.maxOrder}</option>
                    </select>
                  </>
                ) : (
                  <>
                    <FormGroupSelect
                      label="Order"
                      name="Content_Position"
                      value={state.Content_Position}
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                      list={order}
                      fieldId="Order"
                      fieldName="Order"
                      disabled={!props.isEdit ? true : false}
                      tooltip={
                        <i
                          className="fa fa-info-circle ml-1"
                          id={"orderTooltip"}
                        ></i>
                      }
                    />
                    <Tooltip
                      placement="top"
                      isOpen={tooltipOpen}
                      target="orderTooltip"
                      toggle={toggleTooltip}
                      autohide={false}
                      style={{
                        backgroundColor: "#fff",
                        color: "#000",
                        border: "1px solid #000",
                        padding: "10px",
                        fontSize: "14px",
                        borderRadius: "4px",
                        boxShadow: "0px 0px 5px #000",
                      }}
                    >
                      <p>Selected order will be swaped with existing one.</p>
                    </Tooltip>
                  </>
                )}
              </Col>
              <Col md={12}>
                <FormGroup>
                  <div className="form-check-inline mt-3 pt-3">
                    <Label className="form-check-Label">
                      <Input
                        type="checkbox"
                        className="form-check-Input"
                        name="Content_Display"
                        checked={state.Content_Display === true ? true : false}
                        onChange={handleInputChange}
                      />
                      Display On Website
                    </Label>
                  </div>
                </FormGroup>
              </Col>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <FormGroupButton title="Save" type="submit" loading={formLoading} />
          <Button color="secondary" size="sm" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default ModalImpactStrip
