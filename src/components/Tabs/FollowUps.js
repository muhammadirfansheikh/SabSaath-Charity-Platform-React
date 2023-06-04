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
  getCurrentDate,
  getDate,
  getDatefrom,
} from "utils/CommonMethods";
import FollowUpModalEdit from "components/modal/FollowUpModalEdit";

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  FollowUpId: 0,
  FollowUpDate: Date.now(),
  InvestigatorId: "",
  Remarks: "",
  FollowupSubmittionRemarks: "",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const initialSelectList = {
  InvestigatorList: [],
};

const columns = [
  { field: "FollowUpId", name: "FollowupId" },
  { field: "Investigator", name: "Investigator Name" },
  { field: "FollowupRequested_Date", name: "Follow Up Date" },
  { field: "Remarks", name: "Remarks" },
  { field: "CreatedDate", name: "Created Date" },
  { field: "RequestedBy", name: "Created By" },
  { field: "Status", name: "Status" },
  { field: "FollowupSubmittionDate", name: "Follow Up Submitted Date" },
  { field: "FollowupSubmittionRemarks", name: "Follow Up Submitted Remarks" },
];

const FollowUps = (props) => {
  const [role, appId] = useEditRole();

  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [selectionLists, setSelectionLists] = useState(initialSelectList);
  const [formLoading, setFormLoading] = useState(false);
  const [followUpList, setFollowUpList] = useState([]);
  const [followupEditId, setfollowupEditId] = useState(0);
  const [fetchAgain, setFetchAgain] = useState(0);
  const [followUpId, setFollowUpId] = useState();
  const [followUpRemarks, setFollowUpRemarks] = useState();

  useEffect(() => {
 
    const fetchApplicantId = () => {
      fetchData("Applicant", "Crud_Followup", {
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
        setFollowUpList([...result?.DataSet?.Table]);
        setSelectionLists({
          ...selectionLists,
          InvestigatorList: result?.DataSet?.Table1,
        });
      });
    };
    fetchApplicantId();
  }, [fetchAgain]);

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
//;
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
      if (result.isConfirmed) {
        formFields.FollowUpDate = getDate(
          formFields.FollowUpDate,
          "-",
          "yyyy/mm/dd"
        );
        requestCall(2, formFields);
      }
    });
  };

  const onEdit = (index) => {
    setFormFields({ ...formFields, ...followUpList[index] });
  };

  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload) => {
 
    setFormLoading(true);
    fetchData("Applicant", "Crud_Followup", {
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
      setFollowUpList(result?.DataSet?.Table1);
      setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId });
      setFormLoading(false);
    });
  };

  const [followUpModal, setFollowUpModal] = useState(false);
  const AllDateSet = (event, type) => {
    if (type === "FollowUpDate") {
      setFormFields({
        ...formFields,
        FollowUpDate: event,
      });
    }
  };

  //const current = new Date();
  //const currentdate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  const toggleFollowUp = () => {
    //setFollowUpModal(!followUpModal);
    setFollowUpModal(!followUpModal);
  };
  let datauser = {};
  const onEdit1 = (index, data) => {
    setFollowUpId(data?.FollowUpId);
    //console.log(data?.FollowUpId , "id");
    setFollowUpRemarks(data?.FollowupSubmittionRemarks);
    //console.log(data?.FollowupSubmittionRemarks , "remarks");
    toggleFollowUp(data);
  };

  const onEdit12 = (index) => {
    setFormFields({ ...formFields, ...followUpList[index] });
  };
  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Follow ups</h6>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={3}>
                {/* <FormGroup>
                  <Label for="">Follow Up Requested Date</Label>
                  <Input
                    type="date"
                    className="form-control"
                    name="FollowUpDate"
                    id="Date"
                    value={formFields.FollowUpDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    disabled={ role}
                  />
                </FormGroup>  */}
                <Label for="InputDate">Follow Up Requested Date</Label>
                <DatePicker
                  value={getDate(formFields.FollowUpDate, "/")}
                  // value={getDate(Date.now(), "/")}
                  dateFormat={dateFormat}
                  onChange={(e) => AllDateSet(e, "FollowUpDate")}
                  className="form-control"
                  name="FollowUpDate"
                  placeholderText={dateFormatPlaceholder}
                  //disabled={role}
                  //minDate={Date.now()}
                  disabled={true}
                  showYearDropdown
                />
              </Col>
              <Col md={3}>
                <FormGroupSelect
                  label="Investigator/HOD"
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
                    title="Save Follow Up"
                    type="submit"
                    loading={formLoading}
                  />
                )}
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
      <FormGroupTable
        columns={columns}
        rows={followUpList}
        onEdit={onEdit1}
        // onClick={(e) => onFollowUp({ followupid: followUpList.FollowUpId})}
      />
      {followUpModal && (
        <FollowUpModalEdit
          isOpen={followUpModal}
          toggle={toggleFollowUp}
          followUpId={followUpId}
          followUpRemarks={followUpRemarks}
          setFetchAgain={setFetchAgain}
        />
      )}
    </div>
  );
};

export default FollowUps;
