/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
//import React, { useState, useEffect } from 'react';
import Dashboard from "views/Dashboard.js"
// import Notifications from "views/Notifications.js";
// import Icons from "views/Icons.js";
// import Typography from "views/Typography.js";
// import TableList from "views/Tables.js";
// import Maps from "views/Map.js";
import UserPage from "views/User.js"
// import UpgradeToPro from "views/Upgrade.js";
import SetupUsers from "views/SetupUsers.js"
import Roles from "views/Roles.js"
import Beneficiary from "views/Beneficiary.js"
import Category from "views/Category.js"
import Company from "views/Company.js"
import CompanyFamily from "views/CompanyFamily.js"
import CompanyLocation from "views/CompanyLocation.js"
import Frequency from "views/Frequency.js"
import MenuList from "views/MenuList.js"
import ApplicantDetail from "views/ApplicantDetail.js"
import Counseling from "views/Counseling"
// import ApplicantList from "views/ApplicantList.js";
import ApplicantListing from "views/ApplicantListing.js"
import PaymentType from "views/PaymentType.js"
import RolesAccess from "views/RolesAccess.js"
import FundCategory from "views/FundCategory.js"
import AcademicLevel from "views/AcademicLevel.js"
import Report_Job_List from "views/Reports/Report_Job_List.js"
import Report_Institute_Wise from "views/Reports/Report_Institute_Wise.js"
import Report_Patient_List from "views/Reports/Report_Patient_List.js"

import Report_Payment_Reverse_Disburs from "views/Reports/Report_Payment_Reverse_Disburs.js"

import Report_Subscription_Info_list from "views/Reports/Report_Subscription_Info_list.js"

import AcceptanceOfCharity from "views/AcceptanceOfCharity"
import AssetType from "views/AssetType"
import AssetSubType from "views/AssetSubType"
import Diseases from "views/Diseases"
import DocumentType from "views/DocumentType"
import DocumentSubType from "views/DocumentSubType"
import DonationType from "views/DonationType"
import Expense from "views/Expense"
import HomeApplaince from "views/HomeApplaince"
import Pets from "views/Pets"
import Referrer from "views/Referrer"
import SourceOfDrinkingWater from "views/SourceOfDrinkingWater"
import Relation from "views/Relation"
import Disability from "views/Disability"
import JobList from "views/JobList"
import Country from "views/Country"
import CounselingList from "views/CounselingList"
import Province from "views/Province"
import City_Village from "views/City_Village"
import District from "views/District"
import Union from "views/Union"
import Area from "views/Area"
import Religion from "views/Religion"
import Bank from "views/Bank"
import Fund_Sub_Category from "views/Fund_Sub_Category"

import ApplicantList_New from "views/ApplicantList_New.js"
import ApplicantDetail_New from "views/ApplicantDetail_New"

import Marketing from "views/Marketing.js"
import Report_Applicant_Case_List from "views/Reports/Report_Applicant_Case_List"
import Report_Payment_List from "views/Reports/Report_Payment_List"
import Report_Donor_List from "views/Reports/Report_Donor_List"
import Report_Referral_List from "views/Reports/Report_Referral_List"
import Report_Company_List from "views/Reports/Report_Company_List"
import MarketingList from "views/MarketingList"
import Donor from "views/Donor"
import BlogList from "views/BlogList"
import TestimonailList from "views/TestimonialList"
import MedicalCard from "views/MedicalCard"
import PaymentListing from "views/Pages/PaymentListing"
import EarningDetails from "components/Tabs/EarningDetail"
import SuccessStories from "components/HomeComponent/SuccessStories"
import SuccessStories_AfterApproved from "views/SuccessStories_AfterApproved"
import PaymentMaster from "views/PaymentMaster"
import PaymentDisbursed from "views/PaymentDisbursed"
import Degree from "views/Degree.js"
import ChangePassword from "views/Pages/ChangePassword"

import Report_DonationHistory from "views/Reports/Report_DonationHistory"
import TermsAndConditions from "views/Pages/TermsAndConditions"
import Report_Donation_List from "views/Reports/Report_Donation_List"
import PhyscialAudit from "views/Reports/PhysicalAudit"
import CustomerQueries from "views/Reports/Report_Customer_Queries"
import Report_Subscription_List_Admin from "views/Reports/Report_Subscription_List_Admin"
import NGOs from "views/NGOs"
import Report_Task_Scheduler from "views/Reports/Report_Task_Scheduler"
import MarketingContentModule from "views/MarketingContentModule"
import Report_Case_Donation_Details from "views/Reports/Report_Case_Donation_Details"
import EducationalCounselling from "views/EducationalCounselling"
//import {fetchData} from 'utils/Api.js'

var routes = [
  {
    path: "/ApplicantDetail/:id",
    name: "ApplicantDetail",
    icon: "nc-icon nc-single-02",
    component: ApplicantDetail,
    layout: "/admin",
  },
  {
    path: "/ApplicantDetail_New",
    name: "ApplicantDetail New",
    icon: "nc-icon nc-single-02",
    component: ApplicantDetail_New,
    layout: "/admin",
  },
  {
    path: "/Beneficiary",
    name: "Beneficiary",
    icon: "nc-icon nc-single-02",
    component: Beneficiary,
    layout: "/admin",
  },
  {
    path: "/FundCategory",
    name: "FundCategory",
    icon: "nc-icon nc-single-02",
    component: FundCategory,
    layout: "/admin",
  },
  {
    path: "/Report_Payment_List",
    name: "Payment List",
    icon: "nc-icon nc-single-02",
    component: Report_Payment_List,
    layout: "/admin",
  },
  {
    path: "/Report_Patient_List",
    name: "Patient List",
    icon: "nc-icon nc-single-02",
    component: Report_Patient_List,
    layout: "/admin",
  },
  {
    path: "/Report_Subscription_List",
    name: "Subscription List",
    icon: "nc-icon nc-single-02",
    component: Report_Subscription_List_Admin,
    layout: "/admin",
  },
  // {
  //   path: "/Report_TaskSchduler",
  //   name: "Task Scheduler",
  //   icon: "nc-icon nc-single-02",
  //   component: Report_Task_Scheduler,
  //   layout: "/admin",
  // },
  {
    path: "/Report_Donation_List",
    name: "Donation List",
    icon: "nc-icon nc-single-02",
    component: Report_Donation_List,
    layout: "/admin",
  },
  {
    path: "/Report_Donor_List",
    name: "Donor List",
    icon: "nc-icon nc-single-02",
    component: Report_Donor_List,
    layout: "/admin",
  },
  {
    path: "/Report_TaskSchduler",
    name: "Task Scheduler",
    icon: "nc-icon nc-single-02",
    component: Report_Task_Scheduler,
    layout: "/admin",
  },
  {
    path: "/Report_DonationHistory",
    name: "Donor List",
    icon: "nc-icon nc-single-02",
    component: Report_DonationHistory,
    layout: "/admin",
  },

  {
    path: "/Report_Institute_Wise",
    name: "Applicant Education Detail List",
    icon: "nc-icon nc-single-02",
    component: Report_Institute_Wise,
    layout: "/admin",
  },
  {
    path: "/Report_Referral_List",
    name: "Referral List",
    icon: "nc-icon nc-single-02",
    component: Report_Referral_List,
    layout: "/admin",
  },

  {
    path: "/Report_Company_List",
    name: "Company List",
    icon: "nc-icon nc-single-02",
    component: Report_Company_List,
    layout: "/admin",
  },
  {
    path: "/Report_Applicant_Case_List",
    name: "Applicant Case List",
    icon: "nc-icon nc-single-02",
    component: Report_Applicant_Case_List,
    layout: "/admin",
  },
  {
    path: "/Fund_Sub_Category",
    name: "Fund Sub Category",
    icon: "nc-icon nc-single-02",
    component: Fund_Sub_Category,
    layout: "/admin",
  },

  {
    path: "/MedicalCard",
    name: "Medical Card",
    icon: "nc-icon nc-single-02",
    component: MedicalCard,
    layout: "/admin",
  },
  {
    path: "/Degree",
    name: "Degree",
    icon: "nc-icon nc-single-02",
    component: Degree,
    layout: "/admin",
  },
  {
    path: "/AcademicLevel",
    name: "AcademicLevel",
    icon: "nc-icon nc-single-02",
    component: AcademicLevel,
    layout: "/admin",
  },

  {
    path: "/Report_Case_Donation_Details",
    name: "Report Case Donation Details",
    icon: "nc-icon nc-single-02",
    component: Report_Case_Donation_Details,
    layout: "/admin",
  },
  {
    path: "/Report_Subscription_Info_list",
    name: "Report Subscription Info list",
    icon: "nc-icon nc-single-02",
    component: Report_Subscription_Info_list,
    layout: "/admin",
  },
  {
    path: "/Report_Job_List",
    name: "Report_Job_List",
    icon: "nc-icon nc-single-02",
    component: Report_Job_List,
    layout: "/admin",
  },
  {
    path: "/DocumentSubType",
    name: "Document Sub Type",
    icon: "nc-icon nc-single-02",
    component: DocumentSubType,
    layout: "/admin",
  },
  {
    path: "/Province",
    name: "Province",
    icon: "nc-icon nc-single-02",
    component: Province,
    layout: "/admin",
  },
  {
    path: "/City_Village",
    name: "City / Village",
    icon: "nc-icon nc-single-02",
    component: City_Village,
    layout: "/admin",
  },
  {
    path: "/District",
    name: "District",
    icon: "nc-icon nc-single-02",
    component: District,
    layout: "/admin",
  },
  {
    path: "/Bank",
    name: "Bank",
    icon: "nc-icon nc-single-02",
    component: Bank,
    layout: "/admin",
  },
  {
    path: "/Religion",
    name: "Religion",
    icon: "nc-icon nc-single-02",
    component: Religion,
    layout: "/admin",
  },
  {
    path: "/Union",
    name: "Union",
    icon: "nc-icon nc-single-02",
    component: Union,
    layout: "/admin",
  },
  {
    path: "/Area",
    name: "Area",
    icon: "nc-icon nc-single-02",
    component: Area,
    layout: "/admin",
  },
  {
    path: "/DonationType",
    name: "Donation Type",
    icon: "nc-icon nc-single-02",
    component: DonationType,
    layout: "/admin",
  },

  {
    path: "/JobList",
    name: "Job List",
    icon: "nc-icon nc-single-02",
    component: JobList,
    layout: "/admin",
  },
  {
    path: "/Donor",
    name: "Donor",
    icon: "nc-icon nc-single-02",
    component: Donor,
    layout: "/admin",
  },
  {
    path: "/CounselingList",
    name: "Counselling List",
    icon: "nc-icon nc-single-02",
    component: CounselingList,
    layout: "/admin",
  },

  {
    path: "/Counseling",
    name: "Counseling",
    icon: "nc-icon nc-single-02",
    component: Counseling,
    layout: "/admin",
  },

  {
    path: "/MarketingList",
    name: "MarketingList",
    icon: "nc-icon nc-single-02",
    component: MarketingList,
    layout: "/admin",
  },
  {
    path: "/Marketing",
    name: "Marketing",
    icon: "nc-icon nc-single-02",
    component: Marketing,
    layout: "/admin",
  },

  {
    path: "/SuccessStories_AfterApproved",
    name: "SuccessStories_AfterApproved",
    icon: "nc-icon nc-single-02",
    component: SuccessStories_AfterApproved,
    layout: "/admin",
  },

  {
    path: "/HomeAppliance",
    name: "Home Appliances",
    icon: "nc-icon nc-single-02",
    component: HomeApplaince,
    layout: "/admin",
  },
  {
    path: "/Country",
    name: "Country",
    icon: "nc-icon nc-single-02",
    component: Country,
    layout: "/admin",
  },
  {
    path: "/Relation",
    name: "Relation",
    icon: "nc-icon nc-single-02",
    component: Relation,
    layout: "/admin",
  },

  {
    path: "/Disability",
    name: "Disability",
    icon: "nc-icon nc-single-02",
    component: Disability,
    layout: "/admin",
  },
  {
    path: "/Expense",
    name: "Expense",
    icon: "nc-icon nc-single-02",
    component: Expense,
    layout: "/admin",
  },
  {
    path: "/Pets",
    name: "Pets",
    icon: "nc-icon nc-single-02",
    component: Pets,
    layout: "/admin",
  },
  {
    path: "/AcceptanceOfCharity",
    name: "Acceptance Of Charity",
    icon: "nc-icon nc-single-02",
    component: AcceptanceOfCharity,
    layout: "/admin",
  },

  {
    path: "/AssetType",
    name: "Asset Type",
    icon: "nc-icon nc-single-02",
    component: AssetType,
    layout: "/admin",
  },

  {
    path: "/AssetSubType",
    name: "Asset Sub Type",
    icon: "nc-icon nc-single-02",
    component: AssetSubType,
    layout: "/admin",
  },

  {
    path: "/Diseases",
    name: "Diseases",
    icon: "nc-icon nc-single-02",
    component: Diseases,
    layout: "/admin",
  },
  {
    path: "/Termsandconditions",
    name: "Terms and Conditions",
    icon: "nc-icon nc-single-02",
    component: TermsAndConditions,
    layout: "/admin",
  },

  {
    path: "/DocumentType",
    name: "Document Type",
    icon: "nc-icon nc-single-02",
    component: DocumentType,
    layout: "/admin",
  },
  {
    path: "/SourceOfDrinkingWater",
    name: "Source Of Drinking Water",
    icon: "nc-icon nc-single-02",
    component: SourceOfDrinkingWater,
    layout: "/admin",
  },

  {
    path: "/Referrer",
    name: "Referrer",
    icon: "nc-icon nc-single-02",
    component: Referrer,
    layout: "/admin",
  },
  {
    path: "/Category",
    name: "Category",
    icon: "nc-icon nc-single-02",
    component: Category,
    layout: "/admin",
  },
  {
    path: "/NGOs",
    name: "NGO",
    icon: "nc-icon nc-single-02",
    component: NGOs,
    layout: "/admin",
  },
  {
    path: "/Company",
    name: "Company",
    icon: "nc-icon nc-single-02",
    component: Company,
    layout: "/admin",
  },
  {
    path: "/CompanyFamily",
    name: "CompanyFamily",
    icon: "nc-icon nc-single-02",
    component: CompanyFamily,
    layout: "/admin",
  },
  {
    path: "/CompanyLocation",
    name: "CompanyLocation",
    icon: "nc-icon nc-single-02",
    component: CompanyLocation,
    layout: "/admin",
  },
  {
    path: "/Frequency",
    name: "Frequency",
    icon: "nc-icon nc-single-02",
    component: Frequency,
    layout: "/admin",
  },
  {
    path: "/MenuList",
    name: "MenuList",
    icon: "nc-icon nc-single-02",
    component: MenuList,
    layout: "/admin",
  },
  {
    // path: "/ApplicantList",
    // name: "ApplicantList",
    // icon: "nc-icon nc-single-02",
    // component: ApplicantList,
    // layout: "/admin",

    path: "/ApplicantListing",
    name: "ApplicantListing",
    icon: "nc-icon nc-single-02",
    component: ApplicantListing,
    layout: "/admin",
  },
  {
    path: "/MarketingContentModule",
    name: "Modules",
    icon: "nc-icon nc-single-02",
    component: MarketingContentModule,
    layout: "/admin",
  },
  {
    path: "/ApplicantList_New",
    name: "ApplicantList New",
    icon: "nc-icon nc-single-02",
    component: ApplicantList_New,
    layout: "/admin",
  },
  {
    path: "/PhysicalAudit",
    name: "PhysicalAudit",
    icon: "nc-icon nc-single-02",
    component: PhyscialAudit,
    layout: "/admin",
  },
  {
    path: "/CustomerQueries",
    name: "CustomerQueries",
    icon: "nc-icon nc-single-02",
    component: CustomerQueries,
    layout: "/admin",
  },
  {
    path: "/PaymentMaster",
    name: "Payment Master",
    icon: "nc-icon nc-single-02",
    component: PaymentMaster,
    layout: "/admin",
  },
  {
    path: "/EducationalCounselling",
    name: "Educational Counselling",
    icon: "nc-icon nc-single-02",
    component: EducationalCounselling,
    layout: "/admin",
  },
  {
    path: "/paymentDisbursed",
    name: "Payment Disbursed",
    icon: "nc-icon nc-single-02",
    component: PaymentDisbursed,
    layout: "/admin",
  },
  {
    path: "/PaymentType",
    name: "PaymentType",
    icon: "nc-icon nc-single-02",
    component: PaymentType,
    layout: "/admin",
  },
  {
    path: "/RolesAccess",
    name: "RolesAccess",
    icon: "nc-icon nc-single-02",
    component: RolesAccess,
    layout: "/admin",
  },
  {
    // path: "/dashboard",
    path: "/Dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/SetupUsers",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: SetupUsers,
    layout: "/admin",
  },
  {
    path: "/Roles",
    name: "Roles",
    icon: "nc-icon nc-single-02",
    component: Roles,
    layout: "/admin",
  },
  {
    path: "/blogs",
    name: "Blogs",
    icon: "nc-icon nc-single-02",
    component: BlogList,
    layout: "/admin",
  },
  {
    path: "/Testimonials",
    name: "Testimonials",
    icon: "nc-icon nc-single-02",
    component: TestimonailList,
    layout: "/admin",
  },
  {
    path: "/paymentListing/:id",
    name: "PaymentListing",
    icon: "nc-icon nc-single-02",
    component: PaymentListing,
    layout: "/admin",
  },
  {
    path: "/EarningDetails",
    name: "Earning Details",
    icon: "nc-icon nc-single-02",
    component: EarningDetails,
    layout: "/admin",
  },
  {
    path: "/ChangePassword",
    name: "Change Password",
    icon: "nc-icon nc-single-02",
    component: ChangePassword,
    layout: "/admin",
  },

  // ==================add manzoor ============================

  {
    path: "/Report_Payment_Reverse_Disburs",
    name: "Payment Reverse Disburs",
    icon: "nc-icon nc-single-02",
    component: Report_Payment_Reverse_Disburs,
    layout: "/admin",
  },
]
export default routes
