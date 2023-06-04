export const BindDropDown = (array) => {
  array.map((item, key) => {
    return (
      <option key={item.RoleId} value={item.RoleId}>
        {item.RoleName}
      </option>
    );
  });
};

export const PrimaryinitialValues = {
  ApplicantCaseId: 0,
  ApplicationDate: "",
  ApplicantId: 0,
  FullName: "",
  CNIC: "",
  GenderId: "0",
  AccompFamilyMember: "",
  FamilyNumber: "",
  TotalFamilyMembers: 1,
  DOB: "",
  Age: "",
  ContactNumber: "",
  Father_HusbandName: "",
  ProvinceId: "",
  CityId: "0",
  UnionId: "0",
  CouncilId: "0",
  Village_MuhallaId: "0",
  NoOfHouseholdMember: "",
  TemporaryAddress: "",
  PermanentAddress: "",
  InvestigatingOfficerId: "",
  Time: "",
  Referrer: "",
  NatureOfCaseId: "",
  IsCriminalActivity: false,
  IsPartOfBannedOrg: false,
  GenderList: [],
  ProvinceList: [],
  CityList: [],
  UnionList: [],
  CouncilList: [],
  VillageMuhallaList: [],
  NatureOfCaseList: [],
  InvestigatingOfficerList: [],
  ExpenseDdl: [],
  ExpenseId: "0",
};
export const PersonalinitialValues = {};
export const FamilyInitialValues = {
  FamilyMemberNo: "",
  Name: "",
  RelationId: "0",
  Cnic: "",
  DOB: "",
  MaritalStatusId: "0",
  Remarks: "",
  IsEmployed: false,
  Earnings: 0,
  DetailsOfEarning: "",
  RelationList: [],
  MaritalList: [],
  FamilyDetailGridList: [],
  FamilyDetailList: [],
};
export const EducationDetailinitialValues = {};
export const MedicalDetailinitialValues = {};
export const MonthlyExpenseInitialValues = {
  ExpenseDdl: [],
  ExpenseGridList: [],
  ExpenseId: "0",
  ExpenseValue: 0,
};

export const GeneralAdditionalDetailInitialValues = {
  GuardianCnic: "",
  GuardianName: "",
  OccupationId: "0",
  Occupationddl: [],
  CompanyId: "0",
  Companyddl: [],
  ReferrerId: "0",
  Referrerddl: [],
  BeneficiaryId: "0",
  Beneficiaryddl: [],
  AssistanceDetailddl: [],
  AssistanceDetailId: "0",
  IsRelativeWorking: false,
  OrganizationId: "0",
  Organizationddl: [],
  RelativeDetail: "",
  Remarks: "",
};

export const PetsInitialValues = {
  petsddlList: [],
  petId: "0",
  Quantity: "",
  ExpenseAmount: "",
  PetsGridList: [],
};
export const DrinkSanitationInitialValues = {
  SourceDrinkddl: [],
  SourceDrinkId: "0",
  IsToiletPresent: false,
};
export const DiseaseDisableInitialValues = {
  DisableDetailValue: "",
  DiseaseDetailValue: "",
  IsDiseaseChecked: false,
  IsDisableChecked: false,
};
export const LoanInitialValues = {
  LoanTypeddlList: [],
  LoanTypeId: "0",
  Purpose: "",
  LoanAmount: 0,
  DurationInMonth: 0,
  MonthlyInstallment: 0,
  StartDate: "",
  EndDate: "",
  Remarks: "",
  LoanGrid: [],
};
export const CommitteInitialValues = {
  Purpose: "",
  CommitteAmount: 0,
  DurationInMonth: 0,
  MonthlyInstallment: 0,
  StartDate: "",
  EndDate: "",
  Remarks: "",
  CommitteGrid: [],
};
export const AssetsInitialValues = {
  AssetsTypeId: 0,
  AssetsStatusId: 0,
  AssetsDetail: "",
  RentAmount: 0,
  MortgageDetail: "",
  AssetsGrid: [],
};
export const HomeAppInitialValues = {
  Tv: false,
  AC: false,
  WashingMachine: false,
  Phone: false,
  SewingMachine: false,
  CouchSofa: false,
  GasHeater: false,
  Refrigerator: false,
  AirCooler: false,
  Dispenser: false,
  HomeAppDetail: "",
};
export const SupportingDocInitialValues = {
  SupportFile: "",
  SupportDocumnetTypeId: 0,
  SupportDocumnetTypeddl: [],
  SuppFileNameValue: "a",
  SelectedFiles: "",
  SupportDocGrid: [],
};
export const AdditionDocInitialValues = {
  DocumnetTypeId: 0,
  DocumnetTypeddl: [],
  DocumnetSubTypeId: 0,
  DocumnetSubTypeddl: [],
  FileName: "",
  SelectedFile: "",
  AdditionalDocGrid: [],
  FilteredDocumentSubType: [],
};
export const PrimarySupportInitialValues = {
  CategoryId: 0,
  Categoryddl: [],
  FundCategoryId: 0,
  FundCategoryddl: [],
  FrequencyId: 0,
  Frequencyddl: [],
  Repetition: 0,
  FundRequired: 0,
  StartDate: "",
  ExpiryDate: "",
  PaymentTypeId: 0,
  PaymentTypeddl: [],
  ReInvestigationDate: "",
  Remarks: "",
  FilteredFundCategory: [],
  PrimarySupportGrid: [],
};
export const SecondarySupportInitialValues = {
  CategoryId: 0,
  Categoryddl: [],
  FundCategoryId: 0,
  FundCategoryddl: [],
  FrequencyId: 0,
  Frequencyddl: [],
  Repetition: 0,
  FundRequired: 0,
  StartDate: "",
  ExpiryDate: "",
  PaymentTypeId: 0,
  PaymentTypeddl: [],
  ReInvestigationDate: "",
  Remarks: "",
  FilteredFundCategory: [],
  SecondarySupportGrid: [],
};
export const GetSetupDetail_Name = (SetupDetailId, SetupDetailList) => {
  var filterdata = "";
  if (
    SetupDetailId > 0 &&
    SetupDetailId != undefined &&
    SetupDetailId != null
  ) {
    filterdata = SetupDetailList.filter(
      (p) => p.SetupDetailId === parseInt(SetupDetailId)
    )[0].SetupDetailName;
    return filterdata;
  }
};

export const transformDateToISO = (date) => {
  const timeElapsed = date;
  const today = new Date(timeElapsed);
  return today.toISOString();
};

export const transformISOtoDate = (date) => {
  let dateIso = new Date(date);
  return `${
    dateIso.getMonth() + 1
  }-${dateIso.getDate()}-${dateIso.getFullYear()}`;
};
