import React, { useState } from "react";
import FormGroupInput from "components/GeneralComponent/FormGroupInput";
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
import {
  GetSetupMaster,
  GetUniqueStringValue,
} from "../../utils/CommonMethods.js";
import { getFamilyDetail } from "../../services/FamilyDetailService.js";
import * as api from "../../utils/Api.js";
import { transformDateToISO } from "../../utils/Common.js";
import Swal from "sweetalert2";
import {
  ApiMethods,
  ControllerName,
  SetupMasterIds,
  SetupMasterDetailsConstantsValues,
} from "utils/Constants";
import useEditRole from "hooks/useEditRole.js";

const PrimarySupport = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const openNewmodal = () => {
    setOpenModal(true);
  };
  const closeNewmodal = () => {
    setOpenModal(false);
  };

  let initialValues = {
    familyMemberName: "",
    familyMember: "0",
    relationName: "",
    relation: "0",
    categoryName: "",
    category: "0",
    fundCategoryName: "",
    fundCategory: "0",
    frequencyName: "",
    frequency: "0",
    fundRequired: "0",
    repeatition: "0",
    fundAmountRequested: "0",
    totalFundAmount: "0",
  };

  let initialValuesSecondary = {
    familyMemberName: "",
    familyMember: "0",
    relationName: "",
    relation: "0",
    categoryName: "",
    category: "0",
    fundCategoryName: "",
    fundCategory: "0",
    frequencyName: "",
    frequency: "0",
    fundRequired: "0",
    repeatition: "0",
    totalFundAmount: "0",
  };

  const [values, setValues] = useState(initialValues);
  const [valuesSecondary, setValuesSecondary] = useState(
    initialValuesSecondary
  );
  const [familyDetailDDL, setFamilyDetailDDL] = useState([]);
  const [relationDDL, setRelationDDL] = useState([]);
  const [categoryDDL, setCategoryDDL] = useState([]);
  const [categorySecondaryDDL, setCategorySecondaryDDL] = useState([]);
  const [subCategoryDDL, setSubCategoryDDL] = useState([]);
  const [frequencyDDL, setFrequencyDDL] = useState([]);
  const [selectedRelationId, setSelectedRelationId] = useState(0);
  const [selectedRelationIdSecondary, setSelectedRelationIdSecondary] =
    useState(0);
  const [primarySupportList, setPrimarySupportList] = useState([]);
  const [secondarySupportList, setSecondarySupportList] = useState([]);
  const [selectedPrimaryCategoryId, setSelectedPrimaryCategoryId] = useState(0);
  const [editSNo, setEditSNo] = useState(0);
  const [masterData, setMasterData] = useState([]);

  var UserId = localStorage.getItem("UserId");
  var UserIp = localStorage.getItem("UserIP");
  const [role, appId] = useEditRole();
  const [paymentScheduleExist, setpaymentScheduleExist] = useState(false);

  const SaveSupport = async (opId) => {
   
    let supportArr = [];

    if (opId > 1) {
      primarySupportList.map((row) =>
        supportArr.push({
          ApplicantCaseId: appId,
          IsPrimarySupport: true,
          FundCategoryId: row.category,
          AmountRequested: row.fundRequired,
          AmountApproved: row.AmountApproved,
          SupportStatusId: 0,
          ApplicantFamilyDetailId: row.familyMember,
          FundSubCategoryId: row.fundCategory,
          Remarks: "",
          Repitation: row.repeatition,
          RepetaionRemaining: 1,
          PaymentFrequencyId: row.frequency,
          IsActive: true,
          IsDeleted: false,
          CreatedBy: UserId,
          ModifiedBy: UserId,
          ModifiedDate: null,
          CreatedDate: null,
          UserIP: UserIp,
        })
      );

      secondarySupportList.map((row) =>
        supportArr.push({
          ApplicantCaseId: appId,
          IsPrimarySupport: false,
          FundCategoryId: row.category,
          AmountRequested: row.fundRequired,
          AmountApproved: row.AmountApproved,
          SupportStatusId: 0,
          ApplicantFamilyDetailId: row.familyMember,
          FundSubCategoryId: row.fundCategory,
          Remarks: "",
          Repitation: row.repeatition,
          RepetaionRemaining: 1,
          PaymentFrequencyId: row.frequency,
          IsActive: true,
          IsDeleted: false,
          CreatedBy: UserId,
          ModifiedBy: UserId,
          ModifiedDate: null,
          CreatedDate: null,
          UserIP: UserIp,
        })
      );

      if (supportArr.length > 0) {
        // let sum = supportArr.reduce(function (prev, current) {
        //   return prev + +current.AmountRequested;
        // }, 0);

        // if (sum <= masterData.FundAmount_Required) {
        return await api.postRecord(
          `applicant`,
          `Crud_Applicant_Support_Detail`,
          {
            operationid: opId,
            ApplicantCase_InvestigationId: appId,
            userip: UserIp,
            userid: UserId,
            ApplicantSupportArray: supportArr,
          }
        );
        // }
        // else {
        //   Swal.fire({
        //     title: "Error",
        //     text: "Total fund required is not more than fund amount requested",
        //     icon: "error",
        //   });
        //   return;
        // }
      } else {
        Swal.fire({
          title: "Error",
          text: "No Support found",
          icon: "error",
        });
        return;
      }
    } else {
      return await api.postRecord(
        `applicant`,
        `Crud_Applicant_Support_Detail`,
        {
          operationid: opId,
          ApplicantCase_InvestigationId: appId,
          userip: UserIp,
          userid: UserId,
          ApplicantSupportArray: [],
        }
      );
    }
  };

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (e.target.type === "select-one") {
      if (e.target.name === "category") {
        setSelectedPrimaryCategoryId(e.target.value);
      }

      if (e.target.name === "familyMember") {
        let relationId = 0;
        let relationName = "";
        familyDetailDDL.map((item) => {
          if (item.ApplicantFamilyDetailId == e.target.value) {
            setSelectedRelationId(item.RelationId);
            relationId = item.RelationId;

            relationName = relationDDL.filter(
              (data) => data.SetupDetailId === relationId
            )[0].SetupDetailName;
          } else {
            setSelectedRelationId(0);
          }
        });

        setValues({
          ...values,
          [name]: value,
          [name + "Name"]: e.target.options[e.target.selectedIndex].text,
          relation: relationId,
          relationName: relationName,
        });
      } else if (e.target.name === "frequency") {
        if (
          parseInt(e.target.value) ===
          SetupMasterDetailsConstantsValues.FrequencyOneTime
        ) {
          setValues({
            ...values,
            [name]: value,
            [name + "Name"]: e.target.options[e.target.selectedIndex].text,
            ["repeatition"]: "1",
          });
        } else {
          setValues({
            ...values,
            [name]: value,
            [name + "Name"]: e.target.options[e.target.selectedIndex].text,
            ["repeatition"]: "0",
          });
        }
      } else {
        setValues({
          ...values,
          [name]: value,
          [name + "Name"]: e.target.options[e.target.selectedIndex].text,
        });
      }
    } else {
      if (e.target.name === "repeatition") {
        if (value <= 200) {
          setValues({
            ...values,
            [name]: value,
            totalFundAmount: parseInt(value) * parseInt(values.fundRequired),
          });
        }
      } else if (e.target.name === "fundRequired") {
        setValues({
          ...values,
          [name]: value,
          totalFundAmount: parseInt(value) * parseInt(values.repeatition),
        });
      } else {
        setValues({
          ...values,
          [name]: value,
        });
      }
    }

    if (e.target.name === "category") {
      GetSubCategory(e.target.value);
    }
  };

  const handleInputChangeSecondary = (e) => {
    let { name, value } = e.target;
    if (e.target.type === "select-one") {
      if (e.target.name === "familyMember") {
        let relationId = 0;
        let relationName = "";
        familyDetailDDL.map((item) => {
          if (item.ApplicantFamilyDetailId == e.target.value) {
            setSelectedRelationIdSecondary(item.RelationId);
            relationId = item.RelationId;
            relationName = relationDDL.filter(
              (data) => data.SetupDetailId === relationId
            )[0].SetupDetailName;
          } else {
            setSelectedRelationIdSecondary(0);
          }
        });

        setValuesSecondary({
          ...valuesSecondary,
          [name]: value,
          [name + "Name"]: e.target.options[e.target.selectedIndex].text,
          relation: relationId,
          relationName: relationName,
        });
      } else if (e.target.name === "frequency") {
        if (
          parseInt(e.target.value) ===
          SetupMasterDetailsConstantsValues.FrequencyOneTime
        ) {
          setValuesSecondary({
            ...valuesSecondary,
            [name]: value,
            [name + "Name"]: e.target.options[e.target.selectedIndex].text,
            ["repeatition"]: "1",
          });
        } else {
          setValuesSecondary({
            ...valuesSecondary,
            [name]: value,
            [name + "Name"]: e.target.options[e.target.selectedIndex].text,
            ["repeatition"]: "0",
          });
        }
      } else {
        setValuesSecondary({
          ...valuesSecondary,
          [name]: value,
          [name + "Name"]: e.target.options[e.target.selectedIndex].text,
        });
      }
    } else {
      if (e.target.name === "repeatition") {
        if (value <= 200) {
          setValuesSecondary({
            ...valuesSecondary,
            [name]: value,
            totalFundAmount:
              parseInt(value) * parseInt(valuesSecondary.fundRequired),
          });
        }
      } else if (e.target.name === "fundRequired") {
        setValuesSecondary({
          ...valuesSecondary,
          [name]: value,
          totalFundAmount:
            parseInt(value) * parseInt(valuesSecondary.repeatition),
        });
      } else {
        setValuesSecondary({
          ...valuesSecondary,
          [name]: value,
        });
      }
    }

    if (e.target.name === "category") {
      GetSubCategory(e.target.value);
    }
  };

  const GetRelation = async (e) => {
    var relationValues = await GetSetupMaster(
      SetupMasterIds.Relation,
      0,
      "",
      0
    );

    setRelationDDL(relationValues.data);
  };

  const GetFrequency = async (e) => {
    var frequency = await GetSetupMaster(SetupMasterIds.Frequency, 0, "", 0);

    setFrequencyDDL(frequency.data);
  };

  const GetCategory = async (e) => {
    var catValues = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0);

    setCategoryDDL(catValues.data);
    setCategorySecondaryDDL(catValues.data);
  };

  const requestCall = (opId, payload) => {
    //setFormLoading(true);
    api
      .fetchData("Applicant", "Crud_Family_Detail", {
        OperationId: 1,
        ApplicantCase_InvestigationId: appId,
      })
      .then((result) => {
        setFamilyDetailDDL(result?.DataSet?.Table);
      });
  };

  const GetSubCategory = async (e) => {
    var subCatValues = await GetSetupMaster(
      SetupMasterIds.FundCategory,
      parseInt(e),
      "",
      0
    );

    setSubCategoryDDL(subCatValues.data);
  };

  function addPrimarySupportArr() {
    if (addPrimarySupport()) {
      let swelmsg;
      if (editSNo === 0) {
        swelmsg = "Are you sure to add the record?";
      } else {
        swelmsg = "Are you sure to edit the record?";
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
        if (result.isConfirmed) {
          if (editSNo === 0) {
            setPrimarySupportList((oldArray) => [...oldArray, values]);
            initialValues.category = selectedPrimaryCategoryId;
            initialValues.categoryName = values.categoryName;
            initialValues.fundAmountRequested = masterData.FundAmount_Required;
            setValues({
              ...initialValues,
            });
          } else {
            const newState = [...primarySupportList];
            newState[editSNo - 1] = values;
            setPrimarySupportList(newState);
          }
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Please Enter the Required Fields",
        icon: "error",
      });
    }
  }

  React.useEffect(() => {
    GetRelation();
    //GetFamilyDetails();
    requestCall();
    GetCategory();
    GetFrequency();

    SaveSupport(1).then((result) => {
      if (result?.data?.DataSet?.Table2[0]?.haserror === 0) {
        if (result?.data?.DataSet?.Table[0]?.PrimaryFundCategoryId > 0) {
          setMasterData(result?.data?.DataSet?.Table[0]);
          setSelectedPrimaryCategoryId(
            result?.data?.DataSet?.Table[0]?.PrimaryFundCategoryId
          );
          setValues({
            ...values,
            category: result?.data?.DataSet?.Table[0]?.PrimaryFundCategoryId,
            categoryName:
              result?.data?.DataSet?.Table[0]?.PrimaryFundCategoryName,
            fundAmountRequested:
              result?.data?.DataSet?.Table[0]?.FundAmount_Required,
          });
          if (result?.data?.DataSet?.Table1 != null) {
            var arrP = result?.data?.DataSet?.Table1.filter(
              (data) => data.IsPrimarySupport === true
            );

            var arrS = result?.data?.DataSet?.Table1.filter(
              (data) => data.IsPrimarySupport === false
            );

            setPrimarySupportList(arrP);
            setSecondarySupportList(arrS);

            if (result?.data?.DataSet?.Table1[0]?.PaymentSchedule_Count > 0) {
              setpaymentScheduleExist(true);
            }
          }

          GetSubCategory(
            result?.data?.DataSet?.Table[0]?.PrimaryFundCategoryId
          );
        }
      }
    });
  }, []);

  function addSecondarySupportArr() {
    if (addSecondarySupport()) {
      let swelmsg;
      if (editSNo === 0) {
        swelmsg = "Are you sure to add the record?";
      } else {
        swelmsg = "Are you sure to edit the record?";
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
        if (result.isConfirmed) {
          if (editSNo === 0) {
            setSecondarySupportList((oldArray) => [
              ...oldArray,
              valuesSecondary,
            ]);

            setValuesSecondary(initialValuesSecondary);
          } else {
            const newState = [...secondarySupportList];
            newState[editSNo - 1] = valuesSecondary;
            setSecondarySupportList(newState);
          }
        }
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Please Enter the Required Fields",
        icon: "error",
      });
    }
  }

  const RemoveRow = (index, isPrimary) => {
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
      if (result.isConfirmed) {
        if (isPrimary) {
          primarySupportList.splice(index, 1);
          setPrimarySupportList([...primarySupportList]);
        } else {
          secondarySupportList.splice(index, 1);
          setSecondarySupportList([...secondarySupportList]);
        }
      }
    });
  };

  function addPrimarySupport() {
    let isFlag = true;

    if (
      values.familyMember !== "0" &&
      values.fundCategoryRequested !== "0" &&
      values.frequency !== "0" &&
      values.fundCategory !== "0" &&
      values.fundRequired !== "0" &&
      values.repeatition !== "0"
    ) {
      if (editSNo === 0) {
        let idx = primarySupportList.findIndex(
          (a) =>
            a.familyMember === values.familyMember &&
            a.fundCategory === values.fundCategory
        );

        if (idx > -1) {
          isFlag = false;
        }
      }
    } else {
      isFlag = false;
    }

    return isFlag;
  }

  function addSecondarySupport() {
    let isFlag = true;

    if (
      valuesSecondary.familyMember !== "0" &&
      valuesSecondary.category !== "0" &&
      valuesSecondary.frequency !== "0" &&
      valuesSecondary.fundCategory !== "0" &&
      valuesSecondary.fundRequired !== "0" &&
      valuesSecondary.repeatition !== "0"
    ) {
      if (editSNo === 0) {
        let idx = secondarySupportList.findIndex(
          (a) =>
            a.familyMember === valuesSecondary.familyMember &&
            a.fundCategory === valuesSecondary.fundCategory
        );

        if (idx > -1) {
          isFlag = false;
        }
      }
    } else {
      isFlag = false;
    }

    GetRelation();
    //GetFamilyDetails();
    GetCategory();
    GetFrequency();

    return isFlag;
  }

  return (
    <div>
      <Row form>
        <Col md={3}>
          <FormGroup>
            <Label for="">Fund Amount Requested</Label>
            <Input
              type="text"
              className="form-control"
              id="txtFundAmountRequested"
              name="fundAmountRequested"
              isnumber={true}
              value={values.fundAmountRequested}
              disabled={true}
            />
          </FormGroup>
        </Col>
      </Row>

      {/*primary support*/}

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Primary Support</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Family Member</Label>
                  <Input
                    id="ddlFamilyMember"
                    name="familyMember"
                    type="select"
                    value={values.familyMember}
                    onChange={handleInputChange}
                    disabled={paymentScheduleExist || role}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {familyDetailDDL.map((item, key) => (
                      <option
                        key={item.Name}
                        value={item.ApplicantFamilyDetailId}
                      >
                        {item.Name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Relation</Label>
                  <Input
                    id="ddlRelation"
                    name="relation"
                    type="select"
                    value={values.relation}
                    disabled={true}
                    onChange={handleInputChange}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {relationDDL.map((item, key) => (
                      <option
                        key={item.SetupDetailName}
                        value={item.SetupDetailId}
                      >
                        {item.SetupDetailName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Fund Category</Label>
                  <Input
                    id="ddlCategory"
                    name="category"
                    type="select"
                    onChange={handleInputChange}
                    disabled={true}
                    value={values.category}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {categoryDDL.map((item, key) => (
                      <option
                        key={item.SetupDetailName}
                        value={item.SetupDetailId}
                      >
                        {item.SetupDetailName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Fund Sub Category</Label>
                  <Input
                    id="ddlFundCategory"
                    name="fundCategory"
                    type="select"
                    value={values.fundCategory}
                    onChange={handleInputChange}
                    disabled={paymentScheduleExist || role}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {subCategoryDDL.map((item, key) => (
                      <option
                        key={item.SetupDetailName}
                        value={item.SetupDetailId}
                      >
                        {item.SetupDetailName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Frequency</Label>
                  <Input
                    id="ddlFrequency"
                    name="frequency"
                    type="select"
                    value={values.frequency}
                    onChange={handleInputChange}
                    disabled={paymentScheduleExist || role}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {frequencyDDL.map((item, key) => (
                      <option
                        key={item.SetupDetailName}
                        value={item.SetupDetailId}
                      >
                        {item.SetupDetailName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroupInput
                  label="Fund required"
                  name="fundRequired"
                  onChange={handleInputChange}
                  value={values.fundRequired}
                  required={true}
                  disabled={paymentScheduleExist || role}
                  isNumber="true"
                />
              </Col>

              <Col md={3}>
                <FormGroupInput
                  label="Repetition"
                  name="repeatition"
                  value={values.repeatition}
                  onChange={handleInputChange}
                  required={true}
                  disabled={
                    role ||
                    (parseInt(values.frequency) ===
                    SetupMasterDetailsConstantsValues.FrequencyOneTime
                      ? true
                      : role)
                  }
                  isNumber="true"
                />
              </Col>

              <Col md={3}>
                <FormGroupInput
                  label="Total Fund Required"
                  name="totalFundRequired"
                  value={values.totalFundAmount}
                  onChange={handleInputChange}
                  required={true}
                  disabled={true}
                  isNumber="true"
                />
              </Col>
            </Row>
            <Row>
              <Col md={9}>
                <FormGroup>
                  <Label for="">Remarks</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="txtRemarks"
                    name="remarks"
                    disabled={paymentScheduleExist || role}
                  />
                </FormGroup>
              </Col>
              {/* </Row>
            <Row Form className="text-right"> */}
              <Col md={3}>
                <FormGroup>
                  {role ? null : (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => addPrimarySupportArr()}
                    >
                      Add
                    </Button>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>

          <Row form className="mt-2">
            <Col md={12}>
              <h2 className="h6">Primary Support Details</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Table bordered striped responsive>
                <thead>
                  <tr>
                    <th>Sr #</th>
                    <th>Family Member </th>
                    <th>Self/Relation </th>
                    <th>Fund Category</th>
                    <th>Fund Sub Category</th>
                    <th>Frequency</th>
                    <th>Fund Required</th>
                    <th>Repetition</th>
                    <th>Total Fund Amount</th>
                     {role ? null : (
                      <th className="text-center" style={{ width: 150 }}>
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {primarySupportList ? (
                    primarySupportList.map((row, index) => (
                      <tr>
                        <td key={GetUniqueStringValue()}>{index + 1}</td>
                        <td key={GetUniqueStringValue()}>
                          {row.familyMemberName}
                        </td>
                        <td key={GetUniqueStringValue()}>{row.relationName}</td>
                        <td key={GetUniqueStringValue()}>{row.categoryName}</td>
                        <td key={GetUniqueStringValue()}>
                          {row.fundCategoryName}
                        </td>
                        <td key={GetUniqueStringValue()}>
                          {row.frequencyName}
                        </td>
                        <td key={GetUniqueStringValue()}>{row.fundRequired}</td>
                        <td key={GetUniqueStringValue()}>{row.repeatition}</td>
                        <td key={GetUniqueStringValue()}>
                          {row.totalFundAmount}
                        </td>
                      
                        {role ? null : (
                          <td className="text-center">
                            <Button
                              color="primary"
                              className="btn-circle"
                              size="sm"
                              onClick={(e) => {
                                setValues(row);
                                setEditSNo(index + 1);
                              }}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i>
                            </Button>
                            <Button
                              color="danger"
                              className="btn-circle"
                              size="sm"
                              onClick={() => {
                                RemoveRow(index, true);
                              }}
                            >
                              <i className="nc-icon nc-simple-remove"></i>
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
      {/*primary support*/}

      {/*Secondary support*/}

      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Secondary Support</h6>
        </CardHeader>
        <CardBody>
          <Form>
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Family Member</Label>
                  <Input
                    id="ddlFamilyMember"
                    name="familyMember"
                    type="select"
                    onChange={handleInputChangeSecondary}
                    value={valuesSecondary.familyMember}
                    disabled={paymentScheduleExist || role}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {familyDetailDDL.map((item, key) => (
                      <option
                        key={item.Name}
                        value={item.ApplicantFamilyDetailId}
                      >
                        {item.Name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Relation</Label>
                  <Input
                    id="ddlRelation"
                    name="relation"
                    type="select"
                    value={valuesSecondary.relation}
                    disabled={true}
                    onChange={handleInputChangeSecondary}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {relationDDL.map((item, key) => (
                      <option
                        key={item.SetupDetailName}
                        value={item.SetupDetailId}
                      >
                        {item.SetupDetailName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Fund Category</Label>
                  <Input
                    id="ddlCategory"
                    name="category"
                    type="select"
                    onChange={handleInputChangeSecondary}
                    value={valuesSecondary.category}
                    disabled={paymentScheduleExist || role}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {categorySecondaryDDL.map((item, key) =>
                      item.SetupDetailId !==
                      parseInt(selectedPrimaryCategoryId) ? (
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
                  <Label for="InputState">Fund Sub Category</Label>
                  <Input
                    id="ddlFundCategory"
                    name="fundCategory"
                    type="select"
                    onChange={handleInputChangeSecondary}
                    value={valuesSecondary.fundCategory}
                    disabled={paymentScheduleExist || role}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {subCategoryDDL.map((item, key) => (
                      <option
                        key={item.SetupDetailName}
                        value={item.SetupDetailId}
                      >
                        {item.SetupDetailName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="InputState">Frequency</Label>
                  <Input
                    id="ddlFrequency"
                    name="frequency"
                    type="select"
                    onChange={handleInputChangeSecondary}
                    value={valuesSecondary.frequency}
                    disabled={paymentScheduleExist || role}
                  >
                    <option key={0} value={0}>
                      Select
                    </option>
                    {frequencyDDL.map((item, key) => (
                      <option
                        key={item.SetupDetailName}
                        value={item.SetupDetailId}
                      >
                        {item.SetupDetailName}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroupInput
                  label="Fund required"
                  name="fundRequired"
                  onChange={handleInputChangeSecondary}
                  value={valuesSecondary.fundRequired}
                  required={true}
                  disabled={paymentScheduleExist || role}
                  isNumber="true"
                />
              </Col>

              <Col md={3}>
                <FormGroupInput
                  label="Repetition"
                  name="repeatition"
                  onChange={handleInputChangeSecondary}
                  value={valuesSecondary.repeatition}
                  required={true}
                  disabled={
                    role ||
                    (parseInt(valuesSecondary.frequency) ===
                    SetupMasterDetailsConstantsValues.FrequencyOneTime
                      ? true
                      : role)
                  }
                  isNumber="true"
                />
              </Col>
              <Col md={3}>
                <FormGroupInput
                  label="Total Fund Required"
                  name="totalFundRequired"
                  value={valuesSecondary.totalFundAmount}
                  onChange={handleInputChangeSecondary}
                  required={true}
                  disabled={true}
                  isNumber="true"
                />
              </Col>
            </Row>
            <Row form>
              <Col md={9}>
                <FormGroup>
                  <Label for="">Remarks</Label>
                  <Input
                    type="text"
                    className="form-control"
                    id="txtRemarks"
                    name="remarks"
                    disabled={paymentScheduleExist || role}
                  />
                </FormGroup>
              </Col>

              <Col md={3}>
                <FormGroup>
                  {role ? null : (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => addSecondarySupportArr()}
                    >
                      Add
                    </Button>
                  )}
                  {role ? null : (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() =>
                        Swal.fire({
                          customClass: {
                            container: "my-swal",
                          },
                          text: "Are you sure to Save the record?",
                          icon: "success",
                          showCancelButton: true,
                          cancelButtonText: `Cancel`,
                          cancelButtonColor: "#2f4050",
                          confirmButtonText: `Confirm`,
                          confirmButtonColor: "#bf1e2e",
                        }).then((result) => {
                          if (result.isConfirmed) {
                    
                            SaveSupport(2).then((result) => {
                              if (result !== undefined) {
                                if (
                                  result?.data?.DataSet?.Table2[0]?.haserror > 0
                                ) {
                                  Swal.fire({
                                    title: "Error",
                                    text: result?.data?.DataSet?.Table2[0]
                                      ?.Message,
                                    icon: "error",
                                  });

                                  return;
                                } else {
                                  Swal.fire({
                                    title: "Success",
                                    text: result?.data?.DataSet?.Table2[0]
                                      ?.Message,
                                    icon: "success",
                                  });
                                }
                              }
                            });
                          }
                        })
                      }
                    >
                      Save
                    </Button>
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>

          <Row form className="mt-2">
            <Col md={12}>
              <h2 className="h6">Secondary Support Details</h2>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Table bordered striped responsive>
                <thead>
                  <tr>
                    <th>Sr #</th>
                    <th>Family Member </th>
                    <th>Self/Relation </th>
                    <th>Fund Category</th>
                    <th>Fund Sub Category</th>
                    <th>Frequency</th>
                    <th>Fund Required</th>
                    <th>Repetition</th>
                    <th>Total Fund Amount</th>
                    
                    {role ? null : (
                      <th className="text-center" style={{ width: 150 }}>
                        Action
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {secondarySupportList ? (
                    secondarySupportList.map((row, index) => (
                      <tr>
                        <td key={GetUniqueStringValue()}>{index + 1}</td>
                        <td key={GetUniqueStringValue()}>
                          {row.familyMemberName}
                        </td>
                        <td key={GetUniqueStringValue()}>{row.relationName}</td>
                        <td key={GetUniqueStringValue()}>{row.categoryName}</td>
                        <td key={GetUniqueStringValue()}>
                          {row.fundCategoryName}
                        </td>
                        <td key={GetUniqueStringValue()}>
                          {row.frequencyName}
                        </td>
                        <td key={GetUniqueStringValue()}>{row.fundRequired}</td>
                        <td key={GetUniqueStringValue()}>{row.repeatition}</td>
                        <td key={GetUniqueStringValue()}>
                          {row.totalFundAmount}
                        </td>
                        
                        {role ? null : (
                          <td className="text-center">
                            <Button
                              color="primary"
                              className="btn-circle"
                              size="sm"
                              onClick={(e) => {
                                setValuesSecondary(row);
                                setEditSNo(index + 1);
                              }}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i>
                            </Button>
                            <Button
                              color="danger"
                              className="btn-circle"
                              size="sm"
                              onClick={() => {
                                RemoveRow(index, false);
                              }}
                            >
                              <i className="nc-icon nc-simple-remove"></i>
                            </Button>
                          </td>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/*Secondary support*/}
    </div>
  );
};

export default PrimarySupport;
