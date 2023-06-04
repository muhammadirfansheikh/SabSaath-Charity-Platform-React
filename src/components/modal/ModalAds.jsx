import React, { useEffect, useRef, useState } from "react"
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
  NGOController,
} from "../../utils/CommonMethods.js"
import Swal from "sweetalert2"
import FormGroupButton from "../GeneralComponent/FormGroupButton.jsx"
import QuillToolbar, { formats, modules } from "components/EditorToolbar.js"
import ReactQuill from "react-quill"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import { DefaultImgPath } from "utils/Constants.js"
import { baseImageUrl } from "utils/Api.js"

const contentType = [
  {
    ContentType: 0,
    ContentName: "Text",
  },
  {
    ContentType: 1,
    ContentName: "Video",
  },
  {
    ContentType: 2,
    ContentName: "Image",
  },
]

export const ModalAds = (props) => {
  const reactQuillRef = useRef()
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
    Content_Length: 0,
  }
  const [tooltipOpen, setTooltipOpen] = useState(false)

  const [order, setOrder] = useState(order)
  const [state, setState] = useState(initialValues)
  const [body, setBody] = useState("")
  const [selectedVideo, setSelectedVideo] = useState("")
  const [selectedImage, setSelectedImage] = useState("")
  const [imagePreview, setImagePreview] = useState("")
  const [videoPreview, setVideoPreview] = useState("")
  const [formLoading, setFormLoading] = useState(false)
  const [descriptionLength, setDescriptionLength] = useState(false)
  const isText = state.Content_MediaType == 0
  const isVideo = isEdit
    ? props.editItem?.Content_MediaType && props.editItem?.VideoURL && true
    : state.Content_MediaType == 1
  const isImage = isEdit
    ? props.editItem?.Content_MediaType && !props.editItem?.VideoURL && true
    : state.Content_MediaType == 2
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
        setBody(props.editItem.Content_Description)
        // Extract video name from VideoURL and split it by _ remove the first element and join it again
        const videoName = props.editItem.VideoURL.split("_").slice(1).join("_")
        setVideoPreview({
          fileName: videoName,
        })
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
    setFormLoading(true)
    try {
      e.preventDefault()
      if (isText) {
        if (
          state?.Content_Length < 6 ||
          !state.Content_Title ||
          (!isEdit && descriptionLength < 6)
        ) {
          setFormLoading(false)

          if (!state.Content_Title) {
            return Swal.fire({
              title: "Error",
              text: "Title is required.",
              icon: "error",
            })
          }

          if (!state?.Content_Length || state.Content_Length == 1) {
            return Swal.fire({
              title: "Error",
              text: "Description is required.",
              icon: "error",
            })
          }

          if (descriptionLength < 6 || state?.Content_Length < 6) {
            return Swal.fire({
              title: "Error",
              text: "Description is too short.",
              icon: "error",
            })
          }

          return Swal.fire({
            title: "Error",
            text: "Please fill all fields.",
            icon: "error",
          })
        }
      }

      if (isVideo) {
        if (!state.Content_Title || !state.VideoURL || !state.FileName) {
          setFormLoading(false)

          if (!state.Content_Title) {
            return Swal.fire({
              title: "Error",
              text: "Title is required.",
              icon: "error",
            })
          }

          if (!state.VideoURL) {
            return Swal.fire({
              title: "Error",
              text: "Video is required.",
              icon: "error",
            })
          }

          if (!state.FileName) {
            return Swal.fire({
              title: "Error",
              text: "Video is required.",
              icon: "error",
            })
          }

          return Swal.fire({
            title: "Error",
            text: "Please fill all fields.",
            icon: "error",
          })
        }
      }

      if (isImage) {
        if (!state.Content_Title || !state.FileName) {
          setFormLoading(false)

          if (!state.Content_Title) {
            return Swal.fire({
              title: "Error",
              text: "Title is required.",
              icon: "error",
            })
          }

          if (!state.FileName) {
            return Swal.fire({
              title: "Error",
              text: "Image is required.",
              icon: "error",
            })
          }

          return Swal.fire({
            title: "Error",
            text: "Please fill all fields.",
            icon: "error",
          })
        }
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
        state.Content_MediaType == 0 ? false : true, // Media Type
        UserID, //UserId
        UserIP, //userIp
        state.CommonAttachmentId ? state.CommonAttachmentId : 0,
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

  const checkCharacterCount = (event) => {
    const unprivilegedEditor = reactQuillRef.current.getEditor()
    setDescriptionLength(unprivilegedEditor.getLength())
    if (unprivilegedEditor.getLength() > 1300 && event.key !== "Backspace")
      event.preventDefault()
  }

  const Videos_changeHandler = (event) => {
    const file = event.target.files[0]
    const fileName = file.name
    const fileType = file.type
    const fileSizeInKb = file.size / 1000
    const fileSize = (fileSizeInKb / 1000).toFixed(2)

    // Restrict file type to video only
    if (!fileType.match(/video.*/)) {
      document.getElementById("video-upload").value = null
      setVideoPreview("")
      return Swal.fire({
        title: "Error",
        text: "Only video files are allowed",
        icon: "error",
      })
    }

    // Check video size is less than 10MB
    if (event.target.files[0].size > 10000000) {
      document.getElementById("video-upload").value = null
      return Swal.fire({
        title: "Error",
        text: "Video size should be less than 10MB",
        icon: "error",
      })
    }
    setState({ ...state, VideoURL: event.target.files[0] })
    setSelectedVideo(event.target.files[0])
    setVideoPreview({
      file: URL.createObjectURL(event.target.files[0]),
      fileName,
      fileSize,
      fileType,
    })
  }

  const Image_ChangeHandler = async (event) => {
    // GET File Name and Size and Type
    const file = event.target.files[0]
    const fileName = file.name
    const fileType = file.type

    // Show image size in KBs
    const fileSizeInKb = file.size / 1000
    const fileSize = (fileSizeInKb / 1000).toFixed(2)

    // Check image Dimension and must be standard Thumbnail size 1920x1080
    const image = new Image()
    image.src = URL.createObjectURL(event.target.files[0])
    image.onload = function () {
      const width = image.naturalWidth
      const height = image.naturalHeight
      URL.revokeObjectURL(image.src)
      if (width !== 1920 || height !== 1080) {
        document.getElementById("image-upload").value = null
        setImagePreview("")
        return Swal.fire({
          title: "Error",
          text: "Image dimension should be 1920x1080",
          icon: "error",
        })
      }
    }

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

    // Check image size is less than 1MB
    if (event.target.files[0].size > 1000000) {
      document.getElementById("image-upload").value = null
      return Swal.fire({
        title: "Error",
        text: "Image size should be less than 1MB",
        icon: "error",
      })
    }

    setState({ ...state, FileName: event.target.files[0] })
    // if (isImage) {
    // }
    // if (isVideo) {
    //   setState({ ...state, FileName: event.target.files[0] })
    // }

    setSelectedImage(event.target.files[0])
    setImagePreview({
      file: URL.createObjectURL(event.target.files[0]),
      fileName: fileName,
      fileSize: fileSize,
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
                <Label for="">Content Title*</Label>
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
            {isText && (
              <Col md={12}>
                {/* <FormGroup> */}
                <Label for="CaseDesc" id="CaseDesc">
                  Content Description{isText ? "*" : ""}
                </Label>
                <QuillToolbar />
                <ReactQuill
                  onKeyDown={checkCharacterCount}
                  ref={reactQuillRef}
                  value={body}
                  theme="snow"
                  modules={modules}
                  formats={formats}
                  onChange={(value, a, b, c) => {
                    setBody(value)
                    setState((prevState) => ({
                      ...prevState,
                      Content_Description: value,
                      Content_Length: c.getLength(),
                    }))
                  }}
                  onChangeSelection={(range, source, editor) => {
                    if (editor?.getText()?.length > 1301) {
                      setBody(editor.getText().substring(0, 1300))
                      setState((prevState) => ({
                        ...prevState,
                        Content_Description: editor
                          .getText()
                          .substring(0, 1300),
                        Content_Length: editor.getText().length,
                      }))
                      return Swal.fire({
                        title: "Error",
                        text: "Content Description should be less than 1300 characters",
                        icon: "error",
                      })
                    } else {
                      setState((prevState) => ({
                        ...prevState,
                        Content_Description: editor.getHTML(),
                        Content_Length: editor.getText().length,
                      }))
                    }
                  }}
                  onBlur={(range, source, editor) => {
                    if (editor?.getText()?.length > 1301) {
                      Swal.fire({
                        title: "Error",
                        text: "Content Description should be less than 1300 characters",
                        icon: "error",
                      })
                      setBody(null)
                      setState((prevState) => ({
                        ...prevState,
                        Content_Description: null,
                        Content_Length: 0,
                      }))
                    } else {
                      setBody(editor.getHTML())
                      setState((prevState) => ({
                        ...prevState,
                        Content_Description: editor.getHTML(),
                        Content_Length: editor.getText().length,
                      }))
                    }
                  }}
                />
              </Col>
            )}
            {(isVideo || !isEdit) && (
              <Col lg={4} md={3} sm={12}>
                {!isEdit && (
                  <Col md={12} className="p-0">
                    <FormGroupSelect
                      label="Content Type*"
                      name="Content_MediaType"
                      value={state.Content_MediaType}
                      onChange={(e) => {
                        handleInputChange(e)
                      }}
                      list={contentType}
                      fieldId="ContentType"
                      fieldName="ContentName"
                      required={true}
                    />
                  </Col>
                )}
                {isVideo && (
                  <Col md={12} className="p-0">
                    <FormGroup>
                      <Label for="">Video File*</Label>
                      <span className="float-right info-text-modal-ads ">
                        (Limit 10 MB)
                      </span>
                      <Input
                        type="file"
                        className="form-control"
                        id="video-upload"
                        onChange={Videos_changeHandler}
                        accept="video/mp4,video/x-m4v,video/*"
                      />
                      {videoPreview?.fileName && (
                        <p>
                          {" "}
                          <b>
                            {videoPreview?.fileName}{" "}
                            <span className="float-right">
                              {videoPreview?.fileSize &&
                                videoPreview?.fileSize + " MB"}
                            </span>
                          </b>
                        </p>
                      )}{" "}
                    </FormGroup>
                  </Col>
                )}
              </Col>
            )}
            {!isText && (
              <Col lg={4} md={3} sm={12}>
                <FormGroup>
                  <Label for="">Thumbnail/Image*</Label>
                  <span className="float-right info-text-modal-ads ">
                    (Limit 1 MB)
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
                              imagePreview?.fileSize + " MB"}
                          </span>
                        </b>
                      </p>
                    )}{" "}
                  </div>
                </>
              </Col>
            )}
            <Col lg={4} md={3} sm={12}>
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

export default ModalAds
