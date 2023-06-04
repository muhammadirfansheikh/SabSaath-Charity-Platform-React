import FormGroupButton from "components/GeneralComponent/FormGroupButton";
import FormGroupCheckbox from "components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "components/GeneralComponent/FormGroupInput";
import useEditRole from "hooks/useEditRole";
import React, { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, Col, Input, Row, Table } from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api";

const initialValues = {
  ApplicantCase_InvestigationId: 0,
  AssetHomeApplainceArray: [],
  UserId: localStorage.getItem("UserId"),
  UserIP: localStorage.getItem("UserIP"),
};

const HomeAppliancesObject = {
  AssetTypeID: 1,
  Quantity: 1,
  Remarks: "",
};

const initialSelectionList = [];

const HomeAppliances = (props) => {
  const [role, appId] = useEditRole();

  const [formFields, setFormFields] = useState({
    ...initialValues,
    ApplicantCase_InvestigationId: appId,
  });
  const [selectionLists, setSelectionLists] = useState(initialSelectionList);
  const [formLoading, setFormLoading] = useState(false);
  const [formHomeLoading, setFormHomeLoading] = useState(false);
  const [formHomeSubmitLoading, setFormHomeSubmitLoading] = useState(false);

  useEffect(() => {
    const fetchApplicantId = () => {
      setFormHomeLoading(true);
      fetchData("Applicant", "Crud_Applicant_Asset_Detail_Home_Applaince", {
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
        setSelectionLists(result?.DataSet?.Table);
        setFormHomeLoading(false);
      });
    };
    fetchApplicantId();
  }, []);

  const handleCheckedValue = (e, index) => {
    selectionLists[index][e.target.name] = e.target.value; 
    setSelectionLists([...selectionLists]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
       
      

    requestCall(2, {
      ...formFields,
      AssetHomeApplainceArray: selectionLists.filter(
        (x) => x.IsChecked === true
      ),
    });
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
    fetchData("Applicant", "Crud_Applicant_Asset_Detail_Home_Applaince", {
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
      setSelectionLists(result?.DataSet?.Table1);
      setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId });
      setFormLoading(false);
    });
  };

  return (
    <Card className="mb-3">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Home Appliances</h6>
        </CardHeader>
        <CardBody>
                  <Row form>
            <Col md={12}>
              <Table bordered striped responsive>
                <thead>
                  <tr>
                    <th>Sr #</th>
                    <th>Home Appliances</th>
                    <th>Check</th>
                    <th>Quantity</th>
                    <th>Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {selectionLists?.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.HomeAppliaces}?</td>
                      <td>
                        <input
                          type="checkbox"
                          name="IsChecked"
                          checked={item.IsChecked}
                          disabled={role}
                          onChange={(e) =>
                            handleCheckedValue(
                              {
                                target: {
                                  name: e.target.name,
                                  value: e.target.checked,
                                },
                              },
                              index
                            )
                          }
                        />
                      </td>
                      <td>
                        <FormGroupInput
                          name="Quantity"
                          value={
                            item.IsChecked && item.Quantity > 0
                              ? item.Quantity
                              : (item.Quantity = 1)
                          }
                          onChange={(e) => handleCheckedValue(e, index)}
                          disabled={!item.IsChecked || role}
                          type="number"
                          inputStyle={{ width: 100 }}
                        />
                      </td>
                      <td>
                        <FormGroupInput
                          name="Remarks"
                          value={item.Remarks}
                          onChange={(e) => handleCheckedValue(e, index)}
                          disabled={!item.IsChecked || role}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
                  <Row form>
                  {role ? null : (
            <FormGroupButton
              title="Save Home Appliances"
              type="submit"
              loading={formHomeSubmitLoading}
            />
                  )}
          </Row>
        </CardBody>
      </form>
    </Card>
  );
};

export default HomeAppliances;
