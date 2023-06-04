import FormGroupTable from "components/GeneralComponent/FormGroupTable";
import React, { useState, useEffect, Fragment } from "react";
import {
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Card,
  CardHeader,
  CardBody,
  Table,
  ModalFooter,
  Button,
  Label,
} from "reactstrap";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api";
import * as api from "utils/Api";
import SabSathDefault from "../../assets/img/SabSathDefault.png";


export const ModalCNIC_Wise = (props) => {
  
  const [AppInvestigationId, setAppInvestigationId] = useState();
 
  const [ApplicantList, setApplicantList] = useState([]);
  const { handleGetValue } = props;
  
  const [historyModal, setHistoryModal] = useState(false);
  const [PersInformation_Table, setPersInformation_Table] = useState([]);
  const [familyInformation_Table, setfamilyInformation_Table] = useState([]);
  const [EducationDetails_Table, setEducationDetails_Table] = useState([]);
  const [MedicalDetails_Table, setMedicalDetails_Table] = useState([]);
  const [MonthlyExpDetails_Table, setMonthlyExpDetails_Table] = useState([]);
  const [GuardiansDetails_Table, setGuardiansDetails_Table] = useState([]);
  const [AssetsInformation_Table, setAssetsInformation_Table] = useState([]);
  const [LoanComatee_Table, setLoanComatee_Table] = useState([]);
  const [PetDetails_Table, setPetDetails_Table] = useState([]);
  const [SourceofDWater_Table, setSourceofDWater_Table] = useState([]);
  const [PrimarySupport_Table, setPrimarySupport_Table] = useState([]);
  const [SecondarySupport_Table, setSecondarySupport_Table] = useState([]);
  const [EarningDetails_Table, setEarningsDetails_Table] = useState([]);
  const [Approvalshistory_Table, setApprovalshistory_Table] = useState([]);
  const [Approvals_Table, setApprovals_Table] = useState([]);
  const [PaymentHistory_Table, setPaymentHistory_Table] = useState([]);
  const [PaymentSchedule_Table, setPaymentSchedule_Table] = useState([]);


  const [rows, setRows] = useState([]);

  function toggle() {
    props.closeNewmodal();
  }

  const columns = [
    {
      field: "InvestigationDate",
      name: "Investigation Date",
    },
    {
      field: "InvestigatorName",
      name: "Investigator Name",
    },
    {
      field: "CaseStatus",
      name: "Case Status",
    },
    {
      field: "Remarks",
      name: "Remarks",
    },
  ];

  const PersInformation_Table_columns = [
   {
      field: "FatherName",
      name: "Father Name",
    },
    {
      field: "DateOfBirth",
      name: "Date Of Birth",
    },
    {
      field: "Gender",
      name: "Gender",
    },

    

    {
      field: "AlternateContactNo",
      name: "Alternate ContactNo",
    },

    {
      field: "CaseNature",
      name: "Case Nature",
    },

    {
      field: "City",
      name: "City",
    },

    {
      field: "Area",
      name: "Area",
    },

    {
      field: "CaseTitle",
      name: "CaseTitle",
    },

    {
      field: "CaseExpiry",
      name: "CaseExpiry",
    },

    {
      field: "IsCaseofthe_Day",
      name: "Case Day",
    },

    {
      field: "IsCaseShow",
      name: "Case Show",
    },

    {
      field: "NoofFamilyAccompanying",
      name: "NoofFamily Accompanying",
    },

    {
      field: "NoofHouseholdMember",
      name: "NoofHouse holdMember",
    },

    {
      field: "TemperoryAddresss",
      name: "Temperory Addresss",
    },

    {
      field: "PermanentAddress",
      name: "Permanent Address",
    },

    {
      field: "FamilyNumber",
      name: "Family Number",
    },
    {
      field: "PrimaryFundCat",
      name: "Primary Fund Cat",
    },
    {
      field: "FundAmount_Required",
      name: "Fund Amount Required",
    },
    
    {
      field: "IsJoinFamily",
      name: "IsJoinFamily",
    },
  ];
  const FamilyInfo_Columns = [
    {
      field: "Name",
      name: "Name",
    },
    {
      field: "CNIC_B_FormNumber",
      name: "CNIC/B Form Number",
    },
    {
      field: "Mother_Father_HusbandName",
      name: "Mother/Father/Husband Name",
    },
    {
      field: "DateOfBirth",
      name: "Date Of Birth",
    },
    {
      field: "DateOfDeath",
      name: "Date Of Death",
    },

    {
      field: "Religion",
      name: "Religion",
    },

    {
      field: "Gender",
      name: "Gender",
    },
    {
      field: "Marital_Status",
      name: "Marital Status",
    },

    {
      field: "Contact_Type",
      name: "Contact Type",
    },

    {
      field: "Contact_Number",
      name: "Contact Number",
    },

    {
      field: "Remarks",
      name: "Remarks",
    },

    {
      field: "CanRead",
      name: "CanRead",
    },

    {
      field: "CanWrite",
      name: "CanWrite",
    },

    {
      field: "IsEmployeed",
      name: "IsEmployeed",
    },

    {
      field: "JobRemarks",
      name: "Job Remarks",
    },

    {
      field: "LastWorkExperience",
      name: "Last Work Experience",
    },

    {
      field: "IsPartOfBannedOrg",
      name: "Part Of BannedOrg",
    },

    {
      field: "IsInvolveInCriminalActivity",
      name: "Criminal Activity",
    },

    {
      field: "HasMedicalHistory",
      name: "Medical History",
    },
  ];
  const EducationDetails_Columns = [
    {
      field: "Academic",
      name: "Academic",
    },
    {
      field: "ProgramName",
      name: "Program Name",
    },
    {
      field: "Degree",
      name: "Degree",
    },
    {
      field: "ClassyearSemester",
      name: "Class year Semester",
    },

    {
      field: "Grade_Percentage_CGPA_Marks",
      name: "Grade Percentage CGPA Marks",
    },

    {
      field: "YearOfCompletion",
      name: "Year Of Completion",
    },

    {
      field: "Location",
      name: "Location",
    },

    {
      field: "Educational_ContactNo",
      name: "Educational ContactNo",
    },

    {
      field: "NameOfInstitute",
      name: "Name Of Institute",
    },
  ];
  const MedicalDetails_Columns = [
    {
      field: "Eligible",
      name: "Eligible/Disability/Disase",
    },
    {
      field: "Amount",
      name: "Amount",
    },
    {
      field: "HospitalName",
      name: "Hospital Name",
    },

    {
      field: "HospitalContactNo",
      name: "Hospital ContactNo",
    },
    {
      field: "HospitalAddress",
      name: "Hospital Address",
    },

     {
      field: "DoctorName",
      name: "Doctor Name",
    },

    {
      field: "Doctor ContactNo",
      name: "Doctor ContactNo",
    },

    
  ];
  const Guardian_Columns = [
    {
      field: "GuardianCnic",
      name: "GuardianCnic",
    },
    {
      field: "GuardianName",
      name: "GuardianName",
    },

    {
      field: "GuardianContactNo",
      name: "GuardianContactNo",
    },

    {
      field: "Occupation",
      name: "Occupation",
    },

    {
      field: "Relation",
      name: "Relation",
    },

    {
      field: "CompanyName",
      name: "CompanyName",
    },
  ];
  const MonthlyExpanse_Columns = [
    {
      field: "Expnse",
      name: "Expense",
    },
    {
      field: "Amount",
      name: "Amount",
    },
  ];
  const Earnings_Columns = [
    {
      field: "JobStatus",
      name: "JobStatus",
    },
    {
      field: "EarningAmount",
      name: "Earning Amount",
    },

    {
      field: "LastCompanyName",
      name: "LastCompanyName",
    },
    {
      field: "Remarks",
      name: "Remarks",
    },
  ];
  const AssetInformation_Columns = [
    {
      field: "AssetInfoType",
      name: "Asset Information Type",
    },
    {
      field: "AssetType",
      name: "AssetType",
    },

    {
      field: "AssetSubType",
      name: "Asset Sub Type",
    },

    {
      field: "Mortgagee_LandlordName",
      name: "Mortgagee Landlord Name",
    },

    {
      field: "Mortagagee_LandlordContactNumber",
      name: "Mortagagee Land lord Contact Number",
    },

    {
      field: "Mortgagee_LandlordAddress",
      name: "Mortgagee LandlordAddress",
    },

    {
      field: "AssetStatus",
      name: "AssetStatus",
    },
      
  ];
  const LoanComatee_Columns = [
    {
      field: "loantype",
      name: "loan type",
    },
    {
      field: "LoanAmount",
      name: "Loan Amount",
    },

    {
      field: "BalanceAmount",
      name: "Balance Amount",
    },

    {
      field: "Remarks",
      name: "Remarks",
    },

    
      
  ];
  const Pets_Columns = [
    {
      field: "PetName",
      name: "Pet Name",
    },
    {
      field: "Quantity",
      name: "Quantity",
    },
  ];
  const SourceofDrinkwater_Columns = [
    {
      field: "typeName",
      name: "type Name",
    },
    {
      field: "typedetailname",
      name: "Type detail name",
    },
  ];
  const PrimarySupport_Columns = [
    // {
    //   field: "Sr#",
    //   name: "Sr #",
    // },
    {
      field: "familyMemberName",
      name: "Family Member",
    },

    {
      field: "relationName",
      name: "Self/Relation",
    },

    {
      field: "categoryName",
      name: "Fund Category",
    },

    {
      field: "fundCategoryName",
      name: "Fund Sub Category",
    },

    {
      field: "frequencyName",
      name: "Frequency",
    },

    {
      field: "fundRequired",
      name: "Fund Required",
    },

    {
      field: "repeatition",
      name: "Repetition",
    },

    {
      field: "totalFundAmount",
      name: "Total Fund Amount",
    },
  ];
  const SecondarySupport_Columns = [
    {
      field: "familyMemberName",
      name: "Family Member",
    },

    {
      field: "relationName",
      name: "Self/Relation",
    },

    {
      field: "categoryName",
      name: "Fund Category",
    },

    {
      field: "fundCategoryName",
      name: "Fund Sub Category",
    },

    {
      field: "frequencyName",
      name: "Frequency",
    },

    {
      field: "fundRequired",
      name: "Fund Required",
    },

    {
      field: "repeatition",
      name: "Repetition",
    },

    {
      field: "totalFundAmount",
      name: "Total Fund Amount",
    },
    
    
  ];
  const ApprovalHistory_Columns = [
    {
      field: "ActionBy",
      name: "Action By",
    },
    {
      field: "Status",
      name: "Status",
    },
    {
      field: "AmountApproved",
      name: "Amount Approved",
    },
    {
      field: "Remarks",
      name: "Remarks",
    },
    {
      field: "Investigator",
      name: "Investigator",
    },
    {
      field: "CreatedDate",
      name: "Date",
    },
  ];
  const Approval_Columns = [
   {
      field: "FamilyMember",
      name: "FamilyMember",
    },
    {
      field: "Relation",
      name: "Self/Relation",
    },
    {
      field: "FundCategory",
      name: "Fund Category",
    },
    {
      field: "FundSubCategory",
      name: "Fund Sub Category",
    },

    {
      field: "AmountApproved",
      name: "Fund Approved",
    },

    {
      field: "ApprovedFundPercent",
      name: "%age",
    },

    {
      field: "Frequency",
      name: "Frequency",
    },

    {
      field: "TotalAmount",
      name: "Total Amount",
    },

    {
      field: "Months",
      name: "Month",
    },
  ];
  const columns_PaymentSchedule = [
    {
      field: "SupportType",
      name: "Support Type",
    },
    {
      field: "FundCategory",
      name: "Fund Category",
    },
    {
      field: "FundSubCategory",
      name: "Fund Sub Category",
    },
    {
      field: "PaymentSchedule_Date",
      name: "Payment Schedule Date",
    },
    {
      field: "Amount",
      name: "Amount",
    },
    {
      field: "PaymentFrequency",
      name: "Payment Frequency",
    },
  ];
  const columns_PaymentHistory = [
    {
      field: "VoucherNo",
      name: "Voucher No",
    },
    {
      field: "PaymentSchedule_Date",
      name: "Payment Schedule Date",
    },
    {
      field: "Amount",
      name: "Amount",
    },
    {
      field: "PaymentSchedule_Date",
      name: "Payment Schedule Date",
    },
    {
      field: "Amount",
      name: "Amount",
    },
    {
      field: "PaymentStatus",
      name: "Payment Status",
    },
  
    {
      field: "PaymentType",
      name: "Payment Type",
    },
   
  ];

  const toggleModal_Viewopen = (investegationid) => {
  
    setHistoryModal(!historyModal);
    requestCall(investegationid);
  };

  const toggleModal_View = () => {
  
    setHistoryModal(!historyModal);
    
  };

  const requestCall = (investegationid) => {
      fetchData("Applicant", "GetApplicantCaseHistory", {
        OperationId: 1,
        ApplicantCase_InvestigationId: investegationid,
      }).then((result) => {
        setRows(result?.DataSet?.Table);
        setPersInformation_Table(result?.DataSet?.Table1);
         setfamilyInformation_Table(result?.DataSet?.Table2);
         setEducationDetails_Table(result?.DataSet?.Table3);
         setMedicalDetails_Table(result?.DataSet?.Table4);
         setMonthlyExpDetails_Table(result?.DataSet?.Table5);
         setGuardiansDetails_Table(result?.DataSet?.Table6);
         setEarningsDetails_Table(result?.DataSet?.Table7);
  
         setAssetsInformation_Table(result?.DataSet?.Table8);
         setLoanComatee_Table(result?.DataSet?.Table9);
         setPetDetails_Table(result?.DataSet?.Table10);
         setSourceofDWater_Table(result?.DataSet?.Table11);
         setPrimarySupport_Table(result?.DataSet?.Table12);
         setSecondarySupport_Table(result?.DataSet?.Table13);
         setApprovalshistory_Table(result?.DataSet?.Table14);
         setApprovals_Table(result?.DataSet?.Table15);
  
         setPaymentHistory_Table(result?.DataSet?.Table16);
         setPaymentSchedule_Table(result?.DataSet?.Table17);
  
        
      });
    };

  useEffect(() => {
   
    const fetchDataLsit = () => {
      
      fetchData("WebSite", "DonationSubmit_CRM", {
        OperationID: 4,
        CnicNo: props.logId,
      }).then((result) => {
        if (result?.DataSet?.Table[0]?.HasError > 0) {
          setAppInvestigationId(result?.DataSet?.Table[0].ApplicantCase_InvestigationId)
         // 
          Swal.fire({
            title: "Error",
            text: result.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        }
        setApplicantList(result?.DataSet?.Table);
      });
    };
    fetchDataLsit();
    handleGetValue();
  }, []);



  return (
    <Fragment>
     <Modal
      isOpen={props.Ismodalshow}
      toggle={toggle}
      size="lg"
      backdrop="static"
    >
      <ModalHeader toggle={toggle}>{props.HeaderText}</ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={12} md={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col lg={6} md={6}>
                    Applicant List
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Applicant Case ID</th>
                      <th>Applicant Name</th>
                      <th>Case Code</th>
                      <th>Main Category</th>
                      <th>Action</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ApplicantList &&
                      ApplicantList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.ApplicantCaseId}</td>
                          <td>{item.ApplicantName}</td>
                          <td>{item.ApplicantCaseCode}</td>
                          <td>{item.SetupDetailName}</td>
                          <td>
                          <Button color="primary" type="submit" size="sm"   onClick={()=>toggleModal_Viewopen(item.ApplicantCase_InvestigationId)}
                           >
                              View
                            </Button>
                          </td>
                          <td className="text-center">
                            <input
                              type="radio"
                              name="ApplicantCaseCode"
                               onChange={(e)=> handleGetValue(
                                `${item.ApplicantCaseId},${item.ApplicantName},${item.ApplicantCaseCode},${item.SetupDetailName}`
                                )}
                            />
                          </td>

                       
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" type="submit" size="sm" onClick={toggle}>
          Add
        </Button>
        {/* <Button color="secondary" size="sm" onClick={toggle}>
          Close
        </Button> */}
      </ModalFooter>
    </Modal>
  {/* =======================================================second Modal================================================ */}
    <Modal
        isOpen={historyModal}
        toggle={toggleModal_View}
        size="xl"
        backdrop="static"
      >
        <ModalHeader toggle={toggleModal_View}>
          Applicant Case Wise History
        </ModalHeader>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Identification</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md={3}>
              <img
                  name="imgApplicant"
                  src={
              
                    PersInformation_Table[0]?.ApplicantPhoto === null ||
                    PersInformation_Table[0]?.ApplicantPhoto === ""
                      ? SabSathDefault
                      : api.baseImageUrl +
                        PersInformation_Table[0]?.ApplicantPhoto
                  }
                  style={{
                    height: "130px",
                    width: "100%",
                    objectFit: "contain",
                    overflow: "hidden",
                    
                  }}
                />
              </Col>
                 <Col md={4}>
                <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"Applicant Name : "}
                </Label>
                <strong>{PersInformation_Table[0]?.ApplicantName}</strong>
                <br />
                 <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"Applicant Case Code : "}
                </Label>
                <strong>
                  {" " + PersInformation_Table[0]?.ApplicantCaseCode}
                </strong>{" "}
                <br />
                <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"CNIC : "}
                </Label>
                <strong>{" " + PersInformation_Table[0]?.CnicNo}</strong> <br />
                <Label
                  style={{
                    fontSize: 13,
                    marginBottom: 2,
                    color: "rgb(214, 11, 17)",
                    fontWeight: "500",
                  }}
                >
                  {"Primary Contact # : "}
                </Label>
                <strong>
                  {" " + PersInformation_Table[0]?.PrimaryContactNo}
                </strong>{" "}
               
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
         
          <CardBody>
            <Row>
              <Col>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">
              Applicant Personal Information
            </h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={PersInformation_Table}
                  columns={PersInformation_Table_columns}
                   hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">
              Applicant Family Information
            </h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={familyInformation_Table}
                  columns={FamilyInfo_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Education Details</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={EducationDetails_Table}
                  columns={EducationDetails_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">
              Medical CARD / DISABILITY / DISEASE Details
            </h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={MedicalDetails_Table}
                  columns={MedicalDetails_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Monthly Expense Details</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={MonthlyExpDetails_Table}
                  columns={MonthlyExpanse_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Earning Details</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={EarningDetails_Table}
                  columns={Earnings_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Guardians Details</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={GuardiansDetails_Table}
                  columns={Guardian_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        
       
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Asset Information</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={AssetsInformation_Table}
                  columns={AssetInformation_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Loan/Comatee</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={LoanComatee_Table}
                  columns={LoanComatee_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>


        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Pets Details</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={PetDetails_Table}
                  columns={Pets_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Source of Drinking Water</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={SourceofDWater_Table}
                  columns={SourceofDrinkwater_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Primary Support</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={PrimarySupport_Table}
                  columns={PrimarySupport_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Secondary Support</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={SecondarySupport_Table}
                  columns={SecondarySupport_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Approval History </h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={Approvalshistory_Table}
                  columns={ApprovalHistory_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Approvals</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={Approvals_Table}
                  columns={Approval_Columns}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Payment History</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={PaymentHistory_Table}
                  columns={columns_PaymentHistory}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
        <Card className="mb-3">
          <CardHeader>
            <h6 className="font-weight-bold mb-0">Payment Schedule</h6>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormGroupTable
                  rows={PaymentSchedule_Table}
                  columns={columns_PaymentSchedule}
                  hideAction={true}
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
</Modal>
</Fragment>

  );
};

export default ModalCNIC_Wise;
