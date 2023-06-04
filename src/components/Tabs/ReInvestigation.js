import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { fetchData } from "utils/Api";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect";
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import Swal from "sweetalert2";
import FormGroupButton from "components/GeneralComponent/FormGroupButton";
import FormGroupInput from "components/GeneralComponent/FormGroupInput";
import useEditRole from "hooks/useEditRole";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  dateFormat,
  dateFormatPlaceholder,
  getDate,
  getDatefrom,
} from "utils/CommonMethods";

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  InvestigatorId: 0,
  ReinvestigationDate: "",
  Remarks: "",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const initialSelectList = {
  InvestigatorList: [],
};

const columns = [
  { field: "Investigator", name: "Investigator Name" },
  { field: "FollowupRequested_Date", name: "Follow Up Date" },
  { field: "Remarks", name: "Remarks" },
  { field: "CreatedDate", name: "Created By" },
  { field: "RequestedBy", name: "Created Date" },
  { field: "Status", name: "Status" },
  { field: "FollowupSubmittionDate", name: "Follow Up Submitted Date" },
  { field: "FollowupSubmittionRemarks", name: "Follow Up Submitted Remarks" },
];

const ReInvestigation = (props) => {
  const [role, appId] = useEditRole();
  
  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [selectionLists, setSelectionLists] = useState(initialSelectList);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
  
    // const data = await fetchData(ControllerName.User,ApiMethods.CrudUser, RequestData);
    const fetchApplicantId = () => {
      fetchData("User", "CrudUser", {
        OperationTypeId: 1,
      }).then((result) => {
        if (result?.DataSet?.Table[0]?.HasError > 0) {
          Swal.fire({
            title: "Error",
            text: result.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        }
        // setReInvestigationList([...result?.DataSet?.Table]);
        setSelectionLists({
          ...selectionLists,
          InvestigatorList: result?.data,
        });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    requestCall(2, formFields);
  };

//   const onEdit = (index) => {
//     setFormFields({ ...formFields, ...reInvestigationList[index] });
//   };

  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload) => {
    setFormLoading(true);
    fetchData("Applicant", "Applicant_Case_Re_Investigate", {
    //   OperationId: opId,
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
      setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId });
      setFormLoading(false);
    });
  };

  const AllDateSet = (event, type) => {
    if (type === "ReinvestigationDate") {
      setFormFields({
        ...formFields,
        ReinvestigationDate: event, 
      });
    }
  };
  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Re Investigation</h6>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={3}>
                <FormGroup>
                  {/* <Label for="">Re Investigation Requested Date</Label>
                  <Input
                    type="date"
                    className="form-control"
                    name="ReinvestigationDate"
                    id="Date"
                    value={formFields.ReinvestigationDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    disabled={role}
                  /> */}
                   <Label for="InputDate">Re Investigation Requested Date</Label>
                <DatePicker
                  
                  value={getDate(formFields.ReinvestigationDate, "/")}
                  
                  dateFormat={dateFormat}
                  onChange={(e) => AllDateSet(e, "ReinvestigationDate")}
                  className="form-control"
                  name="ReinvestigationDate"
                  placeholderText={dateFormatPlaceholder}
                  minDate={Date.now()}
                  disabled={role}
                  showYearDropdown
                />
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Investigator"
                  name="InvestigatorId"
                  value={formFields.InvestigatorId}
                  onChange={handleInputChange}
                  list={selectionLists.InvestigatorList}
                  fieldId="UserId"
                  fieldName="Name"
                  disabled={role}
                />
              </Col>
              <Col md={12}>
                <FormGroupInput
                  label="Remarks"
                  name="Remarks"
                  value={formFields.Remarks}
                  onChange={handleInputChange}
                  disabled={role}
                />
              </Col>
            </Row>
            <Row form className="text-right">
              <Col md={12}>
                {role ? null : (
                  <FormGroupButton
                    title="Save Re Investigation"
                    type="submit"
                    loading={formLoading}
                  />
                )}
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
      
    </div>
  );
};

export default ReInvestigation;
