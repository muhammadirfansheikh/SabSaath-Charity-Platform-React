import React, { useState ,useEffect } from "react";
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
    Input
} from "reactstrap";
import { baseImageUrl, fetchData } from '../utils/Api.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../utils/Constants.js'
import { GetSetupMaster, DeleteSetupDetail, GetCompanies, GetDonors, dateFormatPlaceholder, dateFormat, getDate } from '../utils/CommonMethods.js'

import Swal from "sweetalert2";
import ModalDonor from 'components/modal/ModalDonor';
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import DatePicker from "react-datepicker";
import useEditRole from "hooks/useEditRole.js";

const Donor = (props) => {
  const [role, appId] = useEditRole();
   const initialSelectList = {
    CountryList: [],
  };

  const initialValues = {
    country: 0,
    FirstName: "",
    LastName: "",
    ContactNo: "",
    Address: "",
    EmailAddress: "",
    DonationFrom: "",
    DonationTo: "",
    PaymentType: "0",
    ApplicantCaseCode: "",
    CategoryID:"0",
    SubCategoryID:"0",

  };

  const [formFields, setFormFields] = useState(initialValues);
  const [selectionLists, setSelectionLists] = useState(initialSelectList);
  const [DonorList, setDonorList] = useState([]);
  useEffect(()=>{console.log("myformFields",formFields);},[formFields])

  const [DonorEditId, setDonorEditId] = useState(0);
  const [editBlog, setEditBlog] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [donorEditId, setdonorEditId] = useState(0);
  const [PaymentTypeddl, setPaymentTypeddl] = useState([]);
  
  const [Categoryddl, setCategoryddl] = useState([]);
  const [SubCategoryddl, setSubCategoryddl] = useState([]);

  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });

    if (event.target.name === "CategoryID") {
      GetSubCategory(event.target.value);
    }
  };

  useEffect(() => {
    const fetchDataLsit = () => {
      fetchData("WebSite", "DonationSubmit_CRM", {
        OperationID: 3,
      }).then((result) => {
        if (result?.DataSet?.Table[0]?.HasError > 0) {
          Swal.fire({
            title: "Error",
            text: result.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        }
        setDonorList(result?.DataSet?.Table);
        setSelectionLists({
          ...selectionLists,
          InvestigatorList: result?.DataSet?.Table1,
        });
      });
    };

        const GetPaymentType = async () => {
          try {
            var data = await GetSetupMaster(SetupMasterIds.PaymentType, 0, "", 0);
            if (data != null) {
              if (data.response === true && data.data != null) {
                setPaymentTypeddl(data.data);
                return data;
              } else {
                return [];
              }
            } else {
              return [];
            }
          } catch (error) {
            return [];
          }
        };

  

    fetchDataLsit();
    GetPaymentType();
    GetCategory();
  }, []);

  const GetCategory = async (e) => {
  
    var catValues = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0);
    setCategoryddl(catValues.data);
  };
  const GetSubCategory = async (e) => {
    var subCatValues = await GetSetupMaster(
      SetupMasterIds.FundCategory,
      parseInt(e),
      "",
      0
    );

    setSubCategoryddl(subCatValues.data);
  };

  const searchInfo = async (e) => {
 
    formFields.DonationFrom = getDate(formFields.DonationFrom, "-", "yyyy/mm/dd" );
    formFields.DonationTo = getDate(formFields.DonationTo, "-", "yyyy/mm/dd");
    fetchData("WebSite", "DonationSubmit_CRM", {
      OperationID: 3,
      ApplicantCaseCode: formFields.ApplicantCaseCode,
      FirstName: formFields.FirstName, // as Donor Name
      ContactNo: formFields.ContactNo,
      DonationFrom: formFields.DonationFrom,
      DonationTo: formFields.DonationTo,
      PaymentTypeId: formFields.PaymentType,
      CategoryID: formFields.CategoryID,
      SubCategoryID: formFields.SubCategoryID,
    }).then((result) => {
      if (result?.DataSet?.Table[0]?.HasError > 0) {
      
       // 
        Swal.fire({
          title: "Error",
          text: result.DataSet.Table[0].Message,
          icon: "error",
        });
        return;
      }
      setDonorList(result?.DataSet?.Table);
      setSelectionLists({
        ...selectionLists,
        InvestigatorList: result?.DataSet?.Table1,
      });
    });
  };
  const cancelClickHandle = () => {
    setFormFields({
      ...initialValues,
    });
    searchInfo();
  };

      const openNewmodal = (blogId) => {
        setdonorEditId(blogId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        searchInfo();
    }


    const AllDateSet = (event, type) => {
      if (type === "DonationFrom")
       {
        setFormFields({
          ...formFields,
          DonationFrom: event,
         
        });
        
      }
      else if(type === "DonationTo")
      {
        setFormFields({
          ...formFields,
          DonationTo: event,
         
        });
      }
    };

       return (
        <>
          <div className="content">
           <Row>
         
              <Col lg={12} md={12}>
                <Card className="card-user">
                  <CardBody>
                    <form >
                      <Row form>
                      <Col md={3}>
                          <FormGroup>
                            <Label for="">Case Code</Label>
                            <Input
                              placeholder="Case Code"
                              type="text"
                              name="ApplicantCaseCode"
                              value={formFields.ApplicantCaseCode}
                              onChange={handleInputChange}
                             />
                          </FormGroup>
                         </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Donor Name</Label>
                        <Input
                          placeholder="Donor Name"
                          type="text"
                          name="FirstName"
                          value={formFields.FirstName}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Donor Contact</Label>
                        <Input
                          placeholder="Donor Contact"
                          type="text"
                          name="ContactNo"
                          value={formFields.ContactNo}
                          onChange={handleInputChange}
                        />
                      </FormGroup>
                    </Col>

                    <Col md={3}>
                      <Label for="InputDate">Donation From</Label>
                      <DatePicker
                        value={getDate(formFields.DonationFrom, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) => AllDateSet(e, "DonationFrom")}
                        className="form-control"
                        name="DonationFrom"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>
                    <Col md={3}>
                      <Label for="InputDate">Donation To</Label>
                      <DatePicker
                        value={getDate(formFields.DonationTo, "/")}
                        dateFormat={dateFormat}
                        onChange={(e) => AllDateSet(e, "DonationTo")}
                        className="form-control"
                        name="DonationTo"
                        placeholderText={dateFormatPlaceholder}
                        showYearDropdown
                      />
                    </Col>
                    <Col md={3}>
                    <FormGroup>
                      <Label for="InputState">Fund Category</Label>
                      <Input
                        id="ddlCategory"
                        name="CategoryID"
                        type="select"
                        onChange={handleInputChange}
                        value={formFields.CategoryID}
                      >
                        <option key={0} value={0}>
                          Select
                        </option>
                        {Categoryddl.map((item, key) => (
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
                        name="SubCategoryID"
                        type="select"
                        onChange={handleInputChange}
                        value={formFields.SubCategoryID}
                      >
                        <option key={0} value={0}>
                          Select
                        </option>
                        {SubCategoryddl.map((item, key) => (
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
                        <Label for="InputState">Payment Type</Label>
                        <Input
                          id="PaymentTypeName"
                          name="PaymentType"
                          type="select"
                          value={formFields.PaymentType}
                          onChange={handleInputChange}
                          // disabled={role}
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          {PaymentTypeddl.map((item, key) => (
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
                    <Col md={12} className="text-right">
                      <Button
                        color="primary"
                        className="mr-2"
                        onClick={searchInfo}
                      >
                        Search
                      </Button>
                      <Button color="secondary" onClick={cancelClickHandle}>
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12}>
            <Card>
              <CardHeader>
                <Row>
                  <Col lg={6} md={6}>
                    Donation List
                  </Col>
                  <Col lg={6} md={6} className="text-right">
                    <Button
                      color="primary2"
                      size="sm"
                      className="m-0"
                      onClick={() => openNewmodal({ DonationTypeId: 0 })}
                    >
                      Add New
                    </Button>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Source</th>
                      <th>Donor Name</th>
                      <th>Contact</th>
                      <th>Email Address</th>
                      <th>Donation Received Date</th>
                      <th>Amount</th>
                      <th>Payment Type</th>
                      <th>Case Code</th>
                      <th>Category</th>
                      <th>Sub Category</th>
                      <th>Receipt</th>
                     {/* <th>Action</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {DonorList &&
                      DonorList.map((item, key) => (
                        <tr key={key}>
                          <td>{key + 1}</td>
                          <td>{item.IsWebsiteDonor}</td>
                          <td>{item.FirstName}</td>
                          <td>{item.ContactNumber}</td>
                          <td>{item.EmailAddress}</td>
                          <td>{item.Date}</td>
                          <td>{item.DonationAmount}</td>
                          <td>{item.PaymentType}</td>
                          <td>{item.ApplicantCaseCode}</td>
                          <td>{item.Category}</td>
                          <td>{item.subCategory}</td>
                          <td>
                          <a href={baseImageUrl + item.DocAttachment} target="_blank"> <i className="fa fa-file" /></a>
                           </td>
                           </tr>
                      ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {openModal && (
          <ModalDonor
            {...props}
            HeaderText="Add Donation"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            blogId={DonorEditId}
            setFetchAgain={setFetchAgain}
            editData={editBlog}
          />
        )}
      </div>
    </>
  );
};

export default Donor