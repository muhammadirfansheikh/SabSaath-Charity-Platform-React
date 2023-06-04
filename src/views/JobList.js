import React, { useState , useEffect } from "react";
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
import FormGroupTable from "components/GeneralComponent/FormGroupTable.jsx";
import Swal from "sweetalert2";
import { fetchData } from "utils/Api";
import FormGroupSelect from "components/GeneralComponent/FormGroupSelect.jsx";
import  {GetSetupMaster}  from 'utils/CommonMethods.js'
import { SetupMasterIds } from "utils/Constants.js";

const JobList = (props) => {
  const columns = [
    { field: "Name", name: "Name" },
    { field: "Qualification", name: "Qualification" },
    { field: "CanRead/Write", name: " Read / Write" },
    { field: "LastExperience", name: "Last Experience" },
    { field: "ContactNumber", name: "Contact Numbe" },
    { field: "PermanentAddress", name: "Address" },
    { field: "Remarks", name: "Remarks" },
  ];

  React.useEffect(() => {
    // need to define the function and call it separately
    const load = async () => {
       resetFormelement();
    };
    load();
}, []);

const resetFormelement = async() =>{
    let ddlQualification =  await GetQualification();
    setQualificationddl(ddlQualification.data);
}
const GetQualification = async(e) =>
   {
      var data=await GetSetupMaster(SetupMasterIds.Qualification,0,"",0);
      return data;
   }
  const initialSelectList = {
    InvestigatorList: [],
    
  };

  const initialValues = {
    Name : "",
    Qualification : 0,
    LastExperience : "",
    ContactNumber : "",
    
  };

  const [Qualificationddl, setQualificationddl] =  useState([]);
   const [CountryIdON, setCountryIdON] = useState(0);

  const [followUpList, setFollowUpList] = useState([]);
  const [selectionLists, setSelectionLists] = useState(initialSelectList);
  const [formFields, setFormFields] = useState(    initialValues    
  );
  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => 
  {
    const fetchDataLsit = () => {
      fetchData("Applicant", "JobList", {
        ...formFields
      }).then((result) => {
        if (result?.DataSet?.Table[0]?.HasError > 0) {
    
          
          Swal.fire({
            title: "Error",
            text: result.DataSet.Table[0].Message,
            icon: "error",
          });
          return;
        }
        setFollowUpList(result?.DataSet?.Table);
        setSelectionLists({
          ...selectionLists,
          InvestigatorList: result?.DataSet?.Table1,
        });
      });
    };
     fetchDataLsit();
  }, []);

  const searchInfo = async (e) => 
  {
    fetchData("Applicant", "JobList", {
       ...formFields
     }).then((result) => {
       if (result?.DataSet?.Table[0]?.HasError > 0) {
       
         
         Swal.fire({
           title: "Error",
           text: result.DataSet.Table[0].Message,
           icon: "error",
         });
         return;
       }
       setFollowUpList(result?.DataSet?.Table);
       setSelectionLists({
         ...selectionLists,
         InvestigatorList: result?.DataSet?.Table1,
       });
     });
   
  };
 

   
  const handleSearchCountryChangeEvent =async (e)=>{
    handleInputChange(e);
    setCountryIdON(e.target.value);
 
  }
  const cancelClickHandle = () => {
    setFormFields({
      ...initialValues
    });
    searchInfo();
  }
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
                        <Label for="">Name</Label>
                        <Input
                          placeholder="Name"
                          type="text"
                          name="Name"
                          value={formFields.Name}
                          onChange={handleInputChange}
                         />
                      </FormGroup>
                    </Col> 
                    {/* <Col md={3}>
                      <FormGroup>
                        <Label for="">Qualification</Label>
                        <Input
                          placeholder="Qualification"
                          type="text"
                          name="Qualification"
                          value={formFields.Qualification}
                          onChange={handleInputChange}
                         />
                      </FormGroup>
                    </Col>  */}
                     <Col md={3}>
                        <FormGroup>
                          <Label for="">Qualification</Label>
                           <Input
                          id="Qualification"
                          name="Qualification"
                          type="select"
                           value={formFields.Qualification}
                          onChange={handleSearchCountryChangeEvent}
                          >
                              <option key={0} value={0}>
                            Select
                          </option>
                          {
                            Qualificationddl.map((item, key) => (
                              <option key={item.SetupDetailName} value={item.SetupDetailId}>
                                {item.SetupDetailName}
                              </option>
                            ))
                          }  
                            </Input>
                        </FormGroup>
                    </Col>

                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Last Experience</Label>
                        <Input
                          placeholder="Last Experience"
                          type="text"
                          name="LastExperience"
                          value={formFields.LastExperience}
                          onChange={handleInputChange}
                         />
                      </FormGroup>
                    </Col> 


                    <Col md={3}>
                      <FormGroup>
                        <Label for="">Contact Number</Label>
                        <Input
                          placeholder="Contact Number"
                          type="text"
                          name="ContactNumber"
                          value={formFields.ContactNumber}
                          onChange={handleInputChange}
                         />
                      </FormGroup>
                    </Col> 

                    {/* <Col md={3}>
                      <FormGroup>
                        <Label for="">Address</Label>
                        <Input
                          placeholder="Address"
                          type="text"
                          name="Address"
                          value={formFields.FollowUpDate}
                          onChange={handleInputChange}
                         />
                      </FormGroup>
                    </Col>  */}

                    {/* <Col md={3}>
                      <FormGroup>
                        <Label for="">Remarks</Label>
                        <Input
                          placeholder="Remarks"
                          type="text"
                          name="Remarks,"
                         />
                      </FormGroup>
                    </Col>  */}
                    
                    {/* <Col md={2}>
                      <FormGroup>
                        <Label>Roles</Label>
                        <Input
                          id="exampleSelect"
                          name="searchRoleValue"
                          type="select"
                         
                        >
                          <option key={0} value={0}>
                            Select
                          </option>
                          
                          
                        </Input>
                      </FormGroup>
                    </Col> */}
                    <Col md={12} className="text-right">
                      <Button color="primary" className="mr-2" onClick={searchInfo}>Search</Button>
                      <Button color="secondary" onClick={cancelClickHandle}>Cancel</Button>
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
                    Job List
                  </Col>
                  {/* <Col lg={6} md={6} className="text-right">
                    <Button color="primary2" className="m-0" style={{ float: "right" }} type="submit" onClick={() => openNewmodal(true)}>Add New</Button>
                  </Col> */}
                </Row>
              </CardHeader>
              <CardBody>
              <FormGroupTable columns={columns} rows={followUpList} hideAction={true} />
                {/* <Table bordered striped>
                  <thead>
                    <tr>
                      <th>Sr #</th>
                      <th>Name</th>
                      <th>Qualification</th>
                      <th>Can / Read / Write</th>
                      <th>Last Experience</th>
                      <th>Contact Number</th>
                      <th>Address</th>
                      <th>Remarks</th>
             
                    </tr>
                  </thead>
                  <tbody>
             
                  </tbody>
                </Table> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/* {
          openModal &&
          <ModalJobList {...props}
            HeaderText="Add/Edit Job List"
            Ismodalshow={openModal}
            closeNewmodal={closeNewmodal}
            
          />

        } */}
      </div>

    </>
  );
}

export default JobList