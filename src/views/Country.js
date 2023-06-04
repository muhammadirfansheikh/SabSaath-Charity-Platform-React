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
import { fetchData } from '../utils/Api.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../utils/Constants.js'
import { GetSetupMaster,DeleteSetupDetail,AllowAlphabatic } from '../utils/CommonMethods.js'
import ModalCountry from '../components/modal/ModalCountry.js'
import Swal from "sweetalert2"






const Country = (props) => {

    const [countryList, setcountryList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [countryEditId, setcountryEditId] = useState(0);
    const [countryvalues, setcountryvalues] = useState("");

    const [countryDialVal, setcountryDialVal] = useState("");


    
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            ReBindGrid(SetupMasterIds.Country,0,"",0);
        };
        load();
    }, []);

    const onEdit = ({ CountryId }) => {
     
        openNewmodal(CountryId);
    }

    const onDelete =async ({ CountryId }) => {
       
        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
  
       var deleteData= await DeleteSetupDetail(CountryId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
            //alert(deleteData.data[0].Message);
            Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {

           Swal.fire({title:'Success',text:"Deleted Successfully",icon:'success'});
           
            
        }
    }
        ReBindGrid(SetupMasterIds.Country ,0,"",0);
        setcountryvalues("");
        setcountryDialVal("");
        
       
    }



    const handleSearchClick=async(e) =>{
        e.preventDefault();
       
        ReBindGrid(SetupMasterIds.Country,0,countryvalues,0,countryDialVal);
      
    }

    const handleCancelClick=async(e) => {
     
         e.preventDefault();
       
        ReBindGrid(SetupMasterIds.Country,0,"",0,countryDialVal);
        setcountryvalues("");
        setcountryDialVal("");
      
    }

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0 , Flex1) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId,Flex1);
      
        setcountryList(data.data);

    }
    const openNewmodal = (CountryId) => {
      
        setcountryEditId(CountryId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setcountryEditId(0);
        ReBindGrid(SetupMasterIds.Country,0,"",0);
       
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
                                                <Label for="">Country Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={(e) => setcountryvalues(AllowAlphabatic(e.target.value))}
                                                    name="countryname"
                                                    value={countryvalues}
                                                    autoComplete="off"
                                                    maxLength="50"
                                                />
                                            </FormGroup>

                                            
                                        </Col>
                                        <Col md={3}>
                                        <FormGroup>
                                                <Label for="">Country Dialing Code</Label>
                                                <Input
                                                    type="text"
                                                    onChange={(e) => setcountryDialVal(e.target.value)}
                                                    name="countryDialCode"
                                                    value={countryDialVal}
                                                    autoComplete="off"
                                                    maxLength="4"
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
                                        Country List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ CountryId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>Dialing Code</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {countryList && countryList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                <td>{item.Flex1}</td>
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ CountryId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ CountryId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {
                    openModal &&
                    <ModalCountry {...props}
                        HeaderText="Add/Edit Country"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        CountryId={countryEditId}
                        ReBindGrid={ReBindGrid}
                    />

                }
            </div>

        </>
    );
}

export default Country