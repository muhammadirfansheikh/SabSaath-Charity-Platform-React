import FormGroupButton from "components/GeneralComponent/FormGroupButton.jsx";
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import useEditRole from "hooks/useEditRole.js";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Row, Col, Button } from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api.js";
import { deleteDataGeneric, GetSetupMaster } from "utils/CommonMethods.js";
import { ApiMethods, ControllerName, SetupMasterIds } from "utils/Constants.js";
import ModalApplHistory from "../../components/modal/ModalApplHistory.js";

const initialValues = {
    ApplicantCase_InvestigationId: 0,
    ApplicantMonthlyExpenseDetailId: 0,
    ExpenseId: "",
    Amount: null,
    UserId: localStorage.getItem("UserId"),
    UserIP: localStorage.getItem("UserIP"),
};

const initialSelectLists = {
    ExpenseList: [],
};

const columns = [
    { field: "Expense", name: "Expense" },
    { field: "Amount", name: "Amount" },
];

const MonthlyExpenseDetail = (props) => {
    const [role, appId] = useEditRole();

    const [historyModal, setHistoryModal] = useState(false);
    const [formFields, setFormFields] = useState({
        ...initialValues,
        ApplicantCase_InvestigationId: appId,
    });
    const [selectionLists, setSelectionLists] = useState(initialSelectLists);
    const [expenseDetailList, setExpenseDetailList] = useState([]);
    const [formLoading, setFormLoading] = useState(false);

    useEffect(() => {
        const fetchDropDownList = async () => {
            let expenceList = await GetSetupMaster(SetupMasterIds.Expense, 0, "", 0);
            setSelectionLists({
                ...selectionLists,
                ExpenseList: expenceList.data,
            });
        };
        const fetchApplicantId = () => {
            fetchData("Applicant", "Crud_Monthly_Expense_Detail", {
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
                setExpenseDetailList(result?.DataSet?.Table);
            });
        };
        fetchDropDownList();
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

        let swelmsg = formFields.ApplicantMonthlyExpenseDetailId === 0 ? 2 : 3;

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
              formFields.ApplicantMonthlyExpenseDetailId === 0 ? 2 : 3,
              formFields
          );
            
          }
        })







     
    };

    const onEdit = (index) => {
        setFormFields({ ...formFields, ...expenseDetailList[index] });
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
          requestCall(4, { ...formFields, ...expenseDetailList[index] });
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
        fetchData("Applicant", "Crud_Monthly_Expense_Detail", {
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
            setExpenseDetailList(result?.DataSet?.Table1);
            setFormFields({ ...initialValues, ApplicantCase_InvestigationId: appId });
            setFormLoading(false);
        });
    };

  return (
    <div>
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Monthly Expense</h6>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
                      <Row form>
              <Col md={4}>
                <FormGroupSelect
                  label="Expense*"
                  name="ExpenseId"
                  value={formFields.ExpenseId}
                  onChange={handleInputChange}
                  list={selectionLists.ExpenseList}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  required={true}
                  disabled={role}
                />
              </Col>
              <Col md={4}>
                <FormGroupInput
                  label="Amount*"
                  name="Amount"
                  value={formFields.Amount}
                  onChange={handleInputChange}
                  required={true}
                  isNumber="true"
                  disabled={role}
                />
              </Col>
              <Col md={4}>
                <FormGroupInput
                  label="Total Expense"
                  value={expenseDetailList.length > 0 ?  expenseDetailList[0].TotalExpense : "0"}
                  disabled={true}
                />
              </Col>
            </Row>
            <Row className="text-right">
              <Col md={12}>
              {role ? null : (
                <FormGroupButton
                  title="Add"
                  type="submit"
                  loading={formLoading}
                />
              )}
              </Col>
            </Row>
          </form>
                  <Row form>
            <Col md={12}>
              <h2 className="h6">Expense Detail</h2>
            </Col>
          </Row>
                  <Row form>
            <Col md={12}>
              <FormGroupTable
                columns={columns}
                rows={expenseDetailList}
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

export default MonthlyExpenseDetail;
