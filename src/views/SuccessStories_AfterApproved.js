import React, { useState, Link, useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Option,
  Input,
  } from "reactstrap";
import { Insert_SceessStories_AfterApproved } from "utils/CommonMethods.js";
// import  Editer from '../Editer.js'
import getBase64 from "components/useBase64";
import { baseImageUrl, fetchData } from "utils/Api";
import Editer from "components/Editer";
import { useParams } from "react-router";
import Editor_Success from "components/Editor_Success";
import Swal from "sweetalert2";
// import Editer from "components/Editer"
import ReactQuill from "react-quill";
import EditorToolbar_S , { modules, formats } from "../components/EditorToolbar_S";


const SuccessStories_AfterApproved = (props) => {
  
  const history = useHistory();
  //console.log(history);
  const { id } = useParams(); //InvestigationID
  function OnTextChange(e) {
    setGetTitle(e.target.value);
    setPrimaryInfo({
      ...PrimaryInfo,
      [e.target.name]: e.target.value,
    });
  }
  const[body , setBody] = useState("");
  const [selecteTitleImage, setselecteTitleImage] = useState();
  const [CaseDesc1, SetCaseDesc] = useState();
  const [CheckCaseShow, setCheckCaseShow] = useState(false);
  const [tileImagePreview, settileImagePreview] = useState("");
  const [GetDocAttachmentID, SetGetDocAttachmentID] = useState();

  function OnTextChange_ShortDesc(e) {
    setGetShortDesc(e.target.value);
  }
  const handleChange_Editor = (e) => {
    setBody(e);
    // do whatever you want with isChecked value
  };

  // function OnTextChange_CaseDesc(e) {
  //   SetCaseDesc(e.target.value);
  // }

  const [PrimaryInfo, setPrimaryInfo] = useState({
    casetitle: "",
    CaseDesc: "",
    ShortDesc : "",
  });

  //const [GettileImagePreview, setGettileImagePreview] = useState();

  var UserID = localStorage.getItem("UserId");
  var UserIP = localStorage.getItem("UserIP");

  function OnFormSubmit(e) {
    if(GetTitle === "")
  {
    Swal.fire({
      title: "Error",
      text: "Please Enter Title",
      icon: "error",
    });
    return;
  }

  if(GetShortDesc === "")
  {
    Swal.fire({
      title: "Error",
      text: "Please Enter Short Desc",
      icon: "error",
    });
    return;
  }

  if(CaseDesc1 === "")
  {
    Swal.fire({
      title: "Error",
      text: "Please Enter Desc",
      icon: "error",
    });
    return;
  }

    e.preventDefault();
  
    //var CaseDesc_L = localStorage.getItem("CaseDesc");
    
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
    }).then((result) => {
      if (result.isConfirmed)
      {
       
      
  
    var data = Insert_SceessStories_AfterApproved(id, GetTitle ,body,selecteTitleImage,UserID, UserIP,GetShortDesc , history , CheckCaseShow);
  }
})
  }

  const TitleImage_changeHandler = async (event) => {
    setselecteTitleImage(event.target.files[0]);
  };

  const handleChange_CaseShow = (e) => {
    setCheckCaseShow(e.target.checked);
    // do whatever you want with isChecked value
  };
  useEffect(async () => {
    OnGetData();
    let preview = await getBase64(selecteTitleImage);
    settileImagePreview(preview);
  }, []);

  const removeTitleImageImage = (e) => {
    e.preventDefault();
    if (tileImagePreview.length > 0) {
       settileImagePreview(null);
      setselecteTitleImage(null);
    }
  };

  ////////////////////////////GET DATA///////////////////////////////////////////////////////////////////
  const [GetShortDesc, setGetShortDesc] = useState("");
  const [GetTitle, setGetTitle] = useState();

  async function OnGetData(e) {
    //e.preventDefault();
    try {
      
    
    var RequestData = { OperationId: 1, caseid: id };
    const data = await fetchData(
      "WebSite",
      "GetDataset_SuccessStories",
      RequestData
    );
  
   // console.log(data?.DataSet?.Table[0].SuccessStory_ShortDesc);
   
    setGetShortDesc(data?.DataSet?.Table[0].SuccessStory_ShortDesc);
    setGetTitle(data?.DataSet?.Table[0].CaseTitle);
    //SetGetDocAttachmentID(data?.data[0].CommonAttachmentId);
    setCheckCaseShow(data?.DataSet?.Table[0].IsSuccessStory_Show);
    setBody(data?.DataSet?.Table[0].CaseDesc)
    //localStorage.setItem("GetCaseDesc", data?.data[0].CaseDesc);
    let imageprevew = baseImageUrl + data?.DataSet?.Table[0].url;
    settileImagePreview(imageprevew);
  } 
  catch (error)
   {
  return;    
  }
  }
  ////////////////////////////////////

  return (
    <>
      <div className="content">
         <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Add New</h6>
          </CardHeader>
          <CardBody>
            <form onSubmit={OnFormSubmit}>
              <Row form>
              <Col md={8}>
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

                <Col md={8}>
                  <FormGroup>
                    <Label for="">Success Story Title</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="casetitle"
                      name="casetitle"
                      value={GetTitle}
                      onChange={(e) => OnTextChange(e)}
                      required={true}
                      maxLength="80"
                    />
                  </FormGroup>
                </Col>
               </Row>
              <Row form>
                <Col md={8}>
                  <FormGroup>
                    <Label for="">Success Story Short Desc</Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="ShortDesc"
                      name="ShortDesc"
                      value={GetShortDesc}
                      onChange={(e) => OnTextChange_ShortDesc(e)}
                      required={true}
                      maxLength="100"
                    />
                  </FormGroup>
                </Col>

              </Row>
              <Row form>
              <Col md={12}>
                  {/* <FormGroup> */}
                    <Label for="CaseDesc" id="CaseDesc1">
                      Case Description
                    </Label>
                    {/* <EditorToolbar_S/> */}
                    <ReactQuill
                    value={body}
                    //className="ql-toolbar ql-snow"
                    //theme="snow"
                    //modules={modules}
                    //formats={formats}
                       //editorState={editorState}
                      //onEditorStateChange={setEditorState}
                      onChange={handleChange_Editor}
                      //onChange={(e) => handleChange_Editor(e)}
                 //     required={true}
                  />
                  
                  {/* </FormGroup> */}
                </Col>
                {/* <Col md={12}>
                  <FormGroup>
                    <Label for="CaseDesc" id="CaseDesc">
                      Success Case Description
                    </Label>
                    <Input
                    
                      type="textarea"
                      className="form-control"
                      id="CaseDesc"
                      name="CaseDesc"
                      value={CaseDesc1}
                      onChange={(e) => OnTextChange_CaseDesc(e)}
                      required={true}
                      
                    />
                   </FormGroup>
                </Col> */}
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
                    {/* <button
                      style={{
                        position: "absolute",
                        display: tileImagePreview ? "block" : "none",
                      }}
                      onClick={(e) => removeTitleImageImage(e)}
                    >
                      X
                    </button> */}
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
                      ></img>
                    </div>
                  </>
                </Col>
              </Row>
              <Row form>
                </Row>
              <Row form className="text-right">
                <Col md={12}>
                  <FormGroup>
                    <Button color="primary">Save</Button>
                  </FormGroup>
                </Col>
              </Row>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default SuccessStories_AfterApproved;
