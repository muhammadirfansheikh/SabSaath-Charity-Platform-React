import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail,AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const ModalProvince = (props) => {

const initialValues = {
   
};


const [values, setValues] = useState(initialValues);
  const [provicne, setprovicne] = useState("");
  const [countryId, setcountryId] = useState('0');
    const [formLoading, setFormLoading] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.ProvinceId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.ProvinceId);
                if ( data.response===true && data.data != null) {
             //      
                    setprovicne(data.data[0].SetupDetailName);
                    setcountryId(data.data[0].ParentId);
                  }
                  else {
                    //  setUserList([]);
                  }
            }
        };

        load();


    }, []);

    async function AddUpdateProvince(e) {
        try {
            e.preventDefault();
        //    

            setFormLoading(true)
        if(countryId != "0")
        {
            if(provicne != "")
            {
                var ProvinceId = 0;
                ProvinceId = props.ProvinceId > 0 ? props.ProvinceId : 0;
                var UserId = localStorage.getItem('UserId');
                var UserIp = localStorage.getItem('UserIP');
                let RequestData;
                let data;
    
                 
    
                if (ProvinceId === 0) ///Insert Operation
                {
                    data=await InsertSetupDetail(SetupMasterIds.Province,countryId, provicne, "", "", "", UserId, UserIp);
                }
                else if (ProvinceId !== 0) {
                   data=await UpdateSetupDetail(SetupMasterIds.Province, countryId, ProvinceId, provicne, "", "", "", UserId, UserIp);
                }
    
            //    
            
                if (data.response === true && data.data != null) {
                    if (data.data[0].HasError === 1) {
                       // alert(data.data[0].Message);
                       Swal.fire({ title: 'Error', text: data.data[0].Message, icon:'error' });
                    }
                    else {
    
                        e.preventDefault();
                        
                        props.ReBindGrid(SetupMasterIds.Province, 0, "", 0);
                      //  ProvinceId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                      ProvinceId === 0 ? Swal.fire({ title: 'Success', text:"Added Successfully", icon:'success' }) : Swal.fire({ title: 'Success', text:"Updated Successfully", icon:'success' });
                       // toggle();
                        setprovicne("");
                        setcountryId("0");
                    }
                }
                else {
                   // alert("Error");
                   Swal.fire({ title: 'Error', text: "Some Thing Went Wrong", icon:'error' });
    
                }
            }
            else{
                Swal.fire({ title: 'Error', text: "Enter Province Name.", icon:'error' });
            }
        }
        else{
            Swal.fire({ title: 'Error', text: "Select Country", icon:'error' });
        }
            setFormLoading(false)
        } catch (error) {
   
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateProvince }>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
                
                    <Row form>
                      

                        <Col className="px-1" md={6}>
                        <FormGroup>
                            <Label for="">Country</Label>
                           <Input
                          id="exampleSelect"
                          name="countryId"
                          type="select"
                          value={countryId}
                          onChange={(e)=>setcountryId(e.target.value)}
                        >
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            props.Countryddl.map((item, key) => (
                                <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col className="px-1" md="6">
                            <FormGroup>
                                <Label>Province Name</Label>
                                <Input
                                    placeholder="Province Name"
                                    type="text"
                                    name="provicne"
                                    required={true }
                                    autoComplete="off"
                                    maxLength="50"
                                    onChange={(e) => setprovicne(AllowAlphabatic(e.target.value))}
                                    value={provicne}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                
            </ModalBody>
            <ModalFooter>
                    <FormGroupButton
                        title='Save'
                        type='submit'
                        loading={formLoading}
                    />
                <Button color="secondary" size="sm" onClick={toggle}>Close</Button>
                </ModalFooter>
            </form>
        </Modal>

    );
}

export default ModalProvince;