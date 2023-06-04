import React,{useState} from "react";
import "../assets/css/treeview.css";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  FormGroup,
  Form,
  Label,
  Option,
  Input,
  check,
  Badge,
} from "reactstrap";

import Tree from 'react-animated-tree'

const treeStyles = {
  padding: '20px',
  color: '#212529',
  fill: '#d60b11',
  width: '100%'
}

const typeStyles = {
  fontSize: '2em',
  verticalAlign: 'middle'
}

const RolesAccess = (props) => {
    
 return(
  <>
  <div className="content">
    <Row>
      <Col lg={12} md={12}>
        <Card>
          <CardBody>
          <Row>
            <Col md={3}>
                  <FormGroup>
                    <Label for="">Role</Label>
                    <Input type="select" className="form-control" id="">
                      <option selected>-Select-</option>
                      <option>Admins</option>
                      <option>Agent</option>
                      <option>Communication Manager</option>
                      <option>Diabetes Zonal Manager</option>
                      <option>Distributor</option>
                      <option>Patient</option>
                      <option>Report User (Complain/Inquiry)</option>
                      <option>Super Admin</option>
                      <option>Supervisor</option>
                      <option>Supply Chain</option>
                    </Input>
                  </FormGroup>
                </Col>
            </Row>
            <Row className="mt-20">
              <Col md={12}>
              <Tree content="main" canHide open style={treeStyles}>
                  <Tree content="hello" canHide />
                  <Tree content="subtree with children" canHide>
                    <Tree content="hello" />
                    <Tree content="sub-subtree with children">
					 <Input type="text" className="form-control" />
                      <Tree content="child 1" style={{ color: '#63b1de' }} />
                      <Tree content="child 2" style={{ color: '#63b1de' }} />
                      <Tree content="child 3" style={{ color: '#63b1de' }} />
                    </Tree>
                    <Tree content="hello" />
                  </Tree>
                  <Tree content="hello" canHide />
                  <Tree content="hello" canHide />
                </Tree>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
    </div>
  </>
  );
    }

export default RolesAccess