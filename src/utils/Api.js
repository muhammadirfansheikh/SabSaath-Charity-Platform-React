import axios from "axios"

// Local pc
export const baseApplicationUrl = "http://Localhost:3000"
export const baseUrl = "http://localhost:50469/api"
export const baseImageUrl = "http://localhost:50469/"
export const casedetail_p = "/case-detail/4188"
export const QurbaniCampaignURL = "http://Localhost:3000"
export const DisasterreliefURL = "/disasterrelief"
export const RamazanCamapignURL = "/ramazancampaign"
export const FeaturedNGOsURL = "/FeaturedNGOs"
export const CheckoutKey = "pk_test_e85b7a81-99ba-4b61-bf22-3e189396cf91"
export const QurbaniModule = 1595
export const LeadPayByCash = 1597
export const LeadHandPickAnimals = 1596

// 32 server dev uat
// export const baseApplicationUrl = "http://124.29.235.8:5001"
// export const baseImageUrl = "http://124.29.235.8:9182/"
// export const baseUrl = "http://124.29.235.8:9182/api"
// export const QurbaniCampaignURL = "https://124.29.235.8:5001"
// export const casedetail_p = "/case-detail/4188"
// export const DisasterreliefURL = "/disasterrelief"
// export const RamazanCamapignURL = "/ramazancampaign"
// export const FeaturedNGOsURL = "/FeaturedNGOs"
// export const CheckoutKey = "pk_test_e85b7a81-99ba-4b61-bf22-3e189396cf91"

// 32 server Pre Prod
// export const baseApplicationUrl = "http://124.29.235.8:4001"
// export const baseImageUrl = "http://124.29.235.8:9183/"
// export const baseUrl = "http://124.29.235.8:9183/api"
// export const QurbaniCampaignURL = "https://124.29.235.8:4001"
// export const casedetail_p = "/case-detail/4188"
// export const DisasterreliefURL = "/disasterrelief"
// export const RamazanCamapignURL = "/ramazancampaign"
// export const FeaturedNGOsURL = "/FeaturedNGOs"
// export const CheckoutKey = "pk_test_e85b7a81-99ba-4b61-bf22-3e189396cf91"

//Live Url
// export const baseApplicationUrl = "https://www.sabsaath.org"
// export const baseImageUrl = "https://api.sabsaath.org/"
// export const baseUrl = "https://api.sabsaath.org/api"
// export const QurbaniCampaignURL = "https://www.sabsaath.org"
// export const casedetail_p = "/case-detail/4188"
// export const DisasterreliefURL = "/disasterrelief"
// export const RamazanCamapignURL = "/ramazancampaign"
// export const FeaturedNGOsURL = "/FeaturedNGOs"
// export const CheckoutKey = "pk_05eea11c-8f78-4acb-aa8e-c607cb27acb1"

export const fetchData = async (ControllerName, Method, data, query) => {
  let apiUrl = baseUrl + "/" + ControllerName + "/" + Method
  if (query) {
    apiUrl = apiUrl + query
  }
  try {
    var apiResult = await axios.post(apiUrl, data)
    return apiResult.data
  } catch (error) {
    return []
  }
}

export const fetchData_MarketingCaseImages = async (
  ControllerName,
  Method,
  CaseofApplicant,
  CaseTitle,
  CaseDesc_L,
  CaseoftheDay,
  CasesShow,
  TitleimageFileStream,
  CaseVideos,
  UserId,
  UserIP,
  VideoURL,
  ShortDesc
) => {
  const formData = new FormData()
  formData.append("titleimage", TitleimageFileStream)
  formData.append("casevideo", CaseVideos)
  formData.append("body", CaseofApplicant.toString())
  formData.append("body", CaseTitle.toString())
  formData.append("body", CaseDesc_L.toString())
  formData.append("body", CaseoftheDay.toString())
  formData.append("body", CasesShow.toString())
  formData.append("body", UserId.toString())
  formData.append("body", UserIP.toString())
  formData.append("body", VideoURL.toString())
  formData.append("body", ShortDesc.toString())

  var baseurl = baseUrl + "/" + ControllerName + "/" + Method
  const apiUrl = baseurl
  var apiResult = axios
    .post(apiUrl, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {})
    .catch((error) => {
      const errorMsg = error.message
    })
}

export const fetchData_Register = async (
  ControllerName,
  Method,
  selecteNTNImage,
  selecteFBRtaxexemption,
  selectFoundingDocuments,
  selectAuditedaccounts,
  selectEAD,
  selectAnyotherMoUswiththegovernment,
  optTELLUSABOUTYOURORGANIZATION_1,
  optTELLUSABOUTYOURORGANIZATION_2,
  optTELLUSABOUTYOURORGANIZATION_3,
  optTELLUSABOUTYOURORGANIZATION_4,
  optRESPONDTODECLARATIONS_1,
  optRESPONDTODECLARATIONS_2,
  optRESPONDTODECLARATIONS_3,
  optRESPONDTODECLARATIONS_4,
  optRESPONDTODECLARATIONS_5,
  optRESPONDTODECLARATIONS_6,
  Name,
  Email,
  Phone,
  NOTACont,
  EmailFALTCont,
  CheckByClickingSubmit_1,
  CheckForclarity_2,
  CheckYourorganization_3,
  UserID,
  UserIP
) => {
  const formData = new FormData()
  formData.append("NTNImage", selecteNTNImage)
  formData.append("FBRImage", selecteFBRtaxexemption)
  formData.append("FoundingDocumentsimage", selectFoundingDocuments)
  formData.append("titleimage", selectAuditedaccounts)
  formData.append("EADImage", selectEAD)
  formData.append(
    "AnyotherMoUswiththegovernmentimage",
    selectAnyotherMoUswiththegovernment
  )

  var baseurl = baseUrl + "/WebSite/Applicant_MarketingCase"
  const apiUrl = baseurl + `/${optTELLUSABOUTYOURORGANIZATION_1}`
  var apiResult = axios
    .post(apiUrl, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    })
    .then((response) => {})
    .catch((error) => {
      const errorMsg = error.message
    })
}

export const fetchIp = async () => {
  const apiUrl = "https://geolocation-db.com/json/"
  try {
    var apiResult = await axios.post(apiUrl)
    return apiResult.data
  } catch (error) {}
}

export const getAll = async (ControllerName, Method) => {
  return await axios.get(baseUrl + "/" + ControllerName + "/" + Method)
}
export const postRecord = (ControllerName, Method, data) => {
  return axios.post(baseUrl + "/" + ControllerName + "/" + Method, data)
}
export const putRecord = (ControllerName, Method, data) => {
  return axios.put(baseUrl + "/" + ControllerName + "/" + Method, data)
}
export const deleteRecord = async (ControllerName, Method, data) => {
  data.IsActive = false
  return await axios.put(baseUrl + "/" + ControllerName + "/" + Method, {
    Data: [data],
  })
}

export const postRecordImage = (ControllerName, Method, data) => {
  return axios.post(baseUrl + "/" + ControllerName + "/" + Method, data, {
    headers: {
      "content-type": "multipart/form-data",
    },
  })
}

// var apiResult = axios
//     .post(apiUrl, formData, {
//       headers: {
//         "content-type": "multipart/form-data",
//       },
//     })
//     .then((response) => {})
//     .catch((error) => {
//       const errorMsg = error.message;
//       console.log(errorMsg);
//     });
