import FormGroupButton from "components/GeneralComponent/FormGroupButton";
import FormGroupInput from "components/GeneralComponent/FormGroupInput";
import React, { useState } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api";

const FollowUpModal = (props) => {
  const initialValues = {
    OperationId: 3,
    ApplicantCase_InvestigationId: props.gridData.ApplicantCase_InvestigationId,
    FollowUpId: props.gridData.FollowUpId,
    FollowUpDate: null,
    InvestigatorId: 0,
    Remarks: "",
    FollowupSubmittionRemarks: "",
    UserId: localStorage.getItem("UserId"),
    UserIP: localStorage.getItem("UserIP"),
  };
  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };
  const [formFields, setFormFields] = useState({
    ...initialValues,
  });

  const submitRemarks = () => { 
    fetchData("Applicant", "Crud_Followup", {
      ...formFields,
    }).then((result) => {
      if (result?.DataSet?.Table[0]?.hasError > 0) {
        Swal.fire({
          title: "Error",
          text: result?.DataSet?.Table[0]?.Message,
          icon: "error",
        });
        return;
      }
      Swal.fire({
        title: "Success",
        text: result?.DataSet?.Table[0]?.Message,
        icon: "success",
      });
      props.toggle(true);
    });
  };
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      size="lg"
      backdrop="static"
    >
      <ModalHeader toggle={props.toggle}>Case Follow Up</ModalHeader>
      <ModalBody>
        <form>
          <Row>
            <Col md={12}>
              <FormGroupInput
                label="Follow Up Remarks"
                name="FollowupSubmittionRemarks"
                value={formFields.FollowupSubmittionRemarks}
                onChange={handleInputChange}
                required={true}
              />
            </Col>
            <Col md={12}>
              <FormGroupButton
                onClick={submitRemarks}
                type="button"
                title="Update Remarks"
              />
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default FollowUpModal;
