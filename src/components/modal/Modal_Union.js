import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap"
import { fetchData } from '../../utils/Api.js'
import { GetSetupMaster, InsertSetupDetail, UpdateSetupDetail, AllowAlphabatic } from '../../utils/CommonMethods.js'
import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import FormGroupButton from '../GeneralComponent/FormGroupButton.jsx'
export const Modal_Union = (props) => {

const initialValues = {
    UnionName: "",
    CountryValue: '0',
    ProvinceValue: '0',
    CityValue: '0',
    DistrictValue: '0',
  };


const [values, setValues] = useState(initialValues);
const [Modalcountryddl, setModalcountryddl] =  useState([]);
const [Modalprovinceddl, setModalprovinceddl] =  useState([]);
const [Modalcityddl, setModalcityddl] =  useState([]);
    const [Modaldistrictddl, setModaldistrictddl] = useState([]);
    const [formLoading, setFormLoading] = useState(false);

  const handleInputChange = (e) => { 
      const { name, value } = e.target;
      let _values = e.target.value;


      if (e.target.getAttribute("isalphabetic") === "true") { 
          _values = AllowAlphabatic(e.target.value);
      } 
      setValues({
          ...values,
          [name]: _values,
      });
  };
    function toggle() {
        props.closeNewmodal();
    }
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            if (props.UnionId > 0) {
               
                var data=await GetSetupMaster(0, 0,"",props.UnionId);
                if ( data.response===true && data.data != null) {
                
                    let district = await GetSetupMaster(0, 0,"",data.data[0].ParentId);
                    let cityId = district.data[0].ParentId;

                    let city = await GetSetupMaster(0, 0,"",cityId);
                    let provinceId = city.data[0].ParentId;

                  

                     let province = await GetSetupMaster(0, 0,"",provinceId);
                     let countryId = province.data[0].ParentId;




                     resetModalFormelement(countryId,provinceId,cityId);

                setValues((prevState) => ({
                        ...prevState,
                        UnionName: data.data[0].SetupDetailName,
                        CountryValue: countryId,
                        ProvinceValue: provinceId,
                        CityValue:cityId,
                        DistrictValue : data.data[0].ParentId


                    }))

                  
                  }
                  else {
                    
                  }
            }
            else{

                resetModalFormelement(-1,-1,-1);
            }
           
        };
        
        load();


    }, []);
    const resetModalFormelement = async(loadCountryId = -1,loadProvinceId = -1,loadCityId=-1) =>{


        props.ReBindGrid(SetupMasterIds.Union,0,"",0);

       let ddlCountryData =  await props.GetCountry();
       let ddlProvinceData =await props.GetProvince(loadCountryId);
       let ddlCityData =await props.GetCity(loadProvinceId);
       let ddlDistrictData =await props.GetDistrict(loadCityId);

        setModalcountryddl(ddlCountryData.data);
        setModalprovinceddl(ddlProvinceData.data);
        setModalcityddl(ddlCityData.data);
        setModaldistrictddl(ddlDistrictData.data);
    }

    const handleModalCountryChangeEvent =async (e)=>{

        handleInputChange(e);
        let data = await props.GetProvince(e.target.value);
        setModalprovinceddl(data.data);

    }


    const handleModalProvinceChangeEvent =async (e)=>{

        handleInputChange(e);
        let data = await props.GetCity(e.target.value);
        setModalcityddl(data.data);

    }


    const handleModalCityChangeEvent =async (e)=>{

        handleInputChange(e);
        let data = await props.GetDistrict(e.target.value);
        setModaldistrictddl(data.data);

    }



    async function AddUpdateUnion(e) {
        try {



            e.preventDefault();
            setFormLoading(true);

if(values.DistrictValue !== "0"){

    if(values.UnionName != "")
    {

        var UnionId = 0;
        UnionId = props.UnionId > 0 ? props.UnionId : 0;
        var UserId = localStorage.getItem('UserId');
        var UserIp = localStorage.getItem('UserIP');
        let RequestData;
        let data;
    
         
    
        if (UnionId === 0) ///Insert Operation
        {
            data=await InsertSetupDetail(SetupMasterIds.Union,values.DistrictValue, values.UnionName, "", "", "", UserId, UserIp);
        }
        else if (UnionId !== 0) {
           data=await UpdateSetupDetail(SetupMasterIds.Union, values.DistrictValue, UnionId, values.UnionName, "", "", "", UserId, UserIp);
        } 
        if (data.response === true && data.data != null) {
            if (data.data[0].HasError === 1) {
              // alert(data.data[0].Message);
                Swal.fire({ title: 'Error', text:data.data[0].Message, icon:'error' });
            }
            else {
    
                e.preventDefault();
                
                props.ReBindGrid(SetupMasterIds.Union, 0, "", 0);
                //UnionId === 0 ? alert("Added Successfully") : alert("Updated Successfully");;
                UnionId === 0 ? Swal.fire({ title: 'Success', text: "Added Successfully", icon: 'success' }) : Swal.fire({ title: 'Success', text: "Updated Successfully", icon: 'success' });

                setValues(initialValues);
                //toggle();
            }
        }
        else {
            //alert("Error");
            Swal.fire({ title: 'Error', text:"Some Thing Went Wrong", icon:'error' });

        }

    }
    else
    {
        //alert("Enter Union Name");
        Swal.fire({ title: 'Error', text:"Please Enter Union Name", icon:'warning' });


    }

  

}
else{
    //alert("Select District");
    Swal.fire({ title: 'Error', text:"Select District", icon:'warning' });

}

        
            setFormLoading(false);


        } catch (error) { 
        }
    }
    return (

        <Modal isOpen={props.Ismodalshow} toggle={toggle} backdrop="off">
            <form onSubmit={AddUpdateUnion }>
            <ModalHeader
                toggle={toggle}>{props.HeaderText}</ModalHeader>
            <ModalBody>
              
                    <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="">Country</Label>
                           <Input
                          id="exampleSelect"
                          name="CountryValue"
                          type="select"
                          value={values.CountryValue}
                          onChange={handleModalCountryChangeEvent}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            Modalcountryddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>



                    <Col md={6}>
                        <FormGroup>
                            <Label for="">Province</Label>
                           <Input
                          id="exampleSelect"
                          name="ProvinceValue"
                          type="select"
                          value={values.ProvinceValue}
                          onChange={handleModalProvinceChangeEvent}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            Modalprovinceddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md={6}>
                        <FormGroup>
                            <Label for="">City</Label>
                           <Input
                          id="exampleSelect"
                          name="CityValue"
                          type="select"
                          value={values.CityValue}
                          onChange={handleModalCityChangeEvent}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            Modalcityddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>


                    
                    <Col md={6}>
                        <FormGroup>
                            <Label for="">District</Label>
                           <Input
                          id="exampleSelect"
                          name="DistrictValue"
                          type="select"
                          value={values.DistrictValue}
                          onChange={handleInputChange}>
                              <option key={0} value={0}>
                            Select
                          </option>
                          
                          {
                            Modaldistrictddl.map((item, key) => (
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
                                <Label>Union Name</Label>
                                <Input
                                    placeholder="Union Name"
                                    type="text"
                                    name="UnionName"
                                    maxLength="50"
                                    isalphabetic="true"
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    value={values.UnionName}
                                    required="Union Name Required"
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

export default Modal_Union;