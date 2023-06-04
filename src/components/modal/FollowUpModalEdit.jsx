import FormGroupButton from "components/GeneralComponent/FormGroupButton";
import FormGroupInput from "components/GeneralComponent/FormGroupInput";
import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api";

const FollowUpModalEdit = (props) => { 
  // const initialValues = {
  //   OperationId: 3,
  //   FollowUpId: props?.followUpId,
  //   FollowupSubmittionRemarks: props?.followUpRemarks,
  //   UserId: localStorage.getItem("UserId"),
  //   UserIP: localStorage.getItem("UserIP"),
  // };
  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };
  const [formFields, setFormFields] = useState({});

  useEffect(() => {
    setFormFields({
      OperationId: 3,
      FollowUpId: props?.followUpId,
      FollowupSubmittionRemarks: props?.followUpRemarks,
      UserId: localStorage.getItem("UserId"),
      UserIP: localStorage.getItem("UserIP"),
    });
  }, []);

  const submitRemarks = () => { 

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
        fetchData("Applicant", "Crud_Followup_Edit", {
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

          setTimeout(() => {
            props.setFetchAgain((x) => x + 1);
          }, 500);
        });
      }
    });
  };
  return (
    <Modal
      isOpen={props.isOpen}
      toggle={props.toggle}
      size="lg"
      backdrop="static"
    >
      <ModalHeader toggle={props.toggle}>Case Follow Up Edit</ModalHeader>
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

export default FollowUpModalEdit;
