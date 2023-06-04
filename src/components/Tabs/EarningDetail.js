import React, { useEffect, useState } from "react";
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
import ModalApplHistory from "../../components/modal/ModalApplHistory.js";
import { fetchData } from "utils/Api.js";
import Swal from "sweetalert2";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox.jsx";
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import { getFamilyDetail } from "services/FamilyDetailService.js";
import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx";
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import useEditRole from "hooks/useEditRole.js";
import { SetupMasterIds } from "utils/Constants.js";
import { GetSetupMaster } from "utils/CommonMethods.js";

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  ApplicantFamily_JobExperienceDetailId: 0,
  ApplicantFamilyDetailId: "",
  JobStatusId: 0,
  EarningAmount: "",
  LastCompanyName: "",
  Remarks: "",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const EarningDetails = (props) => {
  const [role, appId] = useEditRole();
  const columns = [
    {
      field: "FamilyMemberName",
      name: "Family Member Name",
    },
    {
      field: "JobStatus",
      name: "Job Status",
    },
    {
      field: "EarningAmount",
      name: "Earning Amount",
    },
    {
      field: "LastCompanyName",
      name: "Last Company Name",
    },
    {
      field: "Remarks",
      name: "Remarks",
    },
  ];

  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [jobExperienceList, setJobExperienceList] = useState([]);
  const [jobStatusList, setJobStatusList] = useState([]);
  const [selectionList, setSelectionList] = useState({
    FamilyMemberList: [],
  });
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    const fetchApplicantId = async () => {
      let data1 = await fetchData("Applicant", "Crud_Family_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
        ApplicantFamily_JobExperienceDetailId:
          formFields.ApplicantFamily_JobExperienceDetailId,
      });
      fetchData("Applicant", "Crud_Family_Job_Experience_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: formFields.ApplicantCase_InvestigationId,
        ApplicantFamily_JobExperienceDetailId:
          formFields.ApplicantFamily_JobExperienceDetailId,
      }).then((result) => {
        setJobExperienceList(result?.DataSet?.Table);
        setSelectionList({
          ...selectionList,
          FamilyMemberList: data1?.DataSet?.Table,
        });
      });
    };
    const JobStatus = async () => {
      try {
        var data = await GetSetupMaster(SetupMasterIds.JobStatus, 0, "", 0);
        if (data != null) {
          if (data.response === true && data.data != null) {
            setJobStatusList(data.data);
            return data;
          } else {
            return [];
          }
        } else {
          return [];
        }
      } catch (error) {
        return [];
      }
    };
    fetchApplicantId();
    JobStatus();
  }, []);

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    let swelmsg = formFields.ApplicantFamily_JobExperienceDetailId === 0 ? 2 : 3;

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
        requestCall(
          formFields.ApplicantFamily_JobExperienceDetailId === 0 ? 2 : 3,
          formFields
        );
        
      }
    })
    
    
    
    
    
    
    
  
  };

  const onEdit = (index) => {
    setFormFields({ ...formFields, ...jobExperienceList[index] });
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
        requestCall(4, { ...formFields, ...jobExperienceList[index] });
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
    fetchData("Applicant", "Crud_Family_Job_Experience_Detail", {
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
      setJobExperienceList(result?.DataSet?.Table1);
      setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId });
      setFormLoading(false);
    });
  };
  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Earning</h6>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={3}>
                <FormGroupSelect
                  label="Applicant Family Detail*"
                  name="ApplicantFamilyDetailId"
                  value={formFields.ApplicantFamilyDetailId}
                  onChange={handleInputChange}
                  list={selectionList.FamilyMemberList}
                  fieldId="ApplicantFamilyDetailId"
                  fieldName="Name"
                  required={true}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Job Status"
                  name="JobStatusId"
                  value={formFields.JobStatusId}
                  onChange={handleInputChange}
                  list={jobStatusList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Earning Amount*"
                  name="EarningAmount"
                  value={formFields.EarningAmount}
                  onChange={handleInputChange}
                  required={true}
                  isNumber="true"
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Last Company"
                  name="LastCompanyName"
                  value={formFields.LastCompanyName}
                  onChange={handleInputChange}
                  disabled={role}
                />
              </Col>
              <Col md={6}>
                <FormGroupInput
                  label="Remarks"
                  name="Remarks"
                  value={formFields.Remarks}
                  onChange={handleInputChange}
                  disabled={role}
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Total Earning"
                  disabled={true}
                  value={
                    jobExperienceList.length > 0
                      ? jobExperienceList[0].TotalEarning
                      : "0"
                  }
                />
              </Col>
            </Row>

            <Row className="text-right">
              <Col md={12}>
                {role ? null : (
                  <FormGroupButton type="submit" title="Add Earning Detail" />
                )}
              </Col>
            </Row>
          </form>

          <Row>
            <Col md={12}>
              <h2 className="h6">Earning Details</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroupTable
                columns={columns}
                rows={jobExperienceList}
                onEdit={onEdit}
                onDelete={onDelete}
                hideAction={role}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default EarningDetails;
