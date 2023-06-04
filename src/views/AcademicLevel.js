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
import { GetSetupMaster, DeleteSetupDetail, AllowAlphabatic } from '../utils/CommonMethods.js'
import ModalAcademicLevel from '../components/modal/ModalAcademicLevel.js'
import Swal from "sweetalert2";

//xyz

const AcademicLevel = (props) => {

    const [academicLevelList, setAcademicLevelList] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [academicLevelEditId, setacademicLevelEditId] = useState(0);
    const [academicLevelvalues, setacademicLevelvalues] = useState("");

    
   
    React.useEffect(() => {

        // need to define the function and call it separately
        const load = async () => {
            ReBindGrid(SetupMasterIds.AcademicLevel,0,"",0);
        };
        load();
    }, []);

    const onEdit = ({ AcademicLevelId }) => {
        openNewmodal(AcademicLevelId);
    }

    const onDelete =  ({ AcademicLevelId }) => {
     
      //  console.log(AcademicLevelId);

      Swal.fire({
        customClass: {
          container: "my-swal",
        },
        text: "Are you sure to delete the record?",
        icon: "success",
        showCancelButton: true,
        cancelButtonText: `Cancel`,
        cancelButtonColor: "#2f4050",
        confirmButtonText: `Confirm`,
        confirmButtonColor: "#bf1e2e",
      }).then((result) => {
        if (result.isConfirmed)
        {
            var UserId = localStorage.getItem('UserId');
            var UserIp = localStorage.getItem('UserIP');
       var deleteData=  DeleteSetupDetail(AcademicLevelId,UserId,UserIp);
       if (deleteData.response === true && deleteData.data != null) {
        if (deleteData.data[0].HasError === 1) {
            //alert(deleteData.data[0].Message);
            Swal.fire({ title: 'Error', text: deleteData.data[0].Message, icon:'error' });
        }
        else {

            Swal.fire({ title: 'success', text: "Deleted Successfully", icon:'success' });
            //alert("Deleted Successfully");
         }
        }
        ReBindGrid(SetupMasterIds.AcademicLevel,0,"",0);
        setacademicLevelvalues("");
         
        }
      })

        
       
    }

    const handleSearchClick=async(e) =>{
        e.preventDefault();
    
        ReBindGrid(SetupMasterIds.AcademicLevel,0,academicLevelvalues,0);
      
    }

    const handleCancelClick=async(e) => {
       
         e.preventDefault();
    
        
        ReBindGrid(SetupMasterIds.AcademicLevel,0,"",0);
        setacademicLevelvalues("");
        
      
     //   GetSetupMaster("", 0,"");
    }

    const ReBindGrid =async (setupMasterId,parentId,setupDetailName,setupDetailId = 0) =>{

        var data=await GetSetupMaster(setupMasterId,parentId,setupDetailName,setupDetailId);
   //    
        setAcademicLevelList(data.data);

    }
    const openNewmodal = (AcademicLevelId) => {
        
        setacademicLevelEditId(AcademicLevelId);
        setOpenModal(true);
    }
    const closeNewmodal = () => {
        setOpenModal(false);
        setacademicLevelEditId(0);
        ReBindGrid(SetupMasterIds.AcademicLevel,0,"",0);
        //GetUsers(0,"",0);
       // GetSetupMaster(0, 0,"");
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
                                                <Label for="">Academic Level Name</Label>
                                                <Input
                                                    type="text"
                                                    onChange={(e) => setacademicLevelvalues(AllowAlphabatic(e.target.value))}
                                                    name="academiclevelname"
                                                    value={academicLevelvalues}
                                                    autoComplete="off"
                                                    maxLength="50"
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
                                        Academic Level List
                                    </Col>
                                    <Col lg={6} md={6} className="text-right">
                                        <Button color="primary2" size="sm" className="m-0" onClick={() => openNewmodal({ AcademicLevelId: 0 })}>Add New</Button>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Table bordered striped>
                                    <thead>
                                        <tr>
                                            <th>Sr #</th>
                                            <th>Name</th>
                                            {/* <th>Active</th>
                                            <th>CreatedBy</th>
                                            <th>Last Modified By</th> */}
                                            <th className="text-center" style={{ width:150 }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {academicLevelList && academicLevelList.map((item, key) => (
                                            <tr key={key}>
                                                <td>{key + 1}</td>
                                                <td>{item.SetupDetailName}</td>
                                                
                                                {/* <td>{item.IsActive ? "Yes" : "No"}</td>
                                                <td>{item.CreatedBy + ' on ' + item.CreatedDate}</td>
                                                <td>{item.ModifiedBy + " " + (item.ModifiedDate == '' ? "" : "on" + item.ModifiedDate)}</td> */}
                                                <td className="text-center">
                                                    <Button color="primary" className="btn-circle" size="sm" onClick={(e) => onEdit({ AcademicLevelId: item.SetupDetailId })}><i className="nc-icon nc-ruler-pencil"></i></Button>
                                                    <Button color="danger" className="btn-circle" size="sm" onClick={() => onDelete({ AcademicLevelId: item.SetupDetailId })}><i className="nc-icon nc-simple-remove"></i></Button>
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
                    <ModalAcademicLevel {...props}
                        HeaderText="Add/Edit Academic Level"
                        Ismodalshow={openModal}
                        closeNewmodal={closeNewmodal}
                        AcademicLevelId={academicLevelEditId}
                        ReBindGrid={ReBindGrid}
                    />

                }
            </div>

        </>
    );
}

export default AcademicLevel