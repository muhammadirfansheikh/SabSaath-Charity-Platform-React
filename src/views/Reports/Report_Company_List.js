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
import { GetSetupMaster, AllowAlphabatic } from 'utils/CommonMethods'
import DataTable from 'react-data-table-component'
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import Swal from "sweetalert2";


const Report_Company_List = (props) => {
    const searchingValues = {
        CompanyName: "",
        CompanyPhoneNo: ""
        
    };

    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportList, setreportList] = useState([]);
    const [finalData, setFinalData] = useState({});

    const columns = [
        {
            name: 'Company',
            selector: 'Company',
            sortable: true
        },
        {
            name: 'PhoneNo',
            selector: 'PhoneNo',
            sortable: true
        },
        {
            name: 'CompanyFamily',
            selector: 'CompanyFamily',
            sortable: true
        },
        
    ];

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

        ReBindGrid();


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
    const GetCompanyListReport = async () => {
        try {
      
            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_Company_List,
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
   
        var data = await GetCompanyListReport(); 
        setreportList(data);
        setFinalData({ columns, data });
    }


    return (
        <>
            <div className="content">
                <Row>
                    <Col lg={12} md={12}>
                        <Card className="card-user">
                            <CardBody>
                                <Form>
                                    <Row form>
                                 
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Company Name</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Company Name"
                                                    onChange={handleInputChange}
                                                    isalphabetic="true"
                                                    name="CompanyName"
                                                    maxLength="50"
                                                    value={searchValues.CompanyName}
                                                />
                                            </FormGroup>
                                        </Col>



                                        
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Company Phone</Label>
                                                <Input
                                                    type="text"
                                                    placeholder="Company Phone"
                                                    onChange={handleInputChange}
                                                    isnumber="true"
                                                    placeholder="XXXXXXXXXXX"
                                                    name="CompanyPhoneNo"
                                                    maxLength="13"
                                                    value={searchValues.CompanyPhoneNo}
                                                />
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
                                        Company List
                                    </Col>
                                    {/*<Col lg={6} md={6} className="text-right">*/}
                                    {/*    <ReactHTMLTableToExcel*/}
                                    {/*        id="test-table-xls-button"*/}
                                    {/*        className="download-table-xls-button mb-3 btn btn-secondary btn-sm"*/}
                                    {/*        table="table-to-xls"*/}

                                    {/*        filename="Report_CompanyList"*/}
                                    {/*        sheet="CompanyList"*/}
                                    {/*        buttonText="Export" />*/}
                                    {/*</Col>*/}
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <DataTableExtensions
                                    {...finalData}
                                    exportHeaders={true}
                                    fileName="CompnayReportList"
                                >
                                    <DataTable
                                        dense
                                        direction="auto"
                                        defaultSortField="Company"
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
                                {/*            <th>Company Name</th>*/}
                                {/*            <th>Company Phone</th>*/}
                                            
                                {/*            <th>Company Family</th>*/}
                                           
                                {/*        </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody>*/}
                                {/*        {reportList && reportList.map((item, key) => (*/}
                                {/*            <tr key={key}>*/}
                                {/*                <td>{key + 1}</td>*/}
                                {/*                <td>{item.Company}</td>*/}

                                {/*                <td>{item.PhoneNo}</td>*/}
                                {/*                <td>{item.CompanyFamily}</td>*/}
                                              
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

export default Report_Company_List