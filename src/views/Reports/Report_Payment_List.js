import React, { useState } from "react";
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

import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { fetchData } from 'utils/Api'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from 'utils/Constants'
import { GetSetupMaster, AllowAlphabatic,GetCurrentDateWithFormat, dateFormatPlaceholder, getDate, dateFormat } from 'utils/CommonMethods'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import Swal from "sweetalert2";
import DatePicker from "react-datepicker";

const Report_Payment_List = (props) => {

    let defaultFromDate = new Date()
    //defaultFromDate.setDate(defaultFromDate.getDate() - 27);


    let defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate());

    const searchingValues = {
        FromDate: defaultFromDate.toLocaleDateString('en-CA'),
        ToDate:   defaultDate.toLocaleDateString('en-CA'),
        ApplicantCaseCode: "",
        ApplicantName: "",
        CNIC: "",
        SupportType: -1,
        FundSubCategoryId: -1,
        FundCategoryId: -1
        

    };

    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportList, setreportList] = useState([]);



    const [categoryddl, setcategoryddl] = useState([]);
    const [fundCategroyddl, setfundCategroyddl] = useState([]);
    const [primarySupportddl, setprimarySupportddl] = useState([]);
    const [finalData, setFinalData] = useState({});
   

    const columns = [
        {
            name: 'ApplicantCaseCode',
            selector: 'ApplicantCaseCode',
            sortable: true
        },
        
        {
            name: 'ApplicantName',
            selector: 'ApplicantName',
            sortable: true
        },
        
        {
            name: 'CnicNo',
            selector: 'CnicNo',
            sortable: true
        },
        {
            name: 'SupportType',
            selector: 'SupportType',
            sortable: true
        },
        {
            name: 'Category',
            selector: 'Category',
            sortable: true
        },
        {
            name: 'FundCategoryName',
            selector: 'FundCategoryName',
            sortable: true
        },
        {
            name: 'PaymentSchedule_Date',
            selector: 'PaymentSchedule_Date',
            sortable: true
        },
        {
            name: 'PayableAmount',
            selector: 'PayableAmount',
            sortable: true
        },
        {
            name: 'PaymentFrequency',
            selector: 'PaymentFrequency',
            sortable: true
        },
    ]

    const handleInputChange = (e) => {



  
        const { name, value } = e.target;
        let _values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") {
    //      
            _values = AllowAlphabatic(e.target.value);
        }
        else if (e.target.getAttribute("isnumber") == "true")
            _values = e.target.value.replace(/\D/g, "");






        setSearchVlues({
            ...searchValues,
            [name]: _values,
        });

        //const { name, value } = e.target;

        //seatSearchVlues({
        //  ...searchValues,
        //  [name]: value,
        //});
    };
    const [pending, setPending] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(reportList);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            resetFormelement();
        };
        load();
    }, []);



    const resetFormelement = async () => {

        setSearchVlues(searchingValues);

 
      
        let ddlCategory = await GetCategory();

        setprimarySupportddl([{ Name: "Yes", Value: 1 }, { Name: "No", Value: 0 }]);


        setcategoryddl(ddlCategory.data);
      

        let fundCategoryddl = await GetFundCategory(-1);

        setfundCategroyddl(fundCategoryddl.data);

        ReBindGrid();


    }





   
    const GetCategory = async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.Category, 0, "", 0);

        return data;
    }

    

    
    const GetFundCategory = async (CategoryId) => {

        var data = await GetSetupMaster(SetupMasterIds.FundCategory, CategoryId == "0" ? "-1" : CategoryId, "", 0);

        return data;
    }
    const handleCategoryChange = async (e) => {
 //     
        handleInputChange(e);
        let fundCategoryddl = await GetFundCategory(e.target.value);

        setfundCategroyddl(fundCategoryddl.data);


    }

    const handleSearchClick = async (e) => {
        e.preventDefault();

        if (searchValues.FromDate != "") {
            if (searchValues.ToDate != "") {
                ReBindGrid();
            }
            else {
                Swal.fire({ title: 'Warning', text: "Select To Date", icon: 'warning' });
            }
        }
        else {
            Swal.fire({ title: 'Warning', text: "Select From Date", icon: 'warning' });
        }



    }

    const handleCancelClick = async (e) => {

        e.preventDefault();


        resetFormelement();


    }
    const GetPaymentListReport = async () => {
        try {
  //        
            searchValues.FundCategoryId = searchValues.FundCategoryId == -1 ? null : searchValues.FundCategoryId;
            searchValues.FundSubCategoryId = searchValues.FundSubCategoryId == -1 ? null : searchValues.FundSubCategoryId;
            searchValues.FromDate =  getDate(searchValues.FromDate,"-","yyyy/mm/dd");
            searchValues.ToDate  = getDate(searchValues.ToDate,"-","yyyy/mm/dd");
            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_Payment_List,
                searchValues
            ); 
            if (data != null) {

                if (data.Response === true && data.DataSet != null) {
                    return data.DataSet.Table;
                } else {
                    return [];
                }
            } else {
                return [];
                Swal.fire({ title: "Error", text: "Error", icon: "error" }); 
            }
        } catch (error) {
            return []; 
        }
    };



    const ReBindGrid = async () => {
 //     
        var data = await GetPaymentListReport(); 
        setreportList(data);
        setFinalData({ columns, data })

    }

    const AllDateSet = (event, type) => {
        if (type === "FromDate") {
         setSearchVlues({
          ...searchValues ,
           FromDate: event,
    });
       }
       else if(type === "ToDate")
       {
        setSearchVlues({
            ...searchValues ,
             ToDate: event,
            
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
                                <Form>
                                    <Row form>
                                    <Col md={4}>
                                    <FormGroup>
                                    <Label for="">From Date</Label>
                                    <DatePicker
                                    value={getDate(searchValues.FromDate, "/")}
                                    // value={getDate(Date.now(), "/")}
                                    dateFormat={dateFormat}
                                    onChange={(e) => AllDateSet(e, "FromDate")}
                                    className="form-control"
                                    name="FromDate"
                                    placeholderText={dateFormatPlaceholder}
                                    showYearDropdown
                                    />
                                    </FormGroup>
                                     </Col>
                                     <Col md={4}>
                                     <FormGroup>
                                                <Label for="">To Date</Label>
                                                <DatePicker
                                                value={getDate(searchValues.ToDate, "/")}
                                                // value={getDate(Date.now(), "/")}
                                                dateFormat={dateFormat}
                                                onChange={(e) => AllDateSet(e, "ToDate")}
                                                className="form-control"
                                                name="ToDate"
                                                placeholderText={dateFormatPlaceholder}
                                                showYearDropdown
                                    />
                                            </FormGroup>
                                     </Col>
                                        {/* <Col md={3}>
                                            <FormGroup>
                                                <Label for="">From Date</Label>
                                                <Input
                                                    type="date"
                                                    onChange={handleInputChange}
                                                    name="FromDate"
                                                    
                                                    autoComplete="off"
                                                    value={searchValues.FromDate}
                                                />
                                            </FormGroup>
                                        </Col> */}

                                        {/* <Col md={3}>
                                            <FormGroup>
                                                <Label for="">To Date</Label>
                                                <Input
                                                    type="date"
                                                    onChange={handleInputChange}
                                                    name="ToDate"

                                                    autoComplete="off"
                                                    value={searchValues.ToDate}
                                                />
                                            </FormGroup>
                                        </Col> */}


                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="">Applicant Case Code</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Applicant Case Code"
                                                    onChange={handleInputChange}
                                                    name="ApplicantCaseCode"
                                                    maxLength="50"
                                                    value={searchValues.ApplicantCaseCode}
                                                />
                                            </FormGroup>
                                        </Col>



                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="">Applicant Name</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Applicant Name"
                                                    onChange={handleInputChange}
                                                    name="ApplicantName"
                                                    isalphabetic="true"
                                                    maxLength="50"
                                                    value={searchValues.ApplicantName}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="">CNIC</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="CNIC"
                                                    onChange={handleInputChange}
                                                    isnumber="true"
                                                    placeholder="XXXXXXXXXXXXX"
                                                    name="CNIC"
                                                    maxLength="13"
                                                    value={searchValues.CNIC}
                                                />
                                            </FormGroup>
                                        </Col>
                                       

                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="">Fund Category</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="FundCategoryId"
                                                    type="select"
                                                    value={searchValues.FundCategoryId}
                                                    onChange={handleCategoryChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        categoryddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>


                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="">Fund Sub Category</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="FundSubCategoryId"
                                                    type="select"
                                                    value={searchValues.FundSubCategoryId}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        fundCategroyddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>




                                        <Col md={12} className="text-right">
                                            <Button color="primary" size="sm" className="mr-2" onClick={handleSearchClick}>Search</Button>
                                            <Button color="secondary" size="sm" onClick={handleCancelClick}>Cancel</Button>
                                        </Col>
                                    </Row>
                                </Form>
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
                                        Report Payment List
                                    </Col>
                                    {/*<Col lg={6} md={6} className="text-right">*/}
                                    {/*    <ReactHTMLTableToExcel*/}
                                    {/*        id="test-table-xls-button"*/}
                                    {/*        className="download-table-xls-button mb-3 btn btn-secondary btn-sm"*/}
                                    {/*        table="table-to-xls"*/}

                                    {/*        filename="Report_PaymentList"*/}
                                    {/*        sheet="PaymentList"*/}
                                    {/*        buttonText="Export" />*/}
                                    {/*</Col>*/}
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <DataTableExtensions
                                    {...finalData}
                                    exportHeaders={true}
                                    fileName="PaymentListReport"
                                >
                                    <DataTable
                                        dense
                                        direction="auto"
                                        defaultSortField="ApplicantName"
                                        fixedHeader
                                        striped
                                        defaultSortAsc={false}
                                        pagination
                                        highlightOnHover
                                        progressPending={pending}
                                        responsive


                                        fixedHeaderScrollHeight="auto"


                                        subHeaderAlign="right"
                                        subHeaderWrap

                                    />
                                </DataTableExtensions>
                                {/*<Table id="table-to-xls" bordered striped responsive>*/}
                                {/*    <thead>*/}
                                {/*        <tr>*/}
                                {/*            <th>Sr #</th>*/}
                                {/*            <th>Applicant Case code</th>*/}
                                {/*            <th>Applicant Name </th>*/}
                                {/*            <th>CNIC</th>*/}

                                {/*            <th>Support Type</th>*/}
                                {/*            <th>Fund Category</th>*/}
                                {/*            <th>Fund Sub Category Name</th>*/}
                                {/*            <th>Payment Schedule Date</th>*/}
                                {/*            <th>Amount</th>*/}
                                {/*            <th>Payment Frequency</th>*/}
                                          

                                {/*        </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody>*/}
                                {/*        {reportList && reportList.map((item, key) => (*/}
                                {/*            <tr key={key}>*/}
                                {/*                <td>{key + 1}</td>*/}
                                {/*                <td>{item.ApplicantCaseCode}</td>*/}
                                               
                                {/*                <td>{item.ApplicantName}</td>*/}
                                {/*                <td>{item.CnicNo}</td>*/}
                                {/*                <td>{item.SupportType}</td>*/}
                                {/*                <td>{item.Category}</td>*/}

                                {/*                <td>{item.FundCategoryName}</td>*/}
                                {/*                <td>{item.PaymentSchedule_Date}</td>*/}
                                {/*                <td style={{ textAlign : 'right' }}>{item.PayableAmount}</td>*/}
                                {/*                <td>{item.PaymentFrequency}</td>*/}
                                              

                                {/*            </tr>*/}
                                {/*        ))}*/}
                                {/*    </tbody>*/}
                                {/*</Table>*/}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

            </div>

        </>
    );
}

export default Report_Payment_List