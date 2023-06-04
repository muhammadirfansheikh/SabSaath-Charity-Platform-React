import React, { useState, Link, useEffect } from "react";
import { useHistory } from "react-router-dom";
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
import { getFamilyDetail } from "services/FamilyDetailService.js";
import {
  FindAndGetNewArrayFromArray,
  GetSetupMaster,
  GetUniqueStringValue,
  Insert_AssetDetail,
} from "utils/CommonMethods.js";
import ModalApplHistory from "../../components/modal/ModalApplHistory.js";
import {
  HomeApplainceConst,
  OperationTypeId,
  SetupMasterIds,
} from "../../utils/Constants.js";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api.js";
import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx";
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import FormLoader from "components/GeneralComponent/FormLoader.jsx";
import HomeAppliances from "./AssetsInformation/HomeAppliances.jsx";
import useEditRole from "hooks/useEditRole.js";

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  ApplicantAssetDetailId: 0,
  AssetTypeId: "",
  MortgageLandLordName: "",
  MortgageLandLordContactNo: "",
  MortgageLandLordAddress: "",
  Remarks: "",
  AssetSubTypeId: "",
  AssetStatusId: "",
  Quantity: "0",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const initialAssetValues = {};

const initialSelectLists = {
  AssetTypeList: [],
  AssetSubTypeList: [],
  AssetStatusList: [],
  HomeApplianceList: [],
};

const columns = [
  { field: "AssetTypeName", name: "Asset Type" },
  { field: "AssetSubTypeName", name: "Asset Details" },
  { field: "AssetStatusName", name: "Asset Status" },
  { field: "MortgageLandLordName", name: "Owner Name" },
  { field: "MortgageLandLordContactNo", name: "Contact Number" },
  { field: "MortgageLandLordAddress", name: "Address" },
];

const AssetsInformation = (props) => {
  const [role, appId] = useEditRole();

  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [selectionLists, setSelectionLists] = useState(initialSelectLists);
  const [assetDetailList, setAssetDetailList] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [formHomeLoading, setFormHomeLoading] = useState(false);

  useEffect(() => {
    const fetchApplicantId = () => {
      setFormHomeLoading(true);
      fetchData("Applicant", "Crud_Asset_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
      }).then((result) => {
        if (result?.DataSet?.Table[0]?.HasError > 0) {
          Swal.fire({
            title: "Error",
            text: result.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        }
        setAssetDetailList(result?.DataSet?.Table);
        setSelectionLists({
          ...selectionLists,
          AssetTypeList: result?.DataSet?.Table1,
          AssetSubTypeList: result?.DataSet?.Table2,
          AssetStatusList: result?.DataSet?.Table3,
          HomeApplianceList: result?.DataSet?.Table4,
        });
        setFormHomeLoading(false);
      });
    };
    fetchApplicantId();
  }, []);

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleAssetSubmit = async (e) => {

    e.preventDefault();
    let swelmsg = formFields.ApplicantAssetDetailId === 0 ? 2 : 3;

    if(swelmsg === parseInt(3))
    {
      swelmsg = "Are you sure to edit the record?";
    }
    else
    {
      swelmsg = "Are you sure to add the record?";
    }
    
    Swal.fire({
      customClass: {
        container: "my-swal",
      },
      text: swelmsg,
      icon: "success",
      showCancelButton: true,
      cancelButtonText: `Cancel`,
      cancelButtonColor: "#2f4050",
      confirmButtonText: `Confirm`,
      confirmButtonColor: "#bf1e2e",
    }).then((result) => {
      if (result.isConfirmed)
      {
        requestCall(formFields.ApplicantAssetDetailId === 0 ? 2 : 3, formFields);
        
      }
    })


    
   
  };

  const onEdit = (index) => {
   setFormFields({ ...formFields, ...assetDetailList[index] });
    
  };

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
        requestCall(4, { ...formFields, ...assetDetailList[index] });
      }
    })
    
  };

  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload) => {
    setFormLoading(true);
    fetchData("Applicant", "Crud_Asset_Detail", {
      OperationId: opId,
      ...payload,
    }).then((result) => {
      if (result?.DataSet?.Table[0]?.hasError > 0) {
        Swal.fire({
          title: "Error",
          text: result?.DataSet?.Table[0]?.Message,
          icon: "error",
        });
        setFormLoading(false);
        return;
      }
      Swal.fire({
        title: "Success",
        text: result?.DataSet?.Table[0]?.Message,
        icon: "success",
      });
      setAssetDetailList(result?.DataSet?.Table1);
      setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId });
      setFormLoading(false);
    });
  };

  return (
    <div>
      <FormLoader loading={formHomeLoading}>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Assets Information</h6>
          </CardHeader>
          <CardBody>
            <form onSubmit={handleAssetSubmit}>
              <Row form className="mb-2">
                <Col md={3}>
                  <FormGroupSelect
                    label="Asset Type*"
                    name="AssetTypeId"
                    value={formFields.AssetTypeId}
                    onChange={handleInputChange}
                    list={selectionLists.AssetTypeList}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                    disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupSelect
                    label="Asset Sub Type*"
                    name="AssetSubTypeId"
                    value={formFields.AssetSubTypeId}
                    onChange={handleInputChange}
                    list={selectionLists.AssetSubTypeList.filter(
                      (data) => data.ParentId == formFields.AssetTypeId
                    )}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                    disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupSelect
                    label="Asset Status*"
                    name="AssetStatusId"
                    value={formFields.AssetStatusId}
                    onChange={handleInputChange}
                    list={selectionLists.AssetStatusList}
                    fieldId="SetupDetailId"
                    fieldName="SetupDetailName"
                    required={true}
                    disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupInput
                    label="Quantity/Amount"
                    name="Quantity"
                    value={formFields.Quantity}
                    onChange={handleInputChange}
                    isNumber="true"
                    disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupInput
                    label="Landlord / Owner / Mortgage Name"
                    name="MortgageLandLordName"
                    value={formFields.MortgageLandLordName}
                    onChange={handleInputChange}
                    disabled={role}
                  />
                </Col>
                <Col md={3}>
                  <FormGroupInput
                    label="Landlord / Owner / Mortgage Contact"
                    name="MortgageLandLordContactNo"
                    value={formFields.MortgageLandLordContactNo}
                    onChange={handleInputChange}
                    isNumber="true"
                    maxLength="11"
                    disabled={role}
                  />
                </Col>
                <Col md={6}>
                  <FormGroupInput
                    label="Land Lord Address"
                    name="MortgageLandLordAddress"
                    value={formFields.MortgageLandLordAddress}
                    onChange={handleInputChange}
                    disabled={role}
                  />
                </Col>
                <Col md={12}>
                  <FormGroupInput
                    label="Remarks*"
                    name="Remarks"
                    value={formFields.Remarks}
                    onChange={handleInputChange}
                    disabled={role}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  {role ? null : (
                    <FormGroupButton
                      title="Add Asset Information"
                      type="submit"
                      loading={formLoading}
                      disabled={role}
                    />
                  )}
                </Col>
              </Row>
            </form>

            <Row>
              <Col md={12}>
                <h2 className="h6 pt-3">Asset Details</h2>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroupTable
                  columns={columns}
                  rows={assetDetailList}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  hideAction={role}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </FormLoader>
      <HomeAppliances />
    </div>
  );
};

export default AssetsInformation;
