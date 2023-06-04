import React, { useState, Link, useEffect, Fragment, useRef } from "react"
import { useHistory } from "react-router-dom"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Option,
  Input,
  check,
  Badge,
  Spinner,
} from "reactstrap"
import { Insert_MarketingCaseImages } from "utils/CommonMethods.js"
import getBase64 from "components/useBase64"
import { baseImageUrl, fetchData } from "utils/Api"
import { useParams } from "react-router"
import Swal from "sweetalert2"

// import { Editor } from "react-draft-wysiwyg";
// import { EditorState } from "draft-js";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
// import draftjsToHtml from "draftjs-to-html";
// import { convertToRaw } from "draft-js";

// import Editer from "components/Editer"

import ReactQuill from "react-quill"
import EditorToolbar, { modules, formats } from "../components/EditorToolbar"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect"
import useEditRole from "hooks/useEditRole"
import { SetupMasterIds } from "utils/Constants"

const Marketing = () => {
  const reactQuillRef = useRef()
  const [sourceList, setSourceList] = useState([])
  const [fileName, setFileName] = useState("")
  const [selectedCaseSource, setSelectedCaseSource] = useState(1571)
  const [editorState, setEditorState] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const history = useHistory()
  //console.log(history);
  const { id } = useParams()

  const [body, setBody] = useState("")

  function OnTextChange(e) {
    setGetTitle(e.target.value)
    setPrimaryInfo({
      ...PrimaryInfo,
      [e.target.name]: e.target.value,
    })
  }

  function OnCauseLabelChange(e) {
    setCauseLabel(e.target.value)
    setPrimaryInfo({
      ...PrimaryInfo,
      [e.target.name]: e.target.value,
    })
  }

  function OnTextChange_ShortDesc(e) {
    setGetShortDesc(e.target.value)
  }

  const handleChange_CaseShow = (e) => {
    setCheckCaseShow(e.target.checked)
    // do whatever you want with isChecked value
  }

  const handleChange_CaseoftheDay = (e) => {
    setCheckCaseoftheDay(e.target.checked)
    // do whatever you want with isChecked value
  }

  const [PrimaryInfo, setPrimaryInfo] = useState({
    casetitle: "",
    CaseDesc: "",
    CaseoftheDay: 0,
    CasesShow: 0,
    CauseLabel: "",
  })

  const handleChange_Editor = (e) => {
    // console.log(e)
    setBody(e)
  }

  const [selecteTitleImage, setselecteTitleImage] = useState()
  const [selectCaseImages, setselectCaseImages] = useState([])
  const [selectCaseVideos, setselectCaseVideos] = useState()
  const [tileImagePreview, settileImagePreview] = useState("")
  const [GetDocAttachmentID, SetGetDocAttachmentID] = useState()
  const [IsVideo, setIsVideo] = useState()
  const [CheckCaseAdoption, setCheckCaseAdoption] = useState(true)
  const [CheckCaseShow, setCheckCaseShow] = useState(false)
  const [CheckCaseoftheDay, setCheckCaseoftheDay] = useState(false)
  const [CaseDesc, setCaseDesc] = useState()
  const [VideoURL, setVideoURL] = useState("")
  const [myState, setMyState] = useState("")
  const [GettileImagePreview, setGettileImagePreview] = useState()

  var UserID = localStorage.getItem("UserId")
  var UserIP = localStorage.getItem("UserIP")

  const OnFormSubmit = () => {
    if (GetTitle === "" || GetTitle === null) {
      Swal.fire({
        title: "Error",
        text: "Please Enter Case Title",
        icon: "error",
      })
      return
    }

    if (!CauseLabel) {
      Swal.fire({
        title: "Error",
        text: "Please Enter Cause Label",
        icon: "error",
      })
      return
    }

    if (CaseDesc === "") {
      Swal.fire({
        title: "Error",
        text: "Please Enter Case Desc",
        icon: "error",
      })
      return
    }

    if (!selectedCaseSource) {
      Swal.fire({
        title: "Error",
        text: "Please Select Case Source",
        icon: "error",
      })
      return
    }

    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: "Are you sure to save the record?",
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          setLoading(true)
          let VideoURLa = VideoURL !== "" ? VideoURL : "null"
          let Short = GetShortDesc
          await Insert_MarketingCaseImages(
            id,
            GetTitle,
            CauseLabel,
            body,
            CheckCaseoftheDay,
            CheckCaseShow,
            selecteTitleImage,
            selectCaseVideos,
            UserID,
            UserIP,
            VideoURLa,
            GetShortDesc,
            history,
            GetDocAttachmentID,
            CheckCaseAdoption,
            selectedCaseSource,
            setLoading
          )
        }
      })
      .catch((error) => {
        setLoading(false)

        console.log(error)
        Swal.fire({
          title: "Error",
          text: "Something went wrong",
          icon: "error",
        })
      })
  }

  const TitleImage_changeHandler = async (event) => {
    setselecteTitleImage(event.target.files[0])
  }

  useEffect(async () => {
    OnGetData()
    let preview
    if (selecteTitleImage != undefined) {
      preview = await getBase64(selecteTitleImage)
    }
    settileImagePreview(preview)
  }, [])

  const Videos_changeHandler = (event) => {
    setselectCaseVideos(event.target.files[0])
    setVideoURL("")
  }
  const VideoURl_OnChange = (event) => {
    setVideoURL(event.target.value)
    //selectCaseVideos((event.target.value = null));
  }

  const removeTitleImageImage = (e) => {
    e.preventDefault()
    if (tileImagePreview.length > 0) {
      // tileImagePreview = null;
      settileImagePreview(null)
      setselecteTitleImage(null)
    }
  }
  const handleManu = (e) => {
    console.log(e)
  }
  ////////////////////////////GET DATA///////////////////////////////////////////////////////////////////
  const [GetShortDesc, setGetShortDesc] = useState("")
  const [GetTitle, setGetTitle] = useState()
  const [CauseLabel, setCauseLabel] = useState("")
  async function OnGetData(e) {
    //e.preventDefault();
    try {
      var RequestData = { OperationId: 1, caseid: id }
      const data = await fetchData(
        "Applicant",
        "GetData_MarketingCase",
        RequestData
      )

      if (data?.DataSet?.Table && data?.DataSet?.Table[0]?.haserror) {
        return Swal.fire({
          title: "Error",
          text : data?.DataSet?.Table[0].ERRORMESSAGE,
          icon: "error",
        })
      }

      setFileName(data?.DataSet?.Table1[0]?.FileName || "")
      setSourceList(data?.DataSet?.Table)
      setGetShortDesc(data?.DataSet?.Table1[0]?.ShortDesc)
      setGetTitle(data?.DataSet?.Table1[0]?.CaseTitle)
      setCauseLabel(data?.DataSet?.Table1[0]?.CauseLabel)
      setCheckCaseoftheDay(data.DataSet?.Table1[0]?.IsCaseofthe_Day)
      setCheckCaseShow(data?.DataSet?.Table1[0]?.IsCaseShow)
      setCheckCaseAdoption(data?.DataSet?.Table1[0]?.Adopt ? true : false)
      setSelectedCaseSource(
        data?.DataSet?.Table1[0]?.Source
          ? data?.DataSet?.Table1[0]?.Source === SetupMasterIds.ZamanFoundation
            ? SetupMasterIds.ZamanFoundationNGO
            : data?.DataSet?.Table1[0]?.Source
          : ""
      )
      if (data?.DataSet?.Table1[0]?.DocAttachmentPath !== "/UploadImages") {
        setVideoURL(data?.DataSet?.Table1[0]?.DocAttachmentPath)
      }
      SetGetDocAttachmentID(data?.DataSet?.Table1[0]?.CommonAttachmentId)
      //  localStorage.setItem("GetCaseDesc", data.DataSet?.Table1[0]?.CaseDesc);
      let imageprevew = baseImageUrl + data.DataSet?.Table1[0]?.url
      settileImagePreview(imageprevew)
      setBody(data?.DataSet?.Table1[0]?.CaseDesc)
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something went wrong",
        icon: "error",
      })
    }
  }

  const checkCharacterCount = (event) => {
    console.log(event.key)
    const unprivilegedEditor = reactQuillRef.current.getEditor()
    if (unprivilegedEditor.getLength() > 1300 && event.key !== "Backspace")
      event.preventDefault()
  }

  return (
    <>
      {loading && (
        <div className="marketing-loader">
          <Spinner
            style={{
              width: "10rem",
              height: "10rem",
            }}
            color="danger"
          />
        </div>
      )}
      <div className="content">
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Add New</h6>
          </CardHeader>
          <CardBody>
            <form>
              <Row form>
                <Col md={8}>
                  <FormGroup>
                    <Label for="">Case Title</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="casetitle"
                      name="casetitle"
                      value={GetTitle}
                      onChange={(e) => OnTextChange(e)}
                      required={true}
                      maxLength="60"
                    />
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <div className="form-check-inline mt-3 pt-3">
                      <Label className="form-check-Label">
                        <Input
                          type="checkbox"
                          className="form-check-Input"
                          name="CasesShow"
                          checked={CheckCaseShow}
                          onChange={(e) => handleChange_CaseShow(e)}
                        />
                        Show on WebSite
                      </Label>
                    </div>
                  </FormGroup>
                </Col>

                <Col md={2}>
                  <FormGroup>
                    <div className="form-check-inline mt-3 pt-3">
                      <Label className="form-check-Label">
                        <Input
                          type="checkbox"
                          className="form-check-Input"
                          name="CaseoftheDay"
                          checked={CheckCaseoftheDay}
                          onChange={(e) => handleChange_CaseoftheDay(e)}
                        />
                        Case of the Day
                      </Label>
                    </div>
                  </FormGroup>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Label for="">Cause Label</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="CauseLabel"
                      name="CauseLabel"
                      value={CauseLabel}
                      onChange={(e) => OnCauseLabelChange(e)}
                      required={true}
                      maxLength="60"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={8}>
                  <FormGroup>
                    <Label for="">Short Description</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="ShortDesc"
                      name="ShortDesc"
                      value={GetShortDesc}
                      onChange={(e) => OnTextChange_ShortDesc(e)}
                      maxLength="300"
                    />
                  </FormGroup>
                </Col>
                <Col md={2}>
                  <FormGroupSelect
                    label="Source"
                    name="Source"
                    value={selectedCaseSource}
                    onChange={(e) => setSelectedCaseSource(e.target.value)}
                    list={sourceList}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                  />
                </Col>
                <Col md={2}>
                  <FormGroup>
                    <div className="form-check-inline mt-3 pt-3">
                      <Label className="form-check-Label">
                        <Input
                          type="checkbox"
                          className="form-check-Input"
                          name="CaseAdoption"
                          checked={CheckCaseAdoption}
                          onChange={(e) =>
                            setCheckCaseAdoption(e.target.checked)
                          }
                        />
                        Up for Adoption
                      </Label>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col md={12}>
                  {/* <FormGroup> */}
                  <Label for="CaseDesc" id="CaseDesc">
                    Case Description
                  </Label>
                  <EditorToolbar />
                  <ReactQuill
                    onKeyDown={checkCharacterCount}
                    ref={reactQuillRef}
                    value={body}
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    onChange={handleChange_Editor}
                    maxLength="10"
                  />

                  {/* </FormGroup> */}
                </Col>
              </Row>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label for="">Image</Label>
                    <input
                      type="file"
                      className="form-control"
                      id="TitleImage"
                      onChange={TitleImage_changeHandler}
                    />
                  </FormGroup>
                  <>
                    <div id="imgp">
                      <img
                        src={tileImagePreview}
                        style={{
                          height: "130px",
                          width: "1500px",
                          objectFit: "contain",
                          overflow: "hidden",
                          //marginLeft: "-55px",
                        }}
                        alt={fileName}
                      ></img>
                      <br />
                      <p>
                        {" "}
                        <b>{fileName}</b>
                      </p>
                    </div>
                  </>
                </Col>
              </Row>
              <Row form>
                <Col md={3}>
                  <FormGroup>
                    <Label for="">Case Videos</Label>
                    <Input
                      type="file"
                      className="form-control"
                      id=""
                      onChange={Videos_changeHandler}
                    />
                  </FormGroup>
                </Col>

                <Col md={1}>
                  <FormGroup style={{ textAlign: "center", marginTop: "16px" }}>
                    <Label for=""></Label>
                    <p for="" style={{ marginBottom: "0px", color: "#d60b11" }}>
                      OR
                    </p>
                  </FormGroup>
                </Col>

                <Col md={5}>
                  <FormGroup>
                    {/* <Label for="">OR</Label> */}
                    <Label for="">Video URL</Label>
                    <Input
                      type="text"
                      value={VideoURL}
                      className="form-control"
                      id="VideoURL"
                      name="VideoURL"
                      onChange={(e) => VideoURl_OnChange(e)}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row form className="text-right">
                <Col md={12}>
                  <FormGroup>
                    <Button
                      type="button"
                      onClick={OnFormSubmit}
                      color="primary"
                    >
                      Save
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default Marketing
