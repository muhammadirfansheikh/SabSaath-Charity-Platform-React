import React, { useState, useEffect, useRef } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  Input,
  FormGroup,
  Label,
  CardHeader,
  Spinner,
  ButtonGroup,
  Tooltip,
} from "reactstrap"
import HomeHeader from "../../components/Header/HomeHeader.js"
import HomeFooter from "../../components/Footer/HomeFooter.js"
import pcidss from "../../assets/img/pcidss-img.png"
import Threedsimg from "../../assets/img/3ds-img.png"
import {
  GetSetupMaster,
  Insert_Checkout_Detail,
  validateEmail,
  Get_CompanyBankDetails,
  Insert_PayPro_Detail,
  AllowAlphabatic,
  CountryWithCode,
  MarkCheckOutPayment,
  getRandomNumber,
  ConvertNumricToComaSeparate,
  Get_All_Cases,
} from "utils/CommonMethods.js"
import {
  SetupMasterIds,
  DonationForTypes,
  BaseAPIURL,
  QURBANI_DONATE_PATH,
} from "../../utils/Constants.js"
import { Link, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import {
  baseApplicationUrl,
  baseImageUrl,
  CheckoutKey,
  fetchData,
} from "utils/Api.js"
import FormGroupInput from "components/GeneralComponent/FormGroupInput.jsx"
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx"
import JustInput from "components/GeneralComponent/JustInput.jsx"
import CryptoJS from "crypto-js"
import { CardNumber, Cvv, ExpiryDate, Frames, CardFrame } from "frames-react"
// import { saveAs } from 'file-saver'
import { SaveFile } from "../../functions/SaveFile"

//import fileDownload from 'js-file-download'

const CheckOut = (props) => {
  const [tooltipOpen, setTooltipOpen] = useState(false)
  var userParams = useParams()
  var params = props.location.state != undefined ? props.location.state : ""
  const ngoDetails = params?.NGOInfo ? params.NGOInfo : null
  const fromPath = params.fromPath ? params.fromPath : ""
  console.log("Checkout params", params)
  // var currencyName = params.currencyName;
  var currencyName = "Pakistan - PKR"
  var donationForId = params.DonationForId
  var OperationID = params.OperationID
  var _noOfOccurences = params.TotalCount
  var _frequency = params?.frequeny
  //var currentCurrencyAmount = params.CurrentCurrencyAmount;
  var currentCurrencyAmount = parseFloat(params.Amount) //params.CurrentCurrencyAmount;
  var currentCurrencyFromSymbol = params.CurrentCurrencySymbol
  var Quantity = params.Quantity !== undefined ? params.Quantity : 0
  var amount = params.Amount
  var AmountInPKR = params.AmountInPKR / _noOfOccurences
  var isAdobtWhole = params.IsAdobt
  var donation = params.donationName
  var caseId = params.caseId !== undefined ? params.caseId : 0
  var fundTypeId = params.donationType
  var currencyType = params.currencyType
  var exchangeRate = params.ExchangeRate
  var TagLineId = params.TagLineId ? params.TagLineId : 0
  var IsRecievedUpdates = params?.IsRecievedUpdates
    ? params.IsRecievedUpdates
    : false
  var DonationSubCategoryid = params.DonationSubCategoryid
    ? params.DonationSubCategoryid
    : 0
  var ConvertAmount = params.ConvertAmount
  var UserId = localStorage.getItem("UserId")
  var UserIp = localStorage.getItem("UserIP")
  const Remainder = params.Remainder ? params.Remainder : null
  const TotalAmount = params.TotalAmount
    ? parseFloat(params.TotalAmount).toFixed(2)
    : 0
  var NGOId = params?.NGOId ? params.NGOId : 1
  var Remarks = params.Remarks

  const toggleTooltip = () => setTooltipOpen(!tooltipOpen)
  console.log("From NGO DETAILS", ngoDetails)
  const initialValues = {
    OperationID: OperationID,
    FirstName: "",
    LastName: "",
    EmailAddress: "",
    ContactNo: "",
    Address: "",
    Countryid: 0,
    IsSaveThisInfo: false,
    IsReceiveEmail: false,
    IsShowReceiveCheckBox: false,
    // Amount: OperationID != 3 ? amount : amount / Quantity,
    Amount: amount,
    DonationTypeid: params?.donationType,
    ApplicantCaseID: caseId,
    Currencyid: currencyType,
    qty: Quantity,
    CategoryID: TagLineId,
    SubCategoryID: DonationSubCategoryid,
    userip: UserIp,
    CurrencyName: "Pakistan Ruppes - PKR", //currencyName,
    CurrencyExchangeRate: exchangeRate,
    Document_Type: "",
    fileSavePath: "",
    relationID: "",
    FileName: "",
    TextForCheckBox: "",
    fileGeneratedName: "",
    BankId: 0,
    PaymentTypeId: 0,
    ChequeNo: 0,
    CountryCode: "",
    Remarks: Remarks,
    UniqueOrderId: "",
    donationcomments: "",
  }
  const [countryddl, setCountryddl] = useState([])
  const [paymentddl, setPaymentddl] = useState([])
  const [countrysplit, setCountrySplit] = useState([])
  const [attachment, setAttachment] = useState({})
  const [BasicInfoValues, setBasicInfoValues] = useState(initialValues)
  const [formLoading, setFormLoading] = useState(false)
  const [feildsIsDisable, setfeildsIsDisable] = useState(false)
  const [rSelected, setRselected] = useState([])
  const [GetSessionVal, setGetSessionVal] = useState()
  const imageRef = useRef()
  const showFundText = ngoDetails
    ? ngoDetails?.caseSource !== SetupMasterIds.ZamanFoundation &&
      ngoDetails?.caseSource !== SetupMasterIds.ZamanFoundationNGO
    : false

  const [CompBankDetails, setCompBankDetails] = useState([])

  const [OrderidG, setOrderidG] = useState()

  useEffect(() => {
    // need to define the function and call it separately
    const load = async () => {
      await GetCountry()
      await GetCompany_BankDetails()
      await GetPaymentType()
      await requestCall()
    }
    load()
  }, [])

  // const downloadimage = () => {
  //     saveAs()
  // }

  const requestCall = async () => {
    if (props?.location?.search !== "") {
      console.log(props)
      let paymentstatuscheck = props?.location?.search.split("&")
      let donationId = paymentstatuscheck[0].split("=")[1]
      let checkoutsessionId = paymentstatuscheck[1].split("=")[1]
      CheckOutMarkPaymentStatus(donationId, checkoutsessionId)

      // await Transcation_Status_Mark(payCallBack, orderid_CallBack)
      localStorage.clear()
      return
    } else {
    }
  }

  const file = async () => {
    SaveFile(
      "/static/media/FloodRelief.12400f7586a8f95817ea.png",
      "sabsath.jpg"
    )
    // }}>SAVE</button>
    //<a href="http://124.29.235.8:5001/static/media/FloodRelief.12400f7586a8f95817ea.png"  download="AwesomeImage.png">ABCD</a>
  }
  // function download(fileUrl, fileName) {
  //     let a = document.createElement("a");
  //     a.href = fileUrl;
  //     a.setAttribute("download", fileName);
  //     a.click();
  // }
  // const addfileSaver = (file) => {
  //     const fileURL = localStorage.getItem('MyImg')
  //     console.log(file)
  //     SaveFile("http://124.29.235.8:5001/static/media/FloodRelief.12400f7586a8f95817ea.png", "sabsath")
  // }

  const CheckOutMarkPaymentStatus = async (id, checkoutsessionid) => {
    setFormLoading(true)
    let _data = await fetchData("WebSite", "GetPaymentDetails", [
      id,
      checkoutsessionid,
    ])
    if (_data != null) {
      if (_data.Response) {
        if (_data.ResponseCodes == "00") {
          // if (_data.Data.HttpStatusCode == 200) {

          let _data_ = await fetchData("WebSite", "Get_Payment_Receipt_Data", {
            TransactionId: id.toString(),
            UserIp: UserIp,
          })
          if (_data_ != null) {
            setFormLoading(false)
            if (_data_.Response) {
              Swal.fire({
                cancelButtonText: "Close",
                confirmButtonColor: "#68991d",
                //confirmButtonText: 'Download',
                showConfirmButton: false,
                showCancelButton: true,
                allowOutsideClick: false,
                imageAlt: "Custom image",
                html: _data_.Data.Html,
              }).then((result) => {
                if (result.isConfirmed) {
                  //SaveFile("_data_.data.DownloadPathFile", "sabsath.png");
                  window.open(baseApplicationUrl + "/home", "_self")
                } else {
                  window.open(baseApplicationUrl + "/home", "_self")
                  //alert('else')
                }
              })
            }
          } else {
            setFormLoading(false)
          }
          // }
          // else
          //     Swal.fire({
          //         title: "Error",
          //         text: _data.ResponseMessage,
          //         icon: "error",
          //         allowOutsideClick: false
          //     }).then((result) => {
          //         if (result.isConfirmed) {
          //             //props.history.push("/home");
          //             window.open(baseApplicationUrl + "/home", '_self');
          //         }
          //     });
        } else {
          setFormLoading(false)
          Swal.fire({
            title: "Error",
            html: _data.ResponseMessage,
            icon: "error",
            allowOutsideClick: false,
          }).then((result) => {
            if (result.isConfirmed) {
              // props.history.push("/home");
              window.open(baseApplicationUrl + "/home", "_self")
            } else {
              window.open(baseApplicationUrl + "/home", "_self")
            }
          })
        }
        // location.href= data.Data._links.redirect.Href;
        setFormLoading(false)
      } else {
        Swal.fire({
          title: "Error",
          text: _data.ResponseMessage,
          icon: "error",
          allowOutsideClick: false,
        })
        setFormLoading(false)
      }
    }
  }

  const Transcation_Status_Mark = async (Paymentstatus, orderid_CallBack) => {
    setFormLoading(true)
    var _data = await fetchData("WebSite", "Payment_Status_Mark_Alfalaha", {
      URLStatus: Paymentstatus + "=" + orderid_CallBack,
    })

    if (_data != "") {
      localStorage.clear()
      var getstatus = _data.split("-")[0]

      if (getstatus === "completeCallback") {
        let _TransactionId = [orderid_CallBack]
        let _data = await fetchData("WebSite", "Get_Payment_Receipt_Data", {
          TransactionId: orderid_CallBack,
        })
        if (_data != null) {
          setFormLoading(false)
          if (_data.Response) {
            Swal.fire({
              //cancelButtonText: 'Close',
              confirmButtonColor: "#68991d",
              confirmButtonText: "Close",
              //showCancelButton: true,
              allowOutsideClick: false,
              imageAlt: "Custom image",
              html: _data.Data.Html,
            }).then((result) => {
              if (result.isConfirmed) {
                if (_data.Data.CaseId == "0" || _data.Data.CaseId == 0) {
                  props.history.push("/home")
                } else {
                  props.history.push("/case-detail/" + _data.Data.CaseId)
                }
              }
            })
          }
        } else {
          setFormLoading(false)
        }

        //Swal.fire({
        //  title: "Payment Complete",
        //  html:
        //    "Thank you! Your transaction has been completed successfully.<br> " +
        //    "Payment Reference No: <b>" +
        //    orderid_CallBack +
        //    "</b>",
        //  icon: "success",
        //}).then((result) => {
        //  if (result.isConfirmed) {

        //    props.history.push("/home");
        //  }
        //});
      } else if (getstatus === "timeoutCallback") {
        setFormLoading(false)
        Swal.fire({
          title: "Failure",
          html: "Session time out",
          icon: "error",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            props.history.push("/home")
          }
        })
      } else if (getstatus === "errorCallback") {
        setFormLoading(false)
        Swal.fire({
          title: "Failure",
          html: "Payment Error", //+
          // "Payment Reference No: <b>" + getorderid + "</b>",
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            props.history.push("/home")
          }
        })

        return
      } else if (getstatus === "cancelCallback") {
        setFormLoading(false)
        Swal.fire({
          title: "Failure",
          html: "Payment has been Cancelled.<br>", // +
          // "Payment Reference No: <b>" + getorderid + "</b>",
          icon: "error",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            props.history.push("/home")
          }
        })

        return
      } else if (getstatus === "Invalid Order id") {
        setFormLoading(false)
        Swal.fire({
          title: "Failure",
          html: "Invalid Order Id.<br>", // +
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            props.history.push("/home")
          }
        })

        return
      } else {
        setFormLoading(false)

        Swal.fire({
          title: "Failure",
          html: "Exception.<br>", // +
          icon: "error",
        }).then((result) => {
          if (result.isConfirmed) {
            props.history.push("/home")
          }
        })

        return
      }
    } else {
      setFormLoading(false)
    }
  }
  // function Transcation_Status_Mark(Paymentstatus,orderid_CallBack)
  // {
  //   fetchData("WebSite", "Payment_Status_Mark_Alfalaha", {
  //      URLStatus:  Paymentstatus + "=" + orderid_CallBack ,
  //     }).then((result) => {

  //     var getstatus = result.split("-")[0];

  //     if (getstatus === "completeCallback")
  //     {
  //       Swal.fire({
  //         title: "Payment Complete",
  //         html:
  //           "Thank you! Your transaction has been completed successfully.<br> " +
  //           "Payment Reference No: <b>" +
  //           orderid_CallBack +
  //           "</b>",
  //         icon: "success",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           props.history.push("/home");
  //         }
  //       });
  //     }

  //     else  if (getstatus === "timeoutCallback")
  //     {
  //       Swal.fire({
  //         title: "Failure",
  //         html: "Session time out",
  //         icon: "error",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           props.history.push("/home");
  //         }
  //       });
  //     }
  //     else  if (getstatus === "errorCallback")
  //     {
  //       Swal.fire({
  //         title: "Failure",
  //         html: "Payment Error", //+
  //        // "Payment Reference No: <b>" + getorderid + "</b>",
  //         icon: "error",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           props.history.push("/home");
  //         }
  //       });

  //       return;
  //     }
  //     else  if (getstatus === "cancelCallback")
  //     {
  //       Swal.fire({
  //         title: "Failure",
  //         html: "Payment has been Cancelled.<br>", // +
  //        // "Payment Reference No: <b>" + getorderid + "</b>",
  //         icon: "error",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           props.history.push("/home");
  //         }
  //       });

  //       return;
  //     }
  //     else if (getstatus === "Invalid Order id")
  //     {
  //       Swal.fire({
  //         title: "Failure",
  //         html: "Invalid Order Id.<br>", // +
  //         icon: "error",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           props.history.push("/home");
  //         }
  //       });

  //       return;
  //     }
  //     else
  //     {

  //       Swal.fire({
  //         title: "Failure",
  //         html: "Exception.<br>", // +
  //         icon: "error",
  //       }).then((result) => {
  //         if (result.isConfirmed) {
  //           props.history.push("/home");
  //         }
  //       });

  //       return;

  //     }
  //   }
  //   );
  // }

  const GetCountry = async () => {
    try {
      var data = await CountryWithCode(1)
      if (data?.Response === true) {
        setCountrySplit(data?.DataSet?.Table)
        setCountryddl(
          data?.DataSet?.Table?.map((item, ind) => ({
            ...item,
            Country: item.Country.split("_")[0],
          }))
        )
        return data
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }
  const GetPaymentType = async () => {
    try {
      var data = await GetSetupMaster(SetupMasterIds.PaymentType, 0, "", 0)
      if (data != null) {
        if (data.response === true && data.data != null) {
          setPaymentddl(data.data)
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

  const GetCompany_BankDetails = async () => {
    try {
      var CompBankData = await Get_CompanyBankDetails()
      if (CompBankData != null) {
        setCompBankDetails(CompBankData.Table)
        return CompBankData
      } else {
        return []
      }
    } catch (error) {
      return []
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    let values = e.target.value
    if (name == "Countryid") {
      countrysplit.filter((item) =>
        item.Countryid == e.target.value
          ? (BasicInfoValues.CountryCode = item.Country.split("_").pop())
          : "123"
      )
      setBasicInfoValues({
        ...BasicInfoValues,
        Countryid: values,
      })
    }
    // if (name == "Countryid") {
    //     setBasicInfoValues({
    //         ...BasicInfoValues,
    //         ["CountryCode"]: e.target.options[e.target.selectedIndex].text
    //             .split(" ")
    //             .pop(),
    //         ["Countryid"]: values,
    //     });
    // }
    else {
      if (
        e.target.type === "checkbox" &&
        e.target.getAttribute("name") == "IsSaveThisInfo"
      ) {
        values = e.target.checked
        setBasicInfoValues({
          ...BasicInfoValues,
          [e.target.getAttribute("name")]: values,
          IsShowReceiveCheckBox: values,
          IsReceiveEmail: values,
          //["TextForCheckBox"]: BasicInfoValues.EmailAddress != '' ? "Please activate login through account activation email" : BasicInfoValues.ContactNo != '' ? "Please call helpline to request password against phone" : '',
        })
      } else if (
        e.target.type === "checkbox" &&
        e.target.getAttribute("name") == "IsReceiveEmail"
      ) {
        values = e.target.checked
        setBasicInfoValues({
          ...BasicInfoValues,
          [e.target.getAttribute("name")]: values,
        })
      } else if (name == "EmailAddress") {
        setBasicInfoValues({
          ...BasicInfoValues,
          [name]: values,
          //["TextForCheckBox"]: values != '' ? "Please activate login through account activation email" : BasicInfoValues.ContactNo != '' ? "Please call helpline to request password against phone" : '',
        })

        //    let contactNo = BasicInfoValues.CountryCode + BasicInfoValues.ContactNo;
        //    GetDonorDetail(values, contactNo,values,name);
      } else if (name == "ContactNo") {
        setBasicInfoValues({
          ...BasicInfoValues,
          [name]: values,
          // ["TextForCheckBox"]: BasicInfoValues.EmailAddress != '' ? "Please activate login through account activation email" : values != '' ? "Please call helpline to request password against phone" : '',
        })
        //    let contactNo =  BasicInfoValues.CountryCode + values;
        //    GetDonorDetail(BasicInfoValues.EmailAddress, contactNo,values,name);
      } else {
        setBasicInfoValues({
          ...BasicInfoValues,
          [name]: values,
        })
      }
    }
  }
  const handleImgeUpload = (e) => {
    handleInputChange(e)
    setAttachment(e.target.files[0])
  }

  const GetDonorDetail = async (
    emailAddress,
    contactNo,
    updatedValue,
    feildname
  ) => {
    try {
      let _data = await fetchData("WebSite", "GetDonor", {
        EmailAddress: emailAddress,
        ContactNumber: contactNo,
      })
      if (_data.Response) {
        if (_data.ResponseCodes == "00") {
          if (_data.Data.length > 0) {
            let _countryCode = countryddl
              .filter((x) => x.Countryid == _data.Data[0].CountryId)[0]
              .Country.split(" ")[1]

            setfeildsIsDisable(true)
            setBasicInfoValues({
              ...BasicInfoValues,
              FirstName: _data.Data[0].FirstName,
              LastName: _data.Data[0].LastName,
              EmailAddress: _data.Data[0].EmailAddress,
              Countryid: _data.Data[0].CountryId,
              ContactNo: _data.Data[0].ContactNumber.replace(_countryCode, ""),
              CountryCode: _countryCode,
              IsShowReceiveCheckBox: true,
              IsSaveThisInfo: true,
              //["TextForCheckBox"]: emailAddress != '' ? "Please activate login through account activation email" : "Please call helpline to request password against phone",
            })
          } else {
            if (feildname == "EmailAddress") {
              setfeildsIsDisable(false)

              setBasicInfoValues({
                ...BasicInfoValues,
                [feildname]: updatedValue,
                IsShowReceiveCheckBox: false,
                IsSaveThisInfo: false,
                //["TextForCheckBox"]: updatedValue != '' ? "Please activate login through account activation email" : "Please call helpline to request password against phone",
              })
            } else {
              setfeildsIsDisable(false)
              setBasicInfoValues({
                ...BasicInfoValues,
                [feildname]: updatedValue,
                IsShowReceiveCheckBox: false,
                IsSaveThisInfo: false,
                //["TextForCheckBox"]: BasicInfoValues.EmailAddress != '' ? "Please activate login through account activation email" : "Please call helpline to request password against phone",
              })
            }
          }
        } else {
          if (feildname == "EmailAddress") {
            setBasicInfoValues({
              ...BasicInfoValues,
              [feildname]: updatedValue,
              //["TextForCheckBox"]: updatedValue != '' ? "Please activate login through account activation email" : "Please call helpline to request password against phone",
            })
          } else {
            setBasicInfoValues({
              ...BasicInfoValues,
              [feildname]: updatedValue,
              //["TextForCheckBox"]: BasicInfoValues.EmailAddress != '' ? "Please activate login through account activation email" : "Please call helpline to request password against phone",
            })
          }
        }
      } else {
        if (feildname == "EmailAddress") {
          setBasicInfoValues({
            ...BasicInfoValues,
            [feildname]: updatedValue,
            //["TextForCheckBox"]: updatedValue != '' ? "Please activate login through account activation email" : "Please call helpline to request password against phone",
          })
        } else {
          setBasicInfoValues({
            ...BasicInfoValues,
            [feildname]: updatedValue,
            //["TextForCheckBox"]: BasicInfoValues.EmailAddress != '' ? "Please activate login through account activation email" : "Please call helpline to request password against phone",
          })
        }
      }
    } catch (e) {}
  }

  function insertData(e) {
    e.preventDefault()
    try {
      if (BasicInfoValues.FirstName === "") {
        Swal.fire({
          title: "Error",
          text: "First Name Required",
          icon: "error",
        })
      } else if (BasicInfoValues.LastName === "") {
        Swal.fire({
          title: "Error",
          text: "Last Name Required",
          icon: "error",
        })
      } else if (
        BasicInfoValues.EmailAddress === "" &&
        BasicInfoValues.IsReceiveEmail
      ) {
        Swal.fire({
          title: "Error",
          text: "Please enter email address to receive notification.",
          icon: "error",
        })
      } else if (!validateEmail(BasicInfoValues.EmailAddress)) {
        Swal.fire({
          title: "Error",
          text: "Email Address Invalid",
          icon: "error",
        })
      } else if (BasicInfoValues.CountryCode === "") {
        Swal.fire({
          title: "Error",
          text: "Country Code Required",
          icon: "error",
        })
      } else if (BasicInfoValues.ContactNo === "") {
        Swal.fire({
          title: "Error",
          text: "Contact Number Required",
          icon: "error",
        })
      } else if (
        BasicInfoValues.ContactNo.length <= 6 ||
        BasicInfoValues.ContactNo.length >= 15
      ) {
        Swal.fire({
          title: "Error",
          text: "Contact Number Length must be 7 digit or more",
          icon: "error",
        })
      } else if (
        BasicInfoValues.PaymentTypeId === 0 ||
        BasicInfoValues.PaymentTypeId === ""
      ) {
        Swal.fire({
          title: "Error",
          text: "Payment Type Required",
          icon: "error",
        })
      } else if (
        BasicInfoValues.Countryid === 0 ||
        BasicInfoValues.Countryid === ""
      ) {
        Swal.fire({
          title: "Error",
          text: "Country Required",
          icon: "error",
        })
      } else {
        Swal.fire({
          customClass: {
            container: "my-swal",
          },
          text: "Are you sure to Process this Payment?",
          icon: "success",
          showCancelButton: true,
          cancelButtonText: `Cancel`,
          allowOutsideClick: false,
          cancelButtonColor: "#2f4050",
          confirmButtonText: `Confirm`,
          confirmButtonColor: "#bf1e2e",
        }).then((result) => {
          if (result.isConfirmed) {
            var data = Insert_Checkout_Detail(
              {
                ...BasicInfoValues,
                ContactNo:
                  BasicInfoValues.CountryCode + BasicInfoValues.ContactNo,
              },
              attachment
            )
            setBasicInfoValues(initialValues)
            return data
          }
        })
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Something Went Wrong",
        icon: "error",
        allowOutsideClick: false,
      })
    }
  }

  const GetApplicantCaseWise = async () => {
    try {
      var data = await Get_All_Cases(caseId)
      if (data != null) {
        if (Object.keys(data).length > 0) {
          const remaining = data.Table[0].Remainingamount
          return remaining
        } else {
        }
      } else {
        //  return [];
      }
    } catch (error) {
      console.log(error)
    }
  }

  const CheckOutPayment = async function (token) {
    try {
      setFormLoading(true)
      try {
        let _PaymentData = JSON.parse(sessionStorage.getItem("checkoutDetail"))
        let _requestData = {
          ApiToken: token,
          EmailAddress: _PaymentData.EmailAddress,
          FirstName: _PaymentData.FirstName,
          IsRegister: _PaymentData.IsSaveThisInfo,
          IsNotifyEmail: _PaymentData.IsReceiveEmail == true ? true : false,
          LastName: _PaymentData.LastName,
          CountryCode: _PaymentData.CountryCode,
          CountryId: parseInt(_PaymentData.Countryid),
          ContactNumber: _PaymentData.ContactNo,
          SuccessUrl: baseApplicationUrl + "/checkout",
          FailureUrl: baseApplicationUrl + "/checkout",
          Address: _PaymentData.Address,
          IsRecievedUpdates,
          NGOId,
          DonationDetail: {
            TotalCount: _noOfOccurences,
            frequeny: parseInt(_frequency),
            Remainder,
            TotalAmount: parseFloat(TotalAmount),
            Is3Ds: true,
            IsSubscriptionProcess: false,
            IsAttemptAn3D: true,
            Amount: parseFloat(amount), //((parseFloat(amount) * parseFloat(exchangeRate)) * 100),
            ExchangeRate: parseFloat(exchangeRate),
            CurrencyId: JSON.parse(
              sessionStorage.getItem("globalSelectedCurrency")
            ).SetupDetailId,
            DonationtypeId: parseInt(_PaymentData.DonationTypeid),
            DonationForId: donationForId,
            IsAdobt: isAdobtWhole,
            ApplicantCaseId:
              _PaymentData.ApplicantCaseID == 0
                ? null
                : _PaymentData.ApplicantCaseID,
            CategoryId:
              _PaymentData.CategoryID == 0 ? null : _PaymentData.CategoryID,
            SubCategoryId:
              _PaymentData.SubCategoryID == 0
                ? null
                : _PaymentData.SubCategoryID,
            UserId: localStorage.getItem("UserId")
              ? localStorage.getItem("UserId")
              : 0,
            UserIp: UserIp,
            Payment_Type: _noOfOccurences > 1 ? "Subscription" : "OneTime",
            Quantity: Quantity == 0 ? null : Quantity, //add line manzoor
            donationcomments: _PaymentData.donationcomments,
            IsRecievedUpdates: IsRecievedUpdates,
            NGOId,
          },
        }
        const data = await fetchData("Website", "PayDonation", _requestData)
        if (data != null) {
          if (data.Response) {
            if (data.ResponseCodes == "00") {
              if (data.Data.HttpStatusCode == 202)
                /////3D Rturn
                window.open(data.Data._links.redirect.Href, "_self")
              else if (data.Data.HttpStatusCode == 201) {
                ///////2D Return
                Swal.fire({
                  title: "Success",
                  text: data.ResponseMessage,
                  icon: "success",
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.open(baseApplicationUrl + "/home", "_self")
                  }
                })
              } else
                Swal.fire({
                  title: "Error",
                  text: data.ResponseMessage,
                  icon: "error",
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload()
                  }
                })
            } else {
              Swal.fire({
                title: "Error",
                text: data.ResponseMessage,
                icon: "error",
                allowOutsideClick: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  window.location.reload()
                }
              })
            }
            // location.href= data.Data._links.redirect.Href;
            setFormLoading(false)
          } else {
            Swal.fire({
              title: "Error",
              text: data.ResponseMessage,
              icon: "error",
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload()
              }
            })
            setFormLoading(false)
          }
        }
      } catch (error) {
        Swal.fire({
          title: "Error",
          text: "Exception",
          icon: "error",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        })
        setFormLoading(false)
        return []
      }
    } catch {}
  }

  function PayProSubmit(e) {
    e.preventDefault()
    try {
      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        text: "Are you sure to process this Payment?",
        icon: "success",
        showCancelButton: true,
        cancelButtonText: `Cancel`,
        cancelButtonColor: "#2f4050",
        allowOutsideClick: false,
        confirmButtonText: `Confirm`,
        confirmButtonColor: "#bf1e2e",
      }).then((result) => {
        if (result.isConfirmed) {
          setFormLoading(true)
          let orderid = getRandomNumber(1, 100000)
          //   localStorage.setItem("gorderid",orderid);
          Insert_PayPro_Detail(
            {
              ...BasicInfoValues,
              BankId: 0,
              ContactNo:
                BasicInfoValues.CountryCode + BasicInfoValues.ContactNo,
              UniqueOrderId: orderid,
            },
            attachment
          ).then((response) => {
            if (response.status === 200) {
              let responsemsg = response.data.split(" - ")[0]
              let responseDesc = response.data.split(" - ")[1]
              let gsessionid = response.data.split(" - ")[1]
              let RedirectURL = response.data.split(" - ")[2]
              if (responsemsg === "00") {
                let CurrExcchRate = BasicInfoValues.CurrencyExchangeRate
                let PKRAmt = BasicInfoValues.Amount * CurrExcchRate
                let getCurr = "PKR" //BasicInfoValues.CurrencyName.split(" - ")[1];
                //window.location.href="http://localhost:50469/Gateway.html?getsessionid="+gsessionid + "&getorderid="+orderid+"&GetAmount=" + (BasicInfoValues.Amount).toFixed(2) + "&GetCurrency=" +getCurr;

                let data =
                  "getsessionid=" +
                  gsessionid +
                  "&getorderid=" +
                  orderid +
                  "&GetAmount=" +
                  parseFloat(PKRAmt).toFixed(2) +
                  "&GetCurrency=" +
                  getCurr
                var ciphertext = CryptoJS.AES.encrypt(
                  JSON.stringify(data),
                  "my-secret-key@123"
                ).toString()

                window.location.href = RedirectURL + "?" + ciphertext
                setBasicInfoValues(initialValues)
              } else {
                setFormLoading(false)
                Swal.fire({
                  title: "Error",
                  text: responseDesc,
                  icon: "error",
                  allowOutsideClick: false,
                })
              }
            } else {
              setFormLoading(false)
              Swal.fire({
                title: "Error",
                text: "Something Went wrong",
                icon: "error",
                allowOutsideClick: false,
              })
            }
          })
        } else if (result.isDismissed) {
          setFormLoading(false)
        }
      })
    } catch (error) {
      setFormLoading(false)
      Swal.fire({
        title: "Error",
        text: "Something Went Wrong",
        icon: "error",
        allowOutsideClick: false,
      })
      setFormLoading(false)
    }
  }

  function onRadioBtnClick(item) {
    setRselected(item)
    setBasicInfoValues({ ...BasicInfoValues, PaymentTypeId: item })
  }

  return (
    <div className="maincontent">
      <HomeHeader Disableds={true} />
      {formLoading === true ? (
        <div class="cloading">
          <Spinner animation="grow" />
        </div>
      ) : (
        ""
      )}
      <div className="content">
        <section id="inner-banner" className="section">
          <div className="container">
            <h2 className="mb-0">Checkout</h2>
          </div>
        </section>
        <section className="section">
          <div className="container">
            <Row>
              <Col md={12}>
                <Card className="cardform">
                  <CardBody className="pt-1">
                    <Row></Row>
                    <Row>
                      <Col md={4}>
                        <div className="case-content">
                          <div className="form-group m-0">
                            <div className="input-group amount-drop">
                              <p>
                                {ngoDetails && (
                                  <>
                                    <b className="text-primary"> NGO: </b>
                                    {ngoDetails ? ngoDetails.Heading : ""}
                                    {ngoDetails && ngoDetails?.CaseName
                                      ? " - " + ngoDetails?.CaseName + " case"
                                      : ""}
                                  </>
                                )}
                                <br />
                                <b className="text-primary"> Donation: </b>
                                {parseFloat(AmountInPKR).toFixed(2) !==
                                undefined
                                  ? isNaN(
                                      Math.floor(
                                        parseFloat(AmountInPKR).toFixed(2)
                                      )
                                    )
                                    ? 0
                                    : ConvertNumricToComaSeparate(
                                        Math.floor(
                                          parseFloat(AmountInPKR).toFixed(2)
                                        ).toFixed(2)
                                      )
                                  : 0}{" "}
                                {" PKR"}
                                {/* {currencyName !== undefined
                                  ? " " + currencyName
                                  : " PKR"}{" "} */}
                                {showFundText && (
                                  <>
                                    <br />
                                    <small
                                      style={{
                                        fontSize: "12px",
                                      }}
                                    >
                                      {fromPath === QURBANI_DONATE_PATH
                                        ? "Sacrificial meat and skins will be delivered to the NGO of your choice by the 3rd day of Eid."
                                        : `Funds will be transferred to the specified
                                      NGO in 5-7 working days.`}
                                    </small>
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col md={4}>
                        <label className="form-label">
                          {fromPath === QURBANI_DONATE_PATH
                            ? "Special Instructions:"
                            : "Leave A Note:"}
                        </label>
                        <div className="case-content">
                          <FormGroup>
                            <Input
                              type="text"
                              className="form-control"
                              id=""
                              name="donationcomments"
                              value={BasicInfoValues.donationcomments}
                              onChange={handleInputChange}
                              required={true}
                              disabled={feildsIsDisable}
                              maxLength="100"
                            />
                          </FormGroup>
                        </div>
                      </Col>
                      <Col md={4}>
                        <p className="pt-3">
                          {/* 100% of your donations (minus bank charges) will be used in charity to help families in need. Our administrative costs are covered by private donors. */}
                          100% of your donations net of transaction charges go
                          to charity.
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={8} className="personal-info">
                        <h4 className="pb-2 pt-2">Personal Information</h4>
                        <form onSubmit={PayProSubmit}>
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <label className="form-label">
                                  First Name*
                                </label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  id=""
                                  name="FirstName"
                                  value={BasicInfoValues.FirstName}
                                  onChange={handleInputChange}
                                  required={true}
                                  disabled={feildsIsDisable}
                                  maxLength="100"
                                />
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <label className="form-label">Last Name*</label>
                                <Input
                                  type="text"
                                  className="form-control"
                                  name="LastName"
                                  value={BasicInfoValues.LastName}
                                  onChange={handleInputChange}
                                  disabled={feildsIsDisable}
                                  required={true}
                                  maxLength="100"
                                />
                              </FormGroup>
                            </Col>

                            <Col md={6}>
                              <FormGroupInput
                                label="Email Address*"
                                name="EmailAddress"
                                value={BasicInfoValues.EmailAddress}
                                onChange={handleInputChange}
                                disabled={feildsIsDisable}
                                required={true}
                                type="email"
                              />
                            </Col>
                            <Col md={6}>
                              <FormGroupSelect
                                label="Country*"
                                name="Countryid"
                                value={BasicInfoValues.Countryid}
                                onChange={handleInputChange}
                                disabled={feildsIsDisable}
                                list={countryddl}
                                fieldId="Countryid"
                                fieldName="Country"
                                required={true}
                              />
                            </Col>
                            <Col md={6}>
                              <div className="case-count">
                                <div className="form-group m-0">
                                  <Label>Phone No*</Label>
                                  <div className="input-group amount-drop">
                                    <Input
                                      style={{ width: "80px" }}
                                      name="CountryCode"
                                      value={BasicInfoValues.CountryCode}
                                      disabled
                                    />
                                    <JustInput
                                      name="ContactNo"
                                      value={BasicInfoValues.ContactNo}
                                      onChange={handleInputChange}
                                      maxLength="15"
                                      disabled={feildsIsDisable}
                                      isNumber="true"
                                      required={true}
                                    />
                                  </div>
                                </div>
                              </div>
                            </Col>
                            {parseInt(BasicInfoValues.PaymentTypeId) ===
                            SetupMasterIds.PaymentType_Cheque ? (
                              <Col md={6}>
                                <FormGroupSelect
                                  label="Bank*"
                                  name="BankId"
                                  value={BasicInfoValues.BankId}
                                  onChange={handleInputChange}
                                  list={CompBankDetails}
                                  fieldId="BankID"
                                  fieldName="BankName"
                                />
                              </Col>
                            ) : (
                              ""
                            )}
                            {BasicInfoValues.BankId != "" ? (
                              <Col md={6}>
                                <FormGroupInput
                                  label="Cheque No"
                                  name="ChequeNo"
                                  value={BasicInfoValues.ChequeNo}
                                  onChange={handleInputChange}
                                  isNumber="true"
                                />
                              </Col>
                            ) : (
                              ""
                            )}
                            <Col md={6}>
                              <FormGroupInput
                                label="Address"
                                name="Address"
                                value={BasicInfoValues.Address}
                                disabled={feildsIsDisable}
                                onChange={handleInputChange}
                                maxLength="200"
                              />
                            </Col>

                            <Col md={6}>
                              {parseInt(BasicInfoValues.PaymentTypeId) ===
                                SetupMasterIds.PaymentType_Cheque ||
                              parseInt(BasicInfoValues.PaymentTypeId) ===
                                SetupMasterIds.CASH ? (
                                <FormGroup>
                                  <Label>Attachment</Label>
                                  <Input
                                    name="Attachement"
                                    type="file"
                                    ref={imageRef}
                                    onChange={handleImgeUpload}
                                  />
                                </FormGroup>
                              ) : (
                                //line
                                ""
                              )}
                            </Col>
                          </Row>

                          <Row
                            style={{
                              display: feildsIsDisable ? "none" : "flex",
                            }}
                          >
                            <Col md={6} className="justify-content-end">
                              <div className="form-check-inline mt-2 mb-2">
                                <Label className="form-check-Label case-details-donation">
                                  <Input
                                    name="IsSaveThisInfo"
                                    value={BasicInfoValues.IsSaveThisInfo}
                                    onChange={handleInputChange}
                                    type="checkbox"
                                    IsCheckBoxSaveInfo="true"
                                    className="form-check-Input custom-input"
                                  />
                                  Activate Donor Account
                                </Label>
                                <i
                                  className="fa fa-question-circle ml-1"
                                  id="activateAccount"
                                ></i>
                                <Tooltip
                                  placement="top"
                                  isOpen={tooltipOpen}
                                  target="activateAccount"
                                  toggle={toggleTooltip}
                                  autohide={false}
                                  style={{
                                    backgroundColor: "#fff",
                                    color: "#000",
                                    border: "1px solid #000",
                                    padding: "10px",
                                    fontSize: "14px",
                                    borderRadius: "4px",
                                    boxShadow: "0px 0px 5px #000",
                                  }}
                                >
                                  <p>
                                    You can view and manage your donations with
                                    a donor account
                                  </p>
                                </Tooltip>
                              </div>
                            </Col>
                            <Col
                              md={6}
                              style={{
                                display: BasicInfoValues.IsShowReceiveCheckBox
                                  ? "block"
                                  : "none",
                              }}
                            >
                              <div className="form-check-inline mt-2 mb-2">
                                <Label className="form-check-Label case-details-donation">
                                  <Input
                                    name="IsReceiveEmail"
                                    value={BasicInfoValues.IsReceiveEmail}
                                    onChange={handleInputChange}
                                    type="checkbox"
                                    isReceiveEmail="true"
                                    className="form-check-Input custom-input"
                                    checked={BasicInfoValues.IsReceiveEmail}
                                  />
                                  Receive Email notification on donation
                                  payment.
                                </Label>
                              </div>
                              <Label className="form-check-Label case-details-donation">
                                {BasicInfoValues.TextForCheckBox}
                              </Label>
                            </Col>
                          </Row>

                          {/* <Row style={{ display: BasicInfoValues.IsShowReceiveCheckBox ? "block" : "none" }}>
                                                <Col md={12} style={{ display: BasicInfoValues.IsShowReceiveCheckBox ? "block" : "none" }}>

                                                    <FormGroup >
                                                    <p><Label className="form-check-Label case-details-donation">
                                                                {BasicInfoValues.TextForCheckBox}
                                                            </Label></p>
                                                        <div className="form-check-inline mt-2 mb-2">
                                                        
                                                            <Label className="form-check-Label case-details-donation">
                                                                <Input
                                                                    name="IsReceiveEmail"
                                                                    value={BasicInfoValues.IsReceiveEmail}
                                                                    onChange={handleInputChange}
                                                                    type="checkbox"
                                                                    isReceiveEmail="true"
                                                                    className="form-check-Input custom-input"
                                                                />
                                                                Receive Email notification on donation payment.

                                                            </Label>
                                                        </div>
                                                    </FormGroup>

                                                </Col>

                                            </Row> */}
                          {/* <Row
                        style={{ justifyContent: "end", alignItems: "center" }}

                        className="pt-1"
                      >
                        <Col md="9">

                    
                  <div>
                     <h4 className="mb-6 text-primary">
                      <strong>
                      May God accept your donation in His Name. Ameen.
                      </strong>
                    </h4>
                  
                  </div>
              
                        </Col>
                        {parseInt(BasicInfoValues.PaymentTypeId) ===
                          SetupMasterIds.PaymentType_Cheque ||
                        parseInt(BasicInfoValues.PaymentTypeId) ===
                          SetupMasterIds.CASH ? ( //line
                          <Col md={3}>
                            <Button
                              size="md"
                              block
                              color="primary"
                              className="pt-3 "
                              onClick={insertData}
                            >
                              SUBMIT
                            </Button>
                          </Col>
                        ) : (
                          //line
                          ""
                        )}

                     
                        <Col md={3}>
                          <Button
                            
                            size="md"
                            block
                            color="primary"
                            className="pt-3"
                            
                          >
                            Checkout
                          </Button>
                        </Col>
                      </Row> */}

                          {/* <Row>
                <Col>
                  <div>
                     <h4 className="mb-6 text-primary">
                      <strong>
                      May GOD accept your donation in His Name. Ameen.
                      </strong>
                    </h4>
                  
                  </div>
                </Col>
              </Row> */}
                        </form>
                      </Col>
                      <Col md={4}>
                        <Card className="payment-info mb-0">
                          <h4 className="pt-2 pb-2">Payment Info</h4>
                          <p
                            style={{
                              fontSize: "12px",
                            }}
                          >
                            If you are not a <b>Visa</b> or <b>Mastercard</b>{" "}
                            holder, scroll down for Direct Bank Transfer
                            details. Having trouble donating?{" "}
                            <a
                              href="https://wa.me/3018444959"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Chat with us
                            </a>
                          </p>

                          <div class="one-liner">
                            <div class="card-frame paymint-frame">
                              <Frames
                                config={{
                                  publicKey: CheckoutKey,
                                  style: {
                                    base: {
                                      color: "black",
                                      fontSize: "12px",
                                    },
                                    autofill: {
                                      backgroundColor: "yellow",
                                    },
                                    hover: {
                                      color: "blue",
                                    },
                                    focus: {
                                      color: "blue",
                                    },
                                    valid: {
                                      color: "green",
                                    },
                                    invalid: {
                                      color: "red",
                                    },
                                    placeholder: {
                                      base: {
                                        color: "gray",
                                      },
                                      focus: {
                                        border: "solid 0px blue",
                                      },
                                    },
                                  },
                                }}
                                ready={() => {}}
                                frameActivated={(e) => {}}
                                frameFocus={(e) => {}}
                                frameBlur={(e) => {}}
                                frameValidationChanged={(e) => {}}
                                paymentMethodChanged={(e) => {}}
                                cardValidationChanged={(e) => {}}
                                cardSubmitted={() => {}}
                                cardTokenized={(e) => {
                                  Swal.fire({
                                    text: "Are you sure to process this Payment?",
                                    // html:'<b>Are you sure to process this Payment?<br/>'+BasicInfoValues.EmailAddress != '' ? 'Please activate login through account activation email': BasicInfoValues.ContactNo != '' ? 'Please call helpline to request password against phone' : '' +' </b>',

                                    // html: BasicInfoValues.EmailAddress != '' ? '<div><h3>Are you sure to process this Payment?</h3><br/><h5>Please activate login through account activation email</h5></div>':BasicInfoValues.ContactNo != '' ? '<div><h3>Are you sure to process this Payment?</h3><br/><h5>Please call helpline to request password against phone</h5></div>' : '' ,
                                    icon: "success",
                                    showCancelButton: true,
                                    cancelButtonText: `Cancel`,
                                    allowOutsideClick: false,
                                    cancelButtonColor: "#2f4050",
                                    confirmButtonText: `Confirm`,
                                    confirmButtonColor: "#bf1e2e",
                                  }).then(async (result) => {
                                    if (result.isConfirmed) {
                                      if (fromPath === "caseDetail") {
                                        console.log("🚀  From case Detail.")
                                        const remainingAmount =
                                          await GetApplicantCaseWise()
                                        console.log(
                                          "🚀  Remaining Amount state",
                                          remainingAmount
                                        )
                                        if (!remainingAmount) {
                                          return Swal.fire({
                                            title: "Error",
                                            text: "This Case is already funded.",
                                            icon: "error",
                                            allowOutsideClick: false,
                                          }).then((result) => {
                                            if (result.isConfirmed) {
                                              window.location.href = "/home"
                                            }
                                          })
                                        }
                                      } else {
                                        console.log("🚀  From case Detail not.")
                                      }
                                      CheckOutPayment(e.token)
                                    } else {
                                      window.location.reload()
                                    }
                                  })
                                }}
                                cardTokenizationFailed={(e) => {}}
                                cardBinChanged={(e) => {}}
                              >
                                <CardFrame />

                                <button
                                  onClick={() => {
                                    if (BasicInfoValues.FirstName === "") {
                                      Swal.fire({
                                        title: "Error",
                                        text: "First Name Required",
                                        icon: "error",
                                      })
                                    } else if (
                                      BasicInfoValues.LastName === ""
                                    ) {
                                      Swal.fire({
                                        title: "Error",
                                        text: "Last Name Required",
                                        icon: "error",
                                      })
                                    } else if (!BasicInfoValues.EmailAddress) {
                                      Swal.fire({
                                        title: "Error",
                                        text: "Please enter Email Address.",
                                        icon: "error",
                                      })
                                    } else if (
                                      !validateEmail(
                                        BasicInfoValues.EmailAddress
                                      )
                                    ) {
                                      Swal.fire({
                                        title: "Error",
                                        text: "Email Address Invalid",
                                        icon: "error",
                                      })
                                    } else if (
                                      BasicInfoValues.EmailAddress === "" &&
                                      BasicInfoValues.IsReceiveEmail
                                    ) {
                                      Swal.fire({
                                        title: "Error",
                                        text: "Please enter email address to receive notification.",
                                        icon: "error",
                                      })
                                    } else if (
                                      !validateEmail(
                                        BasicInfoValues.EmailAddress
                                      ) &&
                                      BasicInfoValues.IsReceiveEmail
                                    ) {
                                      Swal.fire({
                                        title: "Error",
                                        text: "Email Address Invalid",
                                        icon: "error",
                                      })
                                    } else if (
                                      BasicInfoValues.CountryCode === ""
                                    ) {
                                      Swal.fire({
                                        title: "Error",
                                        text: "Country Code Required",
                                        icon: "error",
                                      })
                                    } else if (
                                      BasicInfoValues.ContactNo === ""
                                    ) {
                                      Swal.fire({
                                        title: "Error",
                                        text: "Contact Number Required",
                                        icon: "error",
                                      })
                                    } else if (
                                      BasicInfoValues.ContactNo.length < 7 ||
                                      BasicInfoValues.ContactNo.length > 16
                                    ) {
                                      Swal.fire({
                                        title: "Error",
                                        text: "Phone number length must be from 7 to 15 digits",
                                        icon: "error",
                                      })
                                    } else if (
                                      BasicInfoValues.Countryid === 0 ||
                                      BasicInfoValues.Countryid === ""
                                    ) {
                                      Swal.fire({
                                        title: "Error",
                                        text: "Country Required",
                                        icon: "error",
                                      })
                                    } else {
                                      sessionStorage.setItem(
                                        "checkoutDetail",
                                        JSON.stringify(BasicInfoValues)
                                      )
                                      Frames.submitCard()
                                    }
                                  }}
                                >
                                  {"PAY " +
                                    (currentCurrencyFromSymbol === undefined
                                      ? ""
                                      : currentCurrencyFromSymbol) +
                                    " " +
                                    (currentCurrencyAmount === undefined
                                      ? 0
                                      : ConvertNumricToComaSeparate(
                                          currentCurrencyAmount.toFixed(2)
                                        ))}
                                </button>
                              </Frames>
                            </div>
                            <div className="text-center">
                              <p>
                                <strong>
                                  Via{" "}
                                  <a href="https://www.checkout.com/">
                                    Checkout.com
                                  </a>
                                </strong>
                              </p>
                            </div>
                          </div>
                          <div className="row mb-2 mt-2">
                            <div className="col-lg-6 text-center">
                              <img height="50" src={pcidss} alt="SabSaath" />
                            </div>
                            <div className="col-lg-6 text-center">
                              <img
                                height="50"
                                src={Threedsimg}
                                alt="SabSaath"
                              />
                            </div>
                          </div>
                          <p className="text-center">
                            We strictly care for your privacy and never store
                            your card information.{" "}
                            <a
                              href="/TermsAndConditions#Payment-Card-Security"
                              target={"_blank"}
                              rel="noopener noreferrer"
                            >
                              Learn More
                            </a>
                          </p>
                          {/* {CompBankDetails?.map((data, key) => (
                      <div key={key}>
                        <div className="case-img">
                          <img src={baseImageUrl + data.imageUrl} alt="" />
                        </div>
                        
                        <ul className="list-unstyled list-py-1 pt-0 pb-2">
                          <li>
                          {data.BankID === SetupMasterIds.MeezanBank ? ( 
                            <div className="">
                              <p
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                <b>Bank:</b>
                                {data.BankName !== null ? data.BankName : ""}<br/>
                                For Western Union, Xoom, and International Bank Fund Transfer (IBFT)

                               </p>
                              </div>
                         ) : (
                          <div className="">
                          <p
                            style={{
                              fontSize: "16px",
                              marginBottom: "0px",
                            }}
                          >
                            <b>Bank:</b>
                            {data.BankName !== null ? data.BankName : ""}
                           

                          </p>
                          </div>

                          )}
                          </li>
                          <li>
                            <div className="">
                              <p
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                <b>A/C Title:</b>{" "}
                                {data.AccountTitle !== null
                                  ? data.AccountTitle
                                  : ""}
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="">
                              <p
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                <b>A/C No: </b>
                                {data.AccountNo !== null ? data.AccountNo : ""}
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="">
                              <p
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                <b>IBAN:</b>{" "}
                                {data.IBAN !== null ? data.IBAN : ""}
                              </p>
                            </div>
                          </li>
                          <li>
                            <div className="">
                              <p
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                <b> Bank Swift Code:</b>{" "}
                                {data.SwiftCode !== null ? data.SwiftCode : ""}
                              </p>
                            </div>
                          </li>

                          <li>
                            <div className="">
                              <p
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                <b>Branch Name:</b>{" "}
                                {data.BankBranchName !== null
                                  ? data.BankBranchName
                                  : ""}
                              </p>
                            </div>
                          </li>

                          <li>
                            <div className="">
                              <p
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                <b>Branch Address: </b>
                                {data.BranchAddress !== null
                                  ? data.BranchAddress
                                  : ""}
                              </p>
                            </div>
                          </li>

                          <li>
                            <div className="">
                              <p
                                style={{
                                  fontSize: "16px",
                                  marginBottom: "0px",
                                }}
                              >
                                Please send your proof of payment via WhatsApp on +923018444959 with your full name.
                                
                              </p>
                            </div>
                          </li>

                        </ul>
                      </div>
                    ))} */}
                        </Card>

                        {/* <Card>
                                    <CardHeader>Collect from Home</CardHeader>
                                    <CardBody>
                                        <div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item p-2 d-flex pl-0">
                                                    <i className="fa fa-envelope fa-2x text-primary"></i>
                                                    <span className="pl-3">
                                                        <h6>Mail us at</h6>{" "}
                                                        <a href="mailto:info@sabsaath.org">
                                                            info@sabsaath.org
                                                        </a>
                                                    </span>
                                                </li>
                                                <li className="list-group-item p-2 d-flex pl-0">
                                                    <i className="fa fa-phone fa-2x text-primary"></i>
                                                    <span className="pl-3">
                                                        <h6>Call us at</h6> <a>042-111-222-500</a>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </CardBody>
                                </Card> */}

                        {/* <Card>
                  <CardHeader>Jazz Cash/ Easy Paisa</CardHeader>

                  <CardBody>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item p-2 d-flex pl-0">
                        <i className="fa fa-phone fa-2x text-primary"></i>
                        <span className="pl-3">
                          <h6>Call us at</h6>{" "}
                          <a href="tel:042111222500">042-111-222-500</a>
                        </span>
                      </li>
                    </ul>
                  </CardBody>
                </Card> */}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </section>
      </div>

      <HomeFooter
        hideFooter={
          fromPath === QURBANI_DONATE_PATH
            ? false
            : ngoDetails?.isZF
            ? false
            : !ngoDetails
            ? false
            : ngoDetails &&
              ngoDetails?.NGOFeatureID === SetupMasterIds.ZamanFoundation &&
              ngoDetails?.NGOFeatureID === SetupMasterIds.ZamanFoundationNGO
            ? false
            : true
        }
        bankContent={
          ngoDetails?.BankName &&
          ngoDetails?.caseSource !== SetupMasterIds.ZamanFoundation &&
          ngoDetails?.caseSource !== SetupMasterIds.ZamanFoundationNGO
            ? ngoDetails?.BankName
            : null
        }
      />
    </div>
  )
}

export default CheckOut
