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


const Report_Job_List = (props) => {
    const searchingValues = {
        Name: "",
        Qualification: -1,
        Contact_No: "",
        Address: "",
        Employed: -1,
        CanRead: -1,
        CanWrite: -1,
        MartialStatus: -1

    };

    const [searchValues, setSearchVlues] = useState(searchingValues);
    const [reportJobList, setreportJobList] = useState([]);
  

    const [qualificationddl, setqualificationddl] = useState([]);
    const [employedddl, setemployedddl] = useState([]);
    const [canReadddl, setcanReadddl] = useState([]);
    const [canWriteddl, setcanWriteddl] = useState([]);
    const [finalData, setFinalData] = useState({});

    const [martialstatusddl, setmartialstatusddl] = useState([]);
    const columns = [
      
        {
            name: 'Name',
            selector: 'Name',
            sortable: true
        },
        {
            name: 'Qualification',
            selector: 'Qualification',
            sortable: true
        },
        {
            name: 'CanRead_Write',
            selector: 'CanRead_Write',
            sortable: true
        },
        
        {
            name: 'IsEmployed',
            selector: 'IsEmployed',
            sortable: true
        },
        

        {
            name: 'LastExperience',
            selector: 'LastExperience',
            sortable: true
        },

        {
            name: 'ContactNumber',
            selector: 'ContactNumber',
            sortable: true
        },

        {
            name: 'PermanentAddress',
            selector: 'PermanentAddress',
            sortable: true
        },
        {
            name: 'Remarks',
            selector: 'Remarks',
            sortable: true
        },

        {
            name: 'MartialStatus',
            selector: 'MartialStatus',
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
            setRows(reportJobList);
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

        setemployedddl([ { Name: "Yes", Value: 1 }, { Name: "No", Value: 0 }]);
        setcanReadddl([ { Name: "Yes", Value: 1 }, { Name: "No", Value: 0 }]);
        setcanWriteddl([ { Name: "Yes", Value: 1 }, { Name: "No", Value: 0 }]);

        let ddlQualification = await GetQualification();

        let ddlMartialStatus = await GetMartialStatus();




        setqualificationddl(ddlQualification.data);
        setmartialstatusddl(ddlMartialStatus.data);

        ReBindGrid();


    }


  


    const GetQualification= async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.Qualification, 0, "", 0);

        return data;
    }

    const GetMartialStatus= async (e) => {

        var data = await GetSetupMaster(SetupMasterIds.MaritalStatus, 0, "", 0);

        return data;
    }


    const handleSearchClick = async (e) => {
        e.preventDefault();

        ReBindGrid();


    }

    const handleCancelClick = async (e) => {

        e.preventDefault();


        resetFormelement();


    }
     const GetJobListReport = async () => {
         try {
     
             searchValues.Employed = searchValues.Employed == -1 ? null : searchValues.Employed;
             searchValues.CanRead = searchValues.CanRead == -1 ? null : searchValues.CanRead;
             searchValues.CanWrite = searchValues.CanWrite == -1 ? null : searchValues.CanWrite;
             searchValues.Qualification = searchValues.Qualification == -1 ? null : searchValues.Qualification;
             searchValues.MartialStatus = searchValues.MartialStatus == -1 ? null : searchValues.MartialStatus;

            const data = await fetchData(
                ControllerName.Reporting,
                ApiMethods.Report_Job_List,
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
    
        var data = await GetJobListReport(); 
        setreportJobList(data);
        setFinalData({ columns, data })

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
                                                <Label for="">Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="Name"
                                                    isalphabetic="true"
                                                    autoComplete="off"
                                                    value={searchValues.Name}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Qualification</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="Qualification"
                                                    type="select"
                                                    value={searchValues.Qualification}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        qualificationddl.map((item, key) => (
                                                            <option key={key} value={item.SetupDetailId}>
                                                                {item.SetupDetailName}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Contact Number</Label>
                                                <Input
                                                    type="text"
                                                    isnumber="true"
                                                    placeholder="XXXXXXXXXXX"
                                                    onChange={handleInputChange}
                                                    name="Contact_No"
                                                    maxLength="11"
                                                    value={searchValues.Contact_No}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Is Employed</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="Employed"
                                                    type="select"
                                                    value={searchValues.Employed}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        employedddl.map((item, key) => (
                                                            <option key={key} value={item.Value}>
                                                                {item.Name}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Can Read</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="CanRead"
                                                    type="select"
                                                    value={searchValues.CanRead}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        canReadddl.map((item, key) => (
                                                            <option key={key} value={item.Value}>
                                                                {item.Name}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Can Write</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="CanWrite"
                                                    type="select"
                                                    value={searchValues.CanWrite}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        canWriteddl.map((item, key) => (
                                                            <option key={key} value={item.Value}>
                                                                {item.Name}
                                                            </option>
                                                        ))
                                                    }
                                                </Input>
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="">Address</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="Address"
                                                    
                                                    autoComplete="off"
                                                    value={searchValues.Address}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Martial Status</Label>
                                                <Input
                                                    id="exampleSelect"
                                                    name="MartialStatus"
                                                    type="select"
                                                    value={searchValues.MartialStatus}
                                                    onChange={handleInputChange}>
                                                    <option key={-1} value={-1}>
                                                        Select
                                                    </option>

                                                    {
                                                        martialstatusddl.map((item, key) => (
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
                                        Report Job List
                                    </Col>
                                    {/*<Col lg={6} md={6} className="text-right">*/}
                                    {/*    <ReactHTMLTableToExcel*/}
                                    {/*        id="test-table-xls-button"*/}
                                    {/*        className="download-table-xls-button mb-3 btn btn-secondary btn-sm"*/}
                                    {/*        table="table-to-xls"*/}
                                            
                                    {/*        filename="Report_JobList"*/}
                                    {/*        sheet="JobList"*/}
                                    {/*        buttonText="Export" />*/}
                                    {/*</Col>*/}
                                </Row>
                            </CardHeader>
                            <CardBody>

                                <DataTableExtensions
                                    {...finalData}
                                    exportHeaders={true}
                                    fileName="JobListReport"
                                >
                                    <DataTable
                                        dense
                                        direction="auto"
                                        defaultSortField="Name"
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

                                {/*<DataTable*/}
                                {/*    columns={columns}*/}
                                {/*    data={reportJobList}*/}
                                {/*    pagination*/}
                                {/*    progressPending={pending}*/}
                                {/*    title="Job List"*/}
                                {/*/>*/}
                                {/*<Table id="table-to-xls" bordered striped responsive>*/}
                                {/*    <thead>*/}
                                {/*        <tr>*/}
                                {/*            <th>Sr #</th>*/}
                                {/*            <th>Name</th>*/}
                                {/*            <th>Qualification</th>*/}
                                {/*            <th>Can Read / Can Write</th>*/}
                                           
                                {/*            <th>Employed</th>*/}
                                {/*            <th>Last Experience</th>*/}
                                {/*            <th>Contact No</th>*/}
                                {/*            <th>Address</th>*/}

                                {/*            <th>Remarks</th>*/}
                                           
                                {/*        </tr>*/}
                                {/*    </thead>*/}
                                {/*    <tbody>*/}
                                {/*        {reportJobList && reportJobList.map((item, key) => (*/}
                                {/*            <tr key={key}>*/}
                                {/*                <td>{key + 1}</td>*/}
                                {/*                <td>{item.Name}</td>*/}
                                {/*                <td>{item.Qualification}</td>*/}
                                {/*                <td>{item.CanRead_Write}</td>*/}
                                {/*                <td>{item.IsEmployed}</td>*/}
                                {/*                <td>{item.LastExperience}</td>*/}

                                {/*                <td>{item.ContactNumber}</td>*/}
                                {/*                <td>{item.PermanentAddress}</td>*/}
                                {/*                <td>{item.Remarks}</td>*/}
                                                
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

export default Report_Job_List