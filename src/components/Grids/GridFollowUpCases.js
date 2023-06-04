import React, { useState } from 'react'
import { Row, Col, Form, Label, Input, FormGroup, Button, Modal, ModalFooter, ModalHeader, ModalBody, Table } from "reactstrap"
import { fetchData } from '../../utils/Api.js'

import { ApiMethods, ControllerName, OperationTypeId, SetupMasterIds } from '../../utils/Constants.js'
import Swal from "sweetalert2";
import ModalAssignInvestigator from '../modal/ModalAssignInvestigator.js';

export const GridFollowUpCases = (props) => { 

    const [gridapplicantList, setgridapplicantList] = useState([]);
    const [assignApplicantCaseId, setassignApplicantCaseId] = useState([]);
    const [assignedInvestigatorId, setassignedInvestigatorId] = useState([]);
    const [openAssignModalPopUpModal, setopenAssignModalPopUpModal] = useState(false);


    const closeAssignInvestigatorModalNewmodal = () => {
        setopenAssignModalPopUpModal(false);



    }
  
    const onAssign = (obj) => {
        openNewmodal(obj);
    }

    const openNewmodal = (obj) => { 
        setassignApplicantCaseId(obj.Id);
        setassignedInvestigatorId(obj.InvestigatorId);
        setopenAssignModalPopUpModal(true);
    }
    React.useEffect(() => { 
        // need to define the function and call it separately
        const load = async () => {
            if (props.ApplicantList.length > 0) {

                setgridapplicantList(props.ApplicantList);
            }
        };

        load();


    }, []);

    const OnBlock = async(applicantId)=>{}
  
    return (

        <div>
            <Table bordered striped>
                <thead>
                    <tr>
                        <th>Sr #</th>
                        <th>Applicant Code</th>
                        <th>Applicant Name Follow</th>
                        <th>City</th>
                        <th>Assignee</th>
                        <th className="text-center" style={{ width: 150 }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {gridapplicantList && gridapplicantList.map((item, key) => (
                     <tr key={key}>
                     <td>{key + 1}</td>
                     <td>{item.ApplicantCaseCode}</td>
                     <td>{item.FullName}</td>
                     <td>{item.cityname}</td>
                     <td>{item.investigatorname}</td>

                            <td className="text-center">
                                <Button color="danger" className="btn-circle" size="sm" onClick={() => OnBlock(item.ApplicantId)}><i class="nc-icon nc-button-power"></i></Button>
                                <Button color="warning" className="btn-circle" size="sm" onClick={(e) => onAssign({ Id: item.ApplicantCaseId, InvestigatorId: item.InvestigatorId == null ? 0 : item.InvestigatorId })}><i class="nc-icon nc-single-02"></i></Button>
                                <Button color="primary" className="btn-circle" size="sm" onClick={(e) => props.onEdit(item.Caseid)}><i class="nc-icon nc-ruler-pencil"></i></Button>
                     </td>
                 </tr>
                    ))}
                </tbody>
            </Table>
            {
                openAssignModalPopUpModal &&
                <ModalAssignInvestigator {...props}
                    HeaderText="Assign Investigator"
                    Ismodalshow={openAssignModalPopUpModal}
                    closeNewmodal={closeAssignInvestigatorModalNewmodal}
                    Id={assignApplicantCaseId}
                    SelectedInvestigatorId={assignedInvestigatorId}
                    SaveAssignInvestigator={props.SaveAssignInvestigator}
                />
            }
        </div>



    );
}

export default GridFollowUpCases;