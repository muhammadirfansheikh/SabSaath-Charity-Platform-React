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
import Modal_Bank from 'components/modal/ModalBank'
import Swal from "sweetalert2";




const Bank = (props) => {
    const initialValues = {
        searchBankName: "",
        searchIsMicroFinance : "",
       
      };

    const [values, setValues] = useState(initialValues);
    const [bankList, setbankList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [bankEditId, setbankEditId] = useState(0);
  

    const handleInputChange = (e) => {
        
    
        const { name, value } = e.target;
        let _values = e.target.value;


        if (e.target.getAttribute("isalphabetic") === "true") {
     //     
            _values = AllowAlphabatic(e.target.value);
        }






        setValues({
            ...values,
            [name]: _values,
        });
      };
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
           resetFormelement("");
        };
        load();
    }, []);

    const onEdit = ({ BankId }) => {
        openNewmodal(BankId);
    }

    const resetFormelement = async(bankType="") =>{
        
        ReBindGrid(SetupMasterIds.Bank,0,"",0,bankType);

        setValues(initialValues);
    }
    const onDelete =async ({ BankId }) => {
       
        var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
       var deleteData= await DeleteSetupDetail(BankId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
            //alert(deleteData.data[0].Message);
            Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {

           
           // alert("Deleted Successfully");
            Swal.fire({ title: 'success', text:"Deleted Successfully", icon:'success' });
            
        }
    }
    resetFormelement("");

    }

    const handleSearchClick=async(e) =>{
        e.preventDefault();
        
        ReBindGrid(SetupMasterIds.Bank,"0",values.searchBankName,0,values.searchIsMicroFinance);
      
    }

    const handleCancelClick=async(e) => {
       
         e.preventDefault();
        
        
        resetFormelement("");
        
     
    }
    
   
    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0,felx1="",flex2="",flex3="") =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId,felx1,flex2,flex3);
     
        setbankList(data.data);

    }
    const openNewmodal = (BankId) => {
        
        setbankEditId(BankId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setbankEditId(0);
        resetFormelement("");
        setValues(initialValues);
      
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
                            <Label for="">Bank Type</Label>
                           <Input
                          id="exampleSelect"
                          name="searchIsMicroFinance"
                          type="select"
                          value={values.searchIsMicroFinance}
                          onChange={handleInputChange}>
                                   <option key="" value="">
                            Select
                          </option>
                              <option key="0" value="0">
                            Non Micro Finance Bank
                          </option>
                          <option key="1" value="1">
                            Micro Finance Bank
                          </option>
                            </Input>
                        </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="">Bank Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={handleInputChange}
                                                    name="searchBankName"
                                                    maxLength="50"
                                                    autoComplete="off"
                                                    isalphabetic="true"
                                                    value={values.searchBankName}
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
                                        Bank List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ BankId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            <th>Bank Type</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th className="text-center" style={{ width: 150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bankList && bankList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                <td>{item.Flex1 == "0" ? "Non Micro Finance Bank" : "Micro Finance Bank"}</td>
                                                
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ BankId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ BankId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
          <Modal_Bank {...props}
            HeaderText="Add/Edit Bank"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            BankId={bankEditId}
            
            ReBindGrid={ReBindGrid}
          />

        }
            </div>

        </>
    );
}

export default Bank