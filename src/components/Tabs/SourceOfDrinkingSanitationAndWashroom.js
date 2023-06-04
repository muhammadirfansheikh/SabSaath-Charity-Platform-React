import React, { useState, Link, useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import ModalApplHistory from "../../components/modal/ModalApplHistory.js";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api.js";
import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx";
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox.jsx";
import roleAuthentication from "functions/roleAuthentication.js";
import useEditRole from "hooks/useEditRole.js";

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  SourceOfDrinking_Ids: "",
  SanitationAndWashroom_Ids: "",
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};
const columns = [
  { field: "LoanType", name: "Loan Type" },
  { field: "LoanAmount", name: "Loan Amount" },
  { field: "MonthlyAmount", name: "Duration In Month" },
  { field: "BalanceAmount", name: "Balance Amount" },
  { field: "Remarks", name: "Remarks" },
];

const initialSelectionList = {
  DrinkingList: [],
  WashroomList: [],
};

const SourceOfDrinkingSanitationAndWashroom = (props) => {
  const [role, appId] = useEditRole();
  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [disabled, setDisabled] = useState(false);
  const [loanList, setLoanList] = useState([]);
  const [selectionList, setSelectionList] = useState(initialSelectionList);
  const [formLoading, setFormLoading] = useState(false);
  useEffect(() => {
    // setDisabled(roleAuthentication(initialValues.UserId));
    setDisabled(roleAuthentication(12));
    const fetchApplicantId = async () => {
      fetchData(
        "Applicant",
        "Applicant_Crud_Source_Of_Drinking_SanatationAndWashroom",
        {
          OperationId: 1,
          ApplicantCase_InvestigationId:
            formFields.ApplicantCase_InvestigationId,
          ApplicantLoanDetailId: formFields.ApplicantLoanDetailId,
        }
      ).then((result) => {
        setSelectionList({
          ...selectionList,
          DrinkingList: result?.DataSet?.Table,
          WashroomList: result?.DataSet?.Table1,
        });
      });
    };
    fetchApplicantId();
  }, []);

  const handleDrinkingInputChange = (event, index) => {
    selectionList.DrinkingList[index].IsChecked = event.target.value;
    setSelectionList({ ...selectionList });
  };
  const handleWashroomInputChange = (event, index) => {
    selectionList.WashroomList[index].IsChecked = event.target.value;
    setSelectionList({ ...selectionList });
  };

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    let drinkingList = [];
    selectionList.DrinkingList.forEach(
      (x) => x.IsChecked === true && drinkingList.push(x.SourceOfDrinkingId)
    );
    let washingList = [];
    selectionList.WashroomList.filter(
      (x) => x.IsChecked === true && washingList.push(x.SanitationAndWashroomId)
    );
    requestCall(2, {
      ...formFields,
      SourceOfDrinking_Ids: drinkingList.join(","),
      SanitationAndWashroom_Ids: washingList.join(","),
    });
  };

  /**
   * Request Call Function
   * @param {number} OperationId
   * @param {*} payload
   */
  const requestCall = (opId, payload) => {

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
       
    

    setFormLoading(true);
    fetchData(
      "Applicant",
      "Applicant_Crud_Source_Of_Drinking_SanatationAndWashroom",
      {
        OperationId: opId,
        ...payload,
      }
    ).then((result) => {
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
      setLoanList(result?.DataSet?.Table1);
      setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId });
      setFormLoading(false);
    });
  }
})
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Source of Drinking</h6>
          </CardHeader>
          <CardBody>
            <Row form>
              {selectionList?.DrinkingList?.map((drinkingItem, index) => (
                <FormGroupCheckbox
                  key={index}
                  label={drinkingItem.SourceOfDrinking}
                  name="IsChecked"
                  value={drinkingItem.IsChecked}
                  onChange={(e) => handleDrinkingInputChange(e, index)}
                  // disabled={!formFields.IsDeceased || role}
                  disabled={role}
                />
              ))}
            </Row>
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">
              Sanitation
            </h6>
          </CardHeader>
          <CardBody>
            <Row form>
              {selectionList?.WashroomList?.map((drinkingItem, index) => (
                <FormGroupCheckbox
                  key={index}
                  label={drinkingItem.SanitationAndWashroom}
                  name="IsChecked"
                  value={drinkingItem.IsChecked}
                  onChange={(e) => handleWashroomInputChange(e, index)}
                  //disabled={!formFields.IsDeceased || role}
                  disabled={role}
                />
              ))}
            </Row>
          </CardBody>
        </Card>
        {role ? null : (
          <FormGroupButton
            title="Save Sources"
            type="submit"
            loading={formLoading}
          />
        )}
      </form>
    </div>
  );
};

export default SourceOfDrinkingSanitationAndWashroom;
