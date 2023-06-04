import {
  fetchData,
  fetchData_MarketingCaseImages,
  postRecord,
  baseUrl,
} from "../utils/Api.js"
import {
  ApiMethods,
  ControllerName,
  OperationTypeId,
} from "../utils/Constants.js"
import Swal from "sweetalert2"
import axios from "axios"
import { transformDateToISO } from "./Common.js"
import ApplicantList from "views/ApplicantList.js"
import moment from "moment"
export const GetPaymentType = async (
  RequestData,
  ControllerName,
  ApiMethods
) => {
  try {
    var RequestData = { OperationId: OperationTypeId.Select }
    const data = await fetchData(
      ControllerName.Setup,
      ApiMethods.Frequency_Operation,
      RequestData
    )
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data.data
      } else {
        return []
      }
    } else {
      Swal.fire({ title: "Error", text: "Error", icon: "error" })
      return []
    }
  } catch (error) {
    return []
  }
}

export const FindAndGetNewArrayFromArray = (arrayObject, key, value) => {
  return arrayObject.filter(function (obj) {
    return obj[key] === value
  })
}

export const RemoveItemOfArrayAndGetNewObject = (arrayObject, key, value) => {
  return arrayObject.filter(function (obj) {
    return obj[key] !== value
  })
}

export const MarkCheckOutPayment = async (requestObject) => {
  const data = await fetchData(
    ControllerName.Website,
    ApiMethods.PayDonation,
    requestObject
  )
  if (data != null) {
    return data
  } else {
    return []
  }
}

export const GetSetupMaster = async (
  SetupMasterId,
  ParentId,
  SetupDetailName,
  SetupDetailId = 0,
  Flex1 = "",
  Flex2 = "",
  Flex3 = ""
) => {
  try {
    var RequestData = {
      OperationId: OperationTypeId.Select,
      SetupMasterId: SetupMasterId,
      ParentId: ParentId,
      SetupDetailName: SetupDetailName,
      SetupDetailId: SetupDetailId,
      Flex1: Flex1,
      Flex2: Flex2,
      Flex3: Flex3,
    }
    const data = await fetchData(
      ControllerName.Setup,
      ApiMethods.MasterDetail_Operation,
      RequestData
    )
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const SaveSingleDataToLocalStorage = (key, value) => {
  localStorage.setItem(key, value)
}

export const GetLocalStorageValue = (key) => {
  return localStorage.getItem(key)
}

export const objCurrrency = {
  CurrencyFromSymbol: "",
  CurrencyToSymbol: "PKR",
  ConversionRate: 1,
}
export const FastForex_FetchOnlyOne = async (From, To) => {
  try {
    var RequestData = [From, To]
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.Fast_Forex_Only_One,
      RequestData
    )

    if (data != null) {
      if (data.Response === true && data.Data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}
// export const GetCurrentDateWithFormat = function (
//   format = "dd/mm/yyyy",
//   daysIncrement = 0,
//   monthIncrement = 1,
//   yearIncrement = 0
// ) {
//   var today = new Date();
//   var dd = today.getDate() + daysIncrement;

//   var mm = today.getMonth() + monthIncrement;
//   var yyyy = today.getFullYear() + yearIncrement;

//   if (dd < 10) {
//     dd = "0" + dd;
//   }

//   if (mm < 10) {
//     mm = "0" + mm;
//   }

//   if (format == "mm-dd-yyyy") today = mm + "-" + dd + "-" + yyyy;
//   else if (format == "mm/dd/yyyy") today = mm + "/" + dd + "/" + yyyy;
//   else if (format == "dd-mm-yyyy") today = dd + "-" + mm + "-" + yyyy;
//   else if (format == "dd/mm/yyyy") today = dd + "/" + mm + "/" + yyyy;
//   else if (format == "yyyy/mm/dd") today = yyyy + "/" + mm + "/" + dd;
//   else today = dd + "/" + mm + "/" + yyyy;

//   return today;
// };

export const GetRoles = async function GetRoles(
  RoleName,
  RoleId,
  ComapnyId = 0
) {
  try {
    var LoginRoleId = localStorage.getItem("RoleId")
    var RequestData = {
      OperationId: OperationTypeId.Select,
      RoleId: RoleId,
      RoleName: RoleName,
      LoginRoleId: LoginRoleId,
      CompanyId: ComapnyId,
    }
    const data = await fetchData(
      ControllerName.Security,
      ApiMethods.UserRole_Operation,
      RequestData
    )

    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    //
  }
}

export const GetUser = async function GetUser(
  UserName = "",
  UserEmail = "",
  RoleId = 0,
  UserId = 0,
  IsFamilyMember = 0,
  IsParentFamilyMember = 0,
  IsActive = 1
) {
  try {
    var RequestData = {
      OperationTypeId: OperationTypeId.Select,
      Name: UserName,
      RoleId: RoleId,
      EmailAddress: UserEmail,
      UserId: UserId,
      IsFamilyMember: IsFamilyMember,
      IsParentFamilyMember: IsParentFamilyMember,
      IsActive: IsActive,
    }
    const data = await fetchData(
      ControllerName.User,
      ApiMethods.CrudUser,
      RequestData
    )

    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    //
  }
}

export const GetUniqueStringValue = () => {
  return (Math.random() + 1).toString(36).substring(7)
}
export const GetCompanies = async (
  CompanyId = 0,
  CompanyName = "",

  ParentCompanyFamilyId = 0,

  PhoneNo = ""
) => {
  try {
    var RequestData = [
      {
        OperationId: OperationTypeId.Select,
        CompanyID: CompanyId,
        Company: CompanyName,

        FamilyId: ParentCompanyFamilyId,

        PhoneNo: PhoneNo,
      },
    ]
    const data = await fetchData(
      ControllerName.Company,
      ApiMethods.Company_Operation,
      RequestData
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    return []
  }
}

export const GetDonors = async (
  firstName = "",
  lastName = "",
  contactNo = "",
  emailAddress = "",
  cityId = 0
) => {
  try {
    var RequestData = [
      {
        FirstName: firstName,
        LastName: lastName,
        ContactNo: contactNo,
        EmailAddress: emailAddress,
        CityId: cityId,
      },
    ]
    //const data = await fetchData(
    //    ControllerName.Company,
    //    ApiMethods.Company_Operation,
    //    RequestData
    //);
    ////
    //if (data != null) {
    //    if (data.response === true && data.data != null) {
    //        return data;
    //    } else {
    //        return [];
    //    }
    //}
    //else {
    //    return [];
    //    Swal.fire({ title: "Error", text: "Error", icon: "error" });
    //    //alert("Error");
    //    //
    //}
  } catch (error) {
    return []
  }
}

export const DeleteSetupDetail = async (SetupDetailId, CreatedBy, UserIP) => {
  try {
    var RequestData = {
      OperationId: OperationTypeId.Delete,
      SetupDetailId: SetupDetailId,
      CreatedBy: CreatedBy,
      UserIP: UserIP,
    }
    const data = await fetchData(
      ControllerName.Setup,
      ApiMethods.MasterDetail_Operation,
      RequestData
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const InsertSetupDetail = async (
  SetupMasterId,
  ParentId,
  SetupDetailName,
  Flex1,
  Flex2,
  Flex3,
  CreatedBy,
  UserIP
) => {
  try {
    var RequestData = {
      OperationId: OperationTypeId.Insert,
      SetupMasterId: SetupMasterId,
      ParentId: ParentId === 0 ? null : ParentId,
      SetupDetailName: SetupDetailName,
      Flex1: Flex1,
      Flex2: Flex2,
      Flex3: Flex3,
      CreatedBy: CreatedBy,
      UserIP: UserIP,
    }
    const data = await fetchData(
      ControllerName.Setup,
      ApiMethods.MasterDetail_Operation,
      RequestData
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //
    }
  } catch (error) {
    return []
    //
  }
}

//ok
//  export const InsertSetupDetail = async (SetupMasterId, ParentId, SetupDetailName, Flex1, Flex2, Flex3, CreatedBy,UserIP) =>
//  {
//     var RequestData = {
//              OperationId: OperationTypeId.Insert,
//              SetupMasterId: SetupMasterId,
//              ParentId: ParentId === 0 ? null : ParentId,
//              SetupDetailName: SetupDetailName,
//              Flex1: Flex1,
//              Flex2: Flex2,
//              Flex3: Flex3,
//              CreatedBy: CreatedBy,
//              UserIP: UserIP,
//     }
//    const data = await fetchData(
//        ControllerName.Setup,
//        ApiMethods.MasterDetail_Operation,
//        RequestData
//      )

//      if(data !== null){

//       //return data?.data[0]?.HasError
//       return data;
//      }
//      else{
//       return []
//      }
//       // .catch((error) => {
//       //   //   const errorMsg = error.message;
//       //   //console.log(errorMsg);
//       // });
//   };

export const InsertSetupDetail_District = async (
  SetupMasterId,
  ParentId,
  SetupDetailName,
  Flex1,
  Flex2,
  Flex3,
  CreatedBy,
  UserIP
) => {
  try {
    var RequestData = {
      OperationId: OperationTypeId.Insert,
      SetupMasterId: SetupMasterId,
      ParentId: ParentId === 0 ? null : ParentId,
      SetupDetailName: SetupDetailName,
      Flex1: Flex1,
      Flex2: Flex2,
      Flex3: Flex3,
      CreatedBy: CreatedBy,
      UserIP: UserIP,
    }
    const data = await fetchData(
      ControllerName.Setup,
      "MasterDetail_Operation_District",
      RequestData
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //
    }
  } catch (error) {
    return []
    //
  }
}

export const UpdateSetupDetail = async (
  SetupMasterId,
  ParentId,
  SetupDetailId,
  SetupDetailName,
  Flex1,
  Flex2,
  Flex3,
  CreatedBy,
  UserIP
) => {
  try {
    var RequestData = {
      OperationId: OperationTypeId.Update,
      SetupMasterId: SetupMasterId,
      SetupDetailId: SetupDetailId,
      ParentId: ParentId,
      SetupDetailName: SetupDetailName,
      Flex1: Flex1,
      Flex2: Flex2,
      Flex3: Flex3,
      CreatedBy: CreatedBy,
      UserIP: UserIP,
    }
    const data = await fetchData(
      ControllerName.Setup,
      ApiMethods.MasterDetail_Operation,
      RequestData
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    return []
    //
  }
}

export const GetFillCombos = async (OperationId, id, value) => {
  try {
    var RequestData = { OperationId: OperationId, id: id, value: value }
    const data = await fetchData(
      ControllerName.Applicant,
      ApiMethods.Combo_Operation,
      RequestData
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    return []
  }
}

export const InsertData_Applicant = async (value) => {
  try {
    //var RequestData = {ApplicantInformation:{OperationId:2,FullName:value.FullName , FatherName:value.FatherName }}
    //var RequestData = { OperationId: OperationId , value: value}
    const data = await fetchData(
      ControllerName.Applicant,
      ApiMethods.Applicant_Operation,
      value
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    return []
  }
}

// export const Insert_MarketingCaseImages = async (

//   //3 ,  GetTitle , CaseDesc_L , CheckCaseoftheDay , CheckCaseShow , selecteTitleImage ,selectCaseVideos , UserID , UserIP ,VideoURLa
//   ApplicatCaseid,
//   casetitle,
//   CaseDesc_L,
//   CaseoftheDay,
//   CasesShow,
//   TitleimageFileStream,
//   CaseVideos,
//   UserId,
//   UserIP,
//   VideoURL,
//   ShortDesc
// ) => {
//   try {

//     const data = await fetchData_MarketingCaseImages(
//       ControllerName.Applicant,
//       ApiMethods.Applicant_MarketingCase,
//       ApplicatCaseid,
//       casetitle,
//       CaseDesc_L,
//       CaseoftheDay,
//       CasesShow,
//       TitleimageFileStream,
//       CaseVideos,
//       UserId,
//       UserIP,
//       VideoURL,
//       ShortDesc
//     ); // , caseDesc , TitleimageFileStream   , CaseMultipleIamges ,CaseVideos);

//     if (data) {
//
//       if (data.response === true && data.data != null) {
//         return data;
//       } else {
//         return [];
//       }
//     } else {
//       return [];
//       Swal.fire({ title: "Error", text: "Error", icon: "error" });
//       //alert("Error");
//       //
//     }
//   } catch (error) {
//     return [];
//
//   }
// };
export const Insert_MarketingCaseImages = async (
  CaseofApplicant,
  CaseTitle,
  CauseLabel,
  CaseDesc_L,
  CaseoftheDay,
  CasesShow,
  TitleimageFileStream,
  CaseVideos,
  UserId,
  UserIP,
  VideoURL,
  ShortDesc,
  history,
  DocAttachmentID,
  Adopt,
  Source,
  setLoading
) => {
  const RoleId = localStorage.getItem("RoleId")
  if (!UserId || !RoleId) {
    setLoading(false)
    Swal.fire({
      title: "Session Expired",
      text: "Please Login again.",
      icon: "error",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/login")
      }
    })
    return
  }

  const formData = new FormData()
  let caseofthdays = CaseoftheDay === null ? false : CaseoftheDay
  let caseshows = CasesShow === null ? false : CasesShow
  let ShortDescs = ShortDesc === null ? "" : ShortDesc
  let Desc = CaseDesc_L === null ? "" : CaseDesc_L
  formData.append("titleimage", TitleimageFileStream)
  formData.append("casevideo", CaseVideos)
  formData.append("caseDesc", Desc.toString())
  formData.append("CaseofApplicant", CaseofApplicant.toString())
  formData.append("CaseTitle", CaseTitle.toString())
  formData.append("CauseLabel", CauseLabel.toString())
  formData.append("CaseoftheDay", caseofthdays.toString())
  formData.append("CasesShow", caseshows.toString())
  formData.append("UserId", UserId.toString())
  formData.append("UserIP", UserIP.toString())
  formData.append("VideoURL", VideoURL.toString())
  formData.append("ShortDesc", ShortDescs.toString())
  formData.append("DocAttachmentID", DocAttachmentID)
  formData.append("Adopt", Adopt)
  formData.append("Source", Source)

  var baseurl =
    baseUrl +
    "/" +
    ControllerName.Applicant +
    "/" +
    ApiMethods.Applicant_MarketingCase
  const apiUrl = baseurl
  var apiResult = axios
    .post(baseurl, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      var data = response
      if (response.data.DataSet.Table[0].haserror > 0) {
        setLoading(false)
        Swal.fire({
          title: "Error",
          text: response.data.DataSet.Table[0].Message,
          icon: "error",
        })
        return
      } else {
        setLoading(false)
        Swal.fire({
          title: "Success",
          text: response.data.DataSet.Table[0].Message,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/admin/ApplicantListing")
          }
        })
        return false
      }
    })
    .catch((error) => {
      //   const errorMsg = error.message;
      //console.log(errorMsg);
      setLoading(false)
      Swal.fire({
        title: "Error",
        text: "Something went wrong. Please login again.",
        icon: "error",
      })
    })
}

export const Insert_SceessStories_AfterApproved = async (
  CaseofApplicant,
  CaseTitle,
  CaseDesc_L,
  TitleimageFileStream,
  UserId,
  UserIP,
  ShortDesc,
  history,
  CheckCaseShow
) => {
  const formData = new FormData()
  formData.append("OperationID", 2)
  formData.append("CaseofApplicant", CaseofApplicant.toString())
  formData.append("CaseTitle", CaseTitle.toString())
  formData.append("caseDesc", CaseDesc_L.toString())
  formData.append("titleimage", TitleimageFileStream)
  formData.append("UserId", UserId.toString())
  formData.append("UserIP", UserIP.toString())
  formData.append("ShortDesc", ShortDesc.toString())
  formData.append("CheckCaseShow", CheckCaseShow.toString())

  var baseurl =
    baseUrl +
    "/" +
    ControllerName.Website +
    "/" +
    ApiMethods.SueessStories_AfteApproved
  const apiUrl = baseurl
  var apiResult = axios
    .post(baseurl, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log(response)
      var data = response
      if (response.data?.DataSet?.Table[0].haserror > 0) {
        Swal.fire({
          title: "Error",
          text: response?.data?.DataSet?.Table[0].Message,
          icon: "error",
        })
        return
      } else {
        Swal.fire({
          title: "Success",
          text: response.data.DataSet.Table[0].Message,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/admin/ApplicantListing")
          }
        })
        return data
      }
    })
    .catch((error) => {
      // const errorMsg = error.message;
      //console.log(errorMsg);
    })
}

export const Get_Pets_Details = async (
  operationTypeId = 1,
  GuidId = "",
  PetID = 0,
  PetQuantity = "",
  OperationID = 2,
  ID = 0,
  UserIP,
  CreatedBy,
  ApplicantID,
  CreatedDate = "",
  ModidifiedDate = "",
  ModifiedBy = 0,
  ISActive = true
) => {
  try {
    var RequestData = [{}]
    const data = await fetchData(
      ControllerName.Company,
      ApiMethods.Get_CompanyData,
      RequestData
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    //
    return []
  }
}
export const Insert_PetDetail = async (Data) => {
  try {
    var RequestData = { Data }
    const data = await fetchData(
      ControllerName.Applicant,
      ApiMethods.Pet_Details,
      Data
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    return []
    //
  }
}
export const Insert_AssetDetail = async (AssetDetail, AssetDetail2) => {
  try {
    // console.log(Data)

    let dataum = { data1: AssetDetail, data2: AssetDetail2 }
    var RequestData = { AssetDetail }
    const data = await fetchData(
      ControllerName.Applicant,
      ApiMethods.Asset_Detail,
      // [dataum]
      [dataum]
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    return []
    //
  }
}
export const Insert_SourceOfDrinking = async (Data) => {
  try {
    var RequestData = { Data }
    const data = await fetchData(
      ControllerName.Applicant,
      ApiMethods.Source_Of_Drinking,
      Data
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    return []
    //
  }
}

export const Get_CompanyData = async (
  operationTypeId = 5,
  CompanyId = 0,
  CompanyName = "",

  ParentCompanyFamilyId = 0,

  PhoneNo = ""
) => {
  try {
    var RequestData = [
      {
        OperationId: operationTypeId,
        CompanyID: CompanyId,
        Company: CompanyName,

        FamilyId: ParentCompanyFamilyId,

        PhoneNo: PhoneNo,
      },
    ]
    const data = await fetchData(
      ControllerName.Company,
      ApiMethods.Get_CompanyData,
      RequestData
    )
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    //
    return []
  }
}

export const Get_Active_Reserved_Cases = async () => {
  try {
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.Active_Reserved_Cases,
      0
    )
    //
    if (data) {
      return data
    } else {
      // Swal.fire({ title: "Error", text: "Error", icon: "error" });
      // console.log("Active reserved cases not found");
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
    return []
  }
}

export const ConvertNumricToComaSeparate = (value) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export const Get_All_Cases = async (ApplicantCaseid) => {
  try {
    //temp const data = await fetchData( ControllerName.Website,   ApiMethods.All_Cases,   0 );
    const data = await fetchData(
      `WebSite`,
      `usp_DonationCategories_web?ApplicantCaseid=${ApplicantCaseid}`,
      {
        ApplicantCaseid,
      }
    )
    if (data) {
      return data
    } else {
      // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
    return []
  }
}

export const InsertData_Followup = async (
  OperationID,
  Date,
  InvestegatorId,
  id,
  Remarks,
  UserID,
  UserIP
) => {
  try {
    var value = {
      OperationId: OperationID,
      Date: Date,
      Investigatorid: InvestegatorId,
      Applicant_InvestigationId: id,
      Remarks: Remarks,
      UserId: UserID,
      UserIP: UserIP,
    }
    const data = await fetchData(
      ControllerName.Applicant,
      ApiMethods.InsertData_Followup,
      value
    )

    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    return []
  }
}

export const Insert_Checkout_Detail = async (Data, Data2) => {
  const formData = new FormData()
  formData.append("TransactionSlipAttachment", Data2)
  formData.append("Data", JSON.stringify(Data))

  var url = baseUrl + "/WebSite/DonationSubmit_WEB"

  var apiResult = axios
    .post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.data.response === true) {
        if (response.data.data[0].haserror === 0) {
          // fetchData(
          //   ControllerName.Website,
          //   ApiMethods.Payment_GatwWay_API,
          //   1
          // );
          Swal.fire({
            title: "Success",
            text: response.data.data[0].Message,
            icon: "success",
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/home"
            }
          })
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.data[0].Message,
            icon: "error",
          })
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "Something Went wrong",
          icon: "error",
        })
      }
    })
    .catch((error) => {
      const errorMsg = error.message
      console.log(errorMsg)
      Swal.fire({
        title: "Error",
        text: "Something Went wrong",
        icon: "error",
      })
    })
}
export const Insert_PayPro_Detail = async (Data, Data2) => {
  const formData = new FormData()
  formData.append("TransactionSlipAttachment", Data2)
  formData.append("Data", JSON.stringify(Data))

  var url = baseUrl + "/WebSite/Payment_GatwWay_API"
  try {
    var data = axios.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    if (data !== undefined) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const Get_All_Relief = async () => {
  try {
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.Get_All_Relief,
      0
    )
    if (data !== undefined) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const Get_All_Ramazan_Campaign = async () => {
  try {
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.GetRamzanCampaignDetails,
      0
    )
    if (data !== undefined) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const Get_All_FeaturedNGOs = async () => {
  try {
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.GetFeaturedNGOsDetails,
      0
    )
    if (data !== undefined) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const NGOController = async (
  ApplicantCaseid,
  OperationID,
  Heading,
  SetupMasterId,
  Description,
  BankName,
  AccountNo,
  NGOFeatureID,
  UserID,
  page
) => {
  try {
    var RequestData = {
      ApplicantCaseid,
      OperationID,
      Heading,
      SetupMasterId,
      Description: Description,
      BankName,
      AccountNo,
      NGOFeatureID,
      UserID,
    }
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.GetFeaturedNGOsDetails,
      RequestData
    )
    //
    if (data != null) {
      if (page) {
        return data
      }
      // Specific change for qurbani campaign ngos.
      if (OperationID == 4 && !NGOFeatureID && !Heading) {
        return data
      }

      if (data.Table) {
        return data.Table
      } else {
        return []
      }
    } else {
      return []
      //
    }
  } catch (error) {
    return []
    //
  }
}
export const MarketingContentController = async (
  OperationID,
  Content_ID = 0,
  Content_Type = 0,
  Content_Title = null,
  Content_Description = null,
  Content_Position = 0,
  Content_IsPromoted = false,
  Content_Display = false,
  Content_MediaType = false,
  UserID = 0,
  UserIP = null,
  CommonAttachmentId = 0,
  FileName = null,
  FileGeneratedName = null,
  VideoURL = null
) => {
  const formData = new FormData()
  formData.append("OperationID", OperationID)
  formData.append("Content_ID", Content_ID)
  formData.append("Content_Type", Content_Type)
  formData.append("Content_Title", Content_Title)
  formData.append("Content_Description", Content_Description)
  formData.append("Content_Position", Content_Position)
  formData.append("Content_IsPromoted", Content_IsPromoted)
  formData.append("Content_Display", Content_Display)
  formData.append("Content_MediaType", Content_MediaType)
  formData.append("UserID", UserID)
  formData.append("UserIP", UserIP)
  formData.append("CommonAttachmentId", CommonAttachmentId)
  formData.append("FileName", FileName)
  formData.append("FileGeneratedName", FileGeneratedName)
  formData.append("VideoURL", VideoURL)

  const url =
    baseUrl + "/" + ControllerName.Website + "/" + ApiMethods.ContentsUploads

  // baseUrl +
  // "/" +
  // ControllerName.Applicant +
  // "/" +
  // ApiMethods.Applicant_MarketingCase

  try {
    var data = axios.post(url, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    if (data !== undefined) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const ContactUsController = async (
  OperationID,
  CustomerQueriesID,
  FirstName,
  LastName,
  Phoneno,
  Emailaddress,
  QueryMessage,
  QueryStatus,
  QuerySource,
  IsEmail,
  TicketTypeID,
  TicketArea,
  ContactUS_Comments,
  TransactionLink,
  UserId,
  CityID
) => {
  try {
    var RequestData = {
      OperationID,
      CustomerQueriesID,
      FirstName,
      LastName,
      Phoneno,
      Emailaddress,
      QueryMessage,
      QueryStatus,
      QuerySource,
      IsEmail,
      TicketTypeID,
      TicketArea,
      ContactUS_Comments,
      TransactionLink,
      UserId: UserId
        ? UserId
        : localStorage.getItem("UserId")
        ? localStorage.getItem("UserId")
        : 0,
      CityID,
    }
    const data = await fetchData("WebSite", ApiMethods.ContactUS, RequestData)

    if (data != null) {
      if (data.Response === true) {
        if (
          data.DataSet.Table[0].haserror === 1 ||
          (data.DataSet.Table[0]?.MESSAGE &&
            data.DataSet.Table[0]?.ERRORMESSAGE)
        ) {
          return Swal.fire({
            title: "Error",
            text: data.DataSet.Table[0]?.ERRORMESSAGE,
            icon: "error",
          })
        }
        return data
      } else {
        return []
      }
    } else {
      return []
    }
  } catch (error) {
    return []
    //
  }
}

export const TestimonialController = async (
  OperationID,
  TestimonialsID,
  TestimonialsDesc,
  Name,
  Caption,
  UserIP,
  UserID,
  VideoURL,
  TestimonialType,
  IsPromoted
) => {
  try {
    var RequestData = {
      OperationID,
      TestimonialsID,
      TestimonialsDesc,
      Name,
      Caption,
      UserIP,
      UserID,
      VideoURL,
      TestimonialType,
      IsPromoted,
    }
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.SP_Testimonials,
      RequestData
    )
    //
    if (data != null) {
      if (data?.Table) {
        return data.Table
      } else {
        return []
      }
    } else {
      return []
      //
    }
  } catch (error) {
    return []
    //
  }
}
export const AdsController = async (
  OperationID,
  AD_ID,
  Thumbnail,
  Adtype,
  Title,
  Description,
  Position,
  UserID,
  UserIP
) => {
  try {
    var RequestData = {
      OperationID,
      AD_ID,
      Thumbnail,
      Adtype,
      Title,
      Description,
      Position,
      UserID,
      UserIP,
    }
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.Sp_Advertisement,
      RequestData
    )
    //
    if (data != null) {
      if (data?.Table) {
        return data.Table
      } else {
        return []
      }
    } else {
      return []
      //
    }
  } catch (error) {
    return []
    //
  }
}

export const Get_Success_Stories = async () => {
  try {
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.Get_Success_Stories,
      0
    )
    //
    if (data !== undefined) {
      return data
    } else {
      // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
    return []
  }
}
export const Case_Of_The_Day = async () => {
  try {
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.Case_Of_The_Day,
      0
    )
    //
    if (data) {
      return data
    } else {
      // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
    return []
  }
}
export const Get_Blogs = async () => {
  try {
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.Get_Blogs,
      0
    )
    //
    if (data) {
      return data
    } else {
      // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    // Swal.fire({ title: "Error", text: "Data not found", icon: "error" });
    return []
  }
}
export const Insert_Blogs = async (Data, Data2) => {
  const formData = new FormData()

  formData.append("attachement", Data2)
  formData.append("body", JSON.stringify(Data))
  // formData.append("OperationID", Data.OperationID.toString());
  // formData.append("Blogsid", Data.Blogsid.toString());
  // formData.append("BlogsTitle", Data.BlogsTitle.toString());
  // formData.append("BlogsDesc", Data.BlogsDesc.toString());
  // formData.append("BlogsStartDate", Data.BlogsStartDate.toString());
  // formData.append("BlogExpiryDate", Data.BlogExpiryDate.toString());
  // formData.append("IsActive", Data.IsActive.toString());
  // formData.append("CreatedBy", Data.CreatedBy.toString());
  // formData.append("UserIP", Data.UserIP.toString());

  var baseurl =
    baseUrl + "/" + ControllerName.Website + "/" + ApiMethods.Blogs_Opertaion

  var apiResult = axios
    .post(baseurl, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.data.Response === true) {
        if (response.data.DataSet.Table[0].haserror === 0) {
          Swal.fire({
            title: "Success",
            text: response.data.DataSet.Table[0].Message,
            icon: "success",
          })
          return response.data
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.DataSet.Table[0].Message,
            icon: "error",
          })
          return
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "Something Went Wrong",
          icon: "error",
        })
        return
      }
      //   if ( response.data.Response === true && response.data.DataSet.Table[0].haserror > 0) {
      //     Swal.fire({
      //       title: "Error",
      //       text: response.data.DataSet.Table[0].Message,
      //       icon: "error",
      //     });
      //     return;
      //   }
      //   else{
      //   Swal.fire({
      //     title: "Success",
      //     text: response.data.DataSet.Table[0].Message,
      //     icon: "success",
      //   });
      // }
    })
    .catch((error) => {
      const errorMsg = error.message
      console.log(errorMsg)
    })
}
export const Blogs_List = async (Data) => {
  const OperationId = Data.OperationID !== undefined ? Data.OperationID : ""
  const BlogTitle = Data.BlogTitle !== undefined ? Data.BlogTitle : ""
  const BlogDesc = Data.BlogDesc !== undefined ? Data.BlogDesc : ""
  try {
    const data = postRecord(
      `WebSite`,
      `sp_Crud_BlogsView?OperationID=${OperationId}&BlogTitle=${BlogTitle}&BlogDesc=${BlogDesc}`,
      []
    )

    //
    if (data) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}
export const Delete_Blog = async (Data, Data2) => {
  var req = { OperationID: Data, Blogsid: Data2 }

  try {
    const data = postRecord(
      `WebSite`,
      `sp_Crud_Blogs_Delete?OperationID=${Data}&Blogsid=${Data2}`,
      []
    )

    if (data) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const GetCurrencyConvertedAmount = (
  amount,
  conversionRate,
  currencyIsoCode
) => {
  let _convertedAmountWithSymbol = ""
  if (
    amount != undefined &&
    amount != null &&
    conversionRate != undefined &&
    conversionRate != null
  ) {
    let _convertedAmount = (amount * conversionRate.toFixed(2)).toFixed(2)

    _convertedAmountWithSymbol =
      ConvertNumricToComaSeparate(_convertedAmount) + " " + currencyIsoCode !=
        undefined && currencyIsoCode != null
        ? currencyIsoCode
        : ""
  } else {
    _convertedAmountWithSymbol =
      "0 " + currencyIsoCode != undefined && currencyIsoCode != null
        ? currencyIsoCode
        : ""
  }
}

export const Fill_Followup = async () => {
  const OperationId = "1"
  const RoleId = "3"
  const IsActive = "true"

  try {
    const data = postRecord(
      `Applicant`,
      `usp_UserLogin_Operation?OperationID=${OperationId}&RoleId=${RoleId}&IsActive=${IsActive}`,
      []
    )

    if (data) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const Payment_List_Table = async (fromDate, operationId) => {
  var RequestData = { fromDate, operationId }
  try {
    const data = await fetchData(
      ControllerName.Payment,
      ApiMethods.Payment_List_Table,
      RequestData
    )
    //
    if (data) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}
export const Insert_ManualDonation = async (Data, CashBookRecpt) => {
  //;
  const formData = new FormData()
  formData.append("CashBookRecpt", CashBookRecpt)
  // formData.append("BankDepositReceipt", BankDepositReceipt);
  formData.append("body", JSON.stringify(Data))
  try {
    var baseurl =
      baseUrl + "/" + ControllerName.Website + "/" + "DonationSubmit_CRM_Save"
    var data = await axios.post(baseurl, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    if (data) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export function AllowAlphabatic(inputtxt) {
  if (/^[a-zA-Z][a-zA-Z ]*$/.test(inputtxt)) {
    //console.log(!/[^a-zA-Z]/.test(inputtxt));
    return inputtxt
  } else if (/^-?[\d.]+(?:e-?\d+)?$/.test(inputtxt)) {
    return ""
  } else {
    if (inputtxt == "") return ""
    else return inputtxt.match(/[^\d]+|\d+/g)[0]
  }
}

export function AllowOnlyNumeric(inputtxt) {
  if (/^([0-9]|[0-9][0-9]|100)$/.test(inputtxt)) {
    //console.log(!/[^a-zA-Z]/.test(inputtxt));
    return inputtxt
  } else {
    return ""
  }
}

export function AllowNumericWithDecimal(inputtxt) {
  if (/^[1-9]\d*(?:\.\d{0,2})?$/.test(inputtxt)) {
    //console.log(!/[^a-zA-Z]/.test(inputtxt));
    return inputtxt
  } else {
    return ""
  }
}
/**
 * POST DATA REQUEST
 * @param {string} url Url String
 * @param {Number} id ID Number
 * @param {{}} data Data object
 */
export const updateDataGeneric = async (url, id, data, param) => {
  let userID = localStorage.getItem("UserId")
  let userIP = localStorage.getItem("UserIP")
  let paramUrl = `${baseUrl}/${url}?Operationid=2&ID=${id}&Date=${transformDateToISO(
    Date.now()
  )}&UserId=${userID}&UserIP=${userIP}`
  if (param) paramUrl = paramUrl + param
  return axios.post(paramUrl, data)
}

/**
 * DELETE DATA REQUEST
 * @param {string} url Url String
 * @param {Number} id ID Number
 * @param {{}} data Data object
 */
export const deleteDataGeneric = async (url, id, data) => {
  let userID = localStorage.getItem("UserId")
  let userIP = localStorage.getItem("UserIP")
  let paramUrl = `${baseUrl}/${url}?Operationid=4&ID=${id}&Date=${transformDateToISO(
    Date.now()
  )}&UserId=${userID}&UserIP=${userIP}`
  return axios.post(paramUrl, data)
}

export const formatDate = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return [day, month, year].join("-")
}

export const Insert_ContactUS = async (Data) => {
  try {
    const data = await fetchData("WebSite", ApiMethods.ContactUS, Data)
    //
    if (data != null) {
      if (data.response === true && data.data != null) {
        return data
      } else {
        return []
      }
    } else {
      return []
      //alert("Error");
      //
    }
  } catch (error) {
    //
    return []
  }
}

export const Get_CompanyBankDetails = async () => {
  try {
    const data = await fetchData(
      ControllerName.Website,
      ApiMethods.Company_BankDetails,
      0
    )
    //
    if (data) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const Insert_Donor = async (Data, Data2) => {
  const formData = new FormData()

  formData.append("attachement", Data2)
  formData.append("Data", JSON.stringify(Data))

  var baseurl = baseUrl + "/" + ControllerName.Website + "/DonationSubmit_CRM"

  var apiResult = axios
    .post(baseurl, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      if (response.data.Response === true) {
        if (response.data.DataSet.Table[0].haserror === 0) {
          Swal.fire({
            title: "Success",
            text: response.data.DataSet.Table[0].Message,
            icon: "success",
          })
          return response.data
        } else {
          Swal.fire({
            title: "Error",
            text: response.data.DataSet.Table[0].Message,
            icon: "error",
          })
          return
        }
      } else {
        Swal.fire({
          title: "Error",
          text: "Something Went Wrong",
          icon: "error",
        })
        return
      }
      //   if ( response.data.Response === true && response.data.DataSet.Table[0].haserror > 0) {
      //     Swal.fire({
      //       title: "Error",
      //       text: response.data.DataSet.Table[0].Message,
      //       icon: "error",
      //     });
      //     return;
      //   }
      //   else{
      //   Swal.fire({
      //     title: "Success",
      //     text: response.data.DataSet.Table[0].Message,
      //     icon: "success",
      //   });
      // }
    })
    .catch((error) => {
      const errorMsg = error.message
      console.log(errorMsg)
    })
}

export const GetCurrency_ExchangeRate = async (ExchangeRate) => {
  try {
    var RequestData = {
      Currency: ExchangeRate,
    }
    const data = await fetchData(
      ControllerName.Website,
      "GetCurrency_Value",
      RequestData
    )
    if (data != null) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const CountryWithCode = async (Operationid) => {
  try {
    const data = await fetchData(
      `WebSite`,
      `sp_Get_CountryCode?OperationId=${Operationid}`
    ) // ControllerName.Website, ApiMethods.sp_Get_CountryCode,Operationid);
    // const data =      postRecord(`WebSite`, `SubScribe_Email?Email=${Email}`, []);

    if (data) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const Email_SubScribe = async (Email) => {
  try {
    const data = postRecord(`WebSite`, `SubScribe_Email?Email=${Email}`, [])

    if (data) {
      return data
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}

export const getRandomNumber = (min = 1, max = 1000) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export const dateFormat = "dd/MM/yyyy"
export const dateFormatPlaceholder = "dd/mm/yyyy"

export const getDate = (DATE, seperator = "-", format = "dd/mm/yyyy") => {
  if (DATE == "") return DATE
  let date = new Date(DATE)
  let day = date.getDate() < 10 ? "0" + date.getDate() : "" + date.getDate()
  let month =
    date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : "" + (date.getMonth() + 1)
  let year = date.getFullYear()
  if (format === "dd/mm/yyyy") return day + seperator + month + seperator + year
  if (format === "yyyy/mm/dd") return year + seperator + month + seperator + day
}

export const getDatefrom = (date) => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear()

  if (month.length < 2) month = "0" + month
  if (day.length < 2) day = "0" + day

  return [day, month, year].join("-")
}

export function getCurrentDate(separator) {
  let newDate = new Date()
  let date = newDate.getDate()
  let month = newDate.getMonth() + 1
  let year = newDate.getFullYear()

  return `${year}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${date < 10 ? `0${date}` : `${date}`}`
}

export const getDateMDY = (date) => {
  let newDate = new Date(date)
  let day = newDate.getDate()
  let month = newDate.getMonth() + 1
  let year = newDate.getFullYear()
  day = day < 10 ? "0" + day : day
  month = month < 10 ? "0" + month : month
  console.log([month, day, year].join("/"))
  return [year, month, day].join("-")
}

export const Insert_FamilyMemberInformation = async (
  opId,
  payload,
  selectfamilymemberImage
) => {
  const formData = new FormData()
  formData.append("OperationId", opId)
  formData.append(
    "ApplicantCase_InvestigationId",
    payload.ApplicantCase_InvestigationId
  )
  formData.append("ApplicantFamilyDetailId", payload.ApplicantFamilyDetailId)
  formData.append("Name", payload.Name)
  formData.append("Cnic", payload.Cnic)
  formData.append(
    "Mother_Father_HusbandName",
    payload.Mother_Father_HusbandName
  )
  // formData.NextCounsellingSession
  //   ? moment(formData.NextCounsellingSession).format("YYYY-MM-DD")
  //   : null,
  formData.append(
    "DateOfBirth",
    payload.DateOfBirth
      ? moment(payload.DateOfBirth).format("YYYY-MM-DD")
      : null
  )
  formData.append("IsDeceased", payload.IsDeceased)
  formData.append(
    "DateOfDeath",
    payload.DateOfDeath
      ? moment(payload.DateOfDeath).format("YYYY-MM-DD")
      : null
  )
  formData.append("RelationId", payload.RelationId ? payload.RelationId : 171)
  formData.append("ReligionId", payload.ReligionId ? payload.ReligionId : "0")
  console.log("CHECKING RELIGION ID", payload.ReligionId)
  formData.append("GenderId", payload.GenderId)
  formData.append(
    "ContactTypeId",
    payload.ContactTypeId ? payload.ContactTypeId : "0"
  )
  formData.append(
    "MaritalStatusId",
    payload.MaritalStatusId ? payload.MaritalStatusId : "0"
  )
  formData.append("IsPartOfBannedOrg", payload.IsPartOfBannedOrg)
  formData.append(
    "IsInvolveInCriminalActivity",
    payload.IsInvolveInCriminalActivity
  )
  formData.append("HasMedicalHistory", payload.HasMedicalHistory)
  formData.append("Remarks", payload.Remarks)
  formData.append("ContactNumber", payload.ContactNumber)
  formData.append("UserId", payload.UserId)
  formData.append("UserIP", payload.UserIP)
  formData.append("CanRead", payload.CanRead)
  formData.append("CanWrite", payload.CanWrite)
  formData.append("IsEmployeed", payload.IsEmployeed)
  formData.append("IsJobList", payload.IsJobList)
  formData.append("JobRemarks", payload.JobRemarks)
  formData.append("LastWorkExperience", payload.LastWorkExperience)
  formData.append("Orphan", payload.Orphan)
  formData.append("FamilyMemberPicture", selectfamilymemberImage)

  var baseurl =
    baseUrl + "/" + ControllerName.Applicant + "/" + "Crud_Family_Detail_Image"
  const apiUrl = baseurl
  var apiResult = axios
    .post(baseurl, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {
      var data = response
      if (response.data.DataSet.Table[0].haserror > 0) {
        Swal.fire({
          title: "Error",
          text: response.data.DataSet.Table[0].Message,
          icon: "error",
        })
        return
      } else {
        Swal.fire({
          title: "Success",
          text: response.data.DataSet.Table[0].Message,
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            // history.push("/admin/ApplicantListing");
          }
        })
        return data
      }
    })
    .catch((error) => {
      //   const errorMsg = error.message;
      //console.log(errorMsg);
    })
}
