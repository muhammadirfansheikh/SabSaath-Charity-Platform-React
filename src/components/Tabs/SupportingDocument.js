import React, { useState, Link, useEffect } from "react";

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
} from "reactstrap";
import * as api from "../../utils/Api.js";
import { SetupMasterIds } from "../../utils/Constants.js";
import { GetSetupMaster } from "../../utils/CommonMethods.js";
import FormGroupTable from "components/GeneralComponent/FormGroupTable";
import Swal from "sweetalert2";
import { saveAs } from "file-saver";
import useEditRole from "hooks/useEditRole.js";
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox.jsx";

const SupportingDocument = (props) => {
  var UserId = localStorage.getItem("UserId");
  var UserIp = localStorage.getItem("UserIP");
  const [role, appId] = useEditRole();

  const caseId = appId;

  const columns = [
    {
      field: "DocType",
      name: "Doc Type",
    },
    {
      field: "OrignalFileName",
      name: "File Upload Name",
    },
  ];

  let initialValues = {
    DocType: 0,
    DocTypeName: "",
    Doc: "",
    DocPath: "",
  };

  const [values, setValues] = useState(initialValues);
  const [file, setFile] = useState([]);
  const [docTypeDDL, setDocTypeDDL] = useState([]);
  const [listData, setListData] = useState([]);
  const [selectionList, setSelectionList] = useState([]);
  const [chkList, setChkList] = useState([]);

  const onDelete = (index) => {

    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: "Are you sure to delete the record?",
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then((result) => {
      if (result.isConfirmed)
      {
       
       let ApplicantCase_SupportDocId = listData[index].ApplicantCase_SupportDocId;
    api
      .postRecordImage(
        `applicant`,
        `UploadSupportingDoc?Docid=${ApplicantCase_SupportDocId}&DocTypeId=${values.DocType}&CaseId=${caseId}&UserId=${UserId}&OperationId=4&UserIP=${UserIp}&FileName=${values.Doc}`,
        formData
      )
      .then((result) => {
        if (result?.data?.DataSet?.Table?.HasError > 0) {
          Swal.fire({
            title: "Error",
            text: result.data.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        } else {
          Swal.fire({
            title: "Success",
            text: result?.data.DataSet?.Table[0]?.Message,
            icon: "success",
          });
        }

        fetchData();
      });
    }
  })
  };

  const onDownload = (index) => {
    let docUrl = api.baseImageUrl + listData[index].url;

    saveAs(docUrl, listData[index].OrignalFileName);
  };

  const onChangeHandler = (event) => {
    let { name, value } = event.target;
    if (event.target.name === "file") {
      setFile(event.target.files);
    } else if (event.target.name === "DocType") {
      setValues({
        ...values,
        [name]: value,
        [name + "Name"]: event.target.options[event.target.selectedIndex].text,
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const GetDocumentType = async (e) => {
    var docTypeValues = await GetSetupMaster(
      SetupMasterIds.DocumentSubTypes,
      0,
      "",
      0
    );
    setDocTypeDDL(docTypeValues.data);
  };

  React.useEffect(() => {
    GetDocumentType();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const bindTableRows = (rowData) => {
    let finalRow = [];
    rowData.forEach((row) => {
      finalRow.push({
        ...row,
        downloadfile: (
          <Button
            size="sm"
            onClick={() => saveAs(`${api.baseImageUrl}${row.url}`)}
          >
            {/* //, row.FileGeneratedName)}> */}
            Download
          </Button>
        ),
      });
    });

    return finalRow;
  };

  const fetchData = async () => {
    api
      .postRecordImage(
        `applicant`,
        `UploadSupportingDoc?Docid=0&DocTypeId=${values.DocType}&CaseId=${caseId}&UserId=${UserId}&OperationId=1&UserIP=${UserIp}&FileName=${values.Doc}`,
        formData
      )
      .then((result) => {
        if (result?.data?.DataSet?.Table?.HasError > 0) {
          Swal.fire({
            title: "Error",
            text: result.data.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        }

        setListData(result?.data?.DataSet?.Table);

        setChkList([...result?.data?.DataSet?.Table1]);
      });
  };

  const formData = new FormData();
  const uploadFile = async (e) => {
    if(values.DocType === 0){
      Swal.fire({
        title: "Error",
        text: "Please Add Document Type",
        icon: "error",
      });
    }
    else if(values.Doc === ""){
      Swal.fire({
        title: "Error",
        text: "Please Add File Name",
        icon: "error",
      });
    }
    else if(file.length === 0){ 
      Swal.fire({
        title: "Error",
        text: "Please Add File",
        icon: "error",
      });
    }
    else{
    for (let i = 0; i < file.length; i++) {
      formData.append(`files`, file[i]);
    }
    try {

      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        text: "Are you sure to add the record?",
        icon: "success",
        showCancelButton: true,
        cancelButtonText: `Cancel`,
        cancelButtonColor: "#2f4050",
        confirmButtonText: `Confirm`,
        confirmButtonColor: "#bf1e2e",
      }).then((result) => {
        if (result.isConfirmed)
        {
         
      

      api
        .postRecordImage(
          `applicant`,
          `UploadSupportingDoc?Docid=0&DocTypeId=${values.DocType}&CaseId=${caseId}&UserId=${UserId}&OperationId=2&UserIP=${UserIp}&FileName=${values.Doc}`,
          formData
        )
        .then((result) => {
          if (result?.DataSet?.Table[0]?.HasError > 0) {
            Swal.fire({
              title: "Error",
              text: result.DataSet.Table[0].Message,
              icon: "error",
            });
            return;
          } else {
            Swal.fire({
              title: "Success",
              text: result?.data.DataSet?.Table[0]?.Message,
              icon: "success",
            });
          }
          setListData(result.data.DataSet.Table1);
          setChkList([...result?.data?.DataSet?.Table2]);
        });
      }
    })
    } catch (ex) { 
    }
  }
  };

  const handleCheckList = (e, index) => {
    chkList[index].IsChecked = e.target.checked;
    setChkList([...chkList]);
  };

  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">
            Supporting Document Check List
          </h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              {chkList.map((item, index) => (
                <Col md={2} key={index}>
                  <FormGroup>
                    <div className="form-check-inline mt-3">
                      <label className="form-check-Label">
                        <input
                          type="checkbox"
                          name="IsChecked"
                          checked={item.IsChecked}
                          onChange={(e) => handleCheckList(e, index)}
                          disabled={true}
                        />
                        {item.DocType}
                      </label>
                    </div>
                  </FormGroup>
                </Col>
              ))}
            </Row>
          </Form>
        </CardBody>
      </Card>

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Supporting Document</h6>
        </CardHeader>
        <CardBody>
          <form>
            <Row >
              <Col md={3}>
                <FormGroup>
                  <Label for="">Document Type*</Label>
                  <Input
                    id="ddlDocType"
                    name="DocType"
                    type="select"
                    onChange={onChangeHandler}
                    value={values.DocType}
                    disabled={role}
                    required={true}
                  >
                    <option value="">
                      Select
                    </option>
                    {docTypeDDL.map((item, key) =>
                      item.SetupDetailId !== parseInt(docTypeDDL) ? (
                        <option
                          key={item.SetupDetailName}
                          value={item.SetupDetailId}
                        >
                          {item.SetupDetailName}
                        </option>
                      ) : (
                        ""
                      )
                    )}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">File Name*</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="Doc"
                    name="Doc"
                    onChange={onChangeHandler}
                    value={values.Doc}
                    disabled={role}
                    required={true}
                  />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="">Upload Attachment*</Label>
                  <Input
                    type="file"
                    multiple
                    className="form-control"
                    id="file"
                    name="file"
                    onChange={onChangeHandler}
                    disabled={role}
                    required={true}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form className="text-right">
              <Col md={12}>
                <FormGroup>
                  {role ? null : (
                    <Button color="primary" onClick={uploadFile}>
                      Upload Document
                    </Button>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </form>
          <Row form>
            <Col md={12}>
              <h2 className="h6">Details</h2>
            </Col>
          </Row>
          <Row form>
            <Col md={12}>
              <FormGroupTable
                columns={columns}
                rows={listData}
                onDelete={role ? null :  onDelete}
                onDownload={onDownload}
                // hideAction={role}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};
export default SupportingDocument;
