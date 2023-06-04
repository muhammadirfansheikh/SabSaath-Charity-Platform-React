import React, { useState, Link } from 'react'
import { useHistory } from "react-router-dom";
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
  Badge
} from "reactstrap";
import ModalApplHistory from '../../components/modal/ModalApplHistory.js'

import  Editer from '../Editer.js'
import VideoInput from '../VideoInput.js'
const Story = (props) => {

  const [openModal, setOpenModal] = useState(false);
  const openNewmodal = () => {
    
     setOpenModal(true);
   }
   const closeNewmodal = () => {
     setOpenModal(false);
   }

  return (
    <div>
          <Row form>
    <Col md={12} className="text-right">
      <Button color="secondary" className="btn-sm" type="submit" onClick={() => openNewmodal({ UserId: 0 })}>History</Button>
    </Col>
    </Row>
    {/*case story*/}
      <Card className="mb-3">
        <CardHeader>
          <h6 className="font-weight-bold mb-0">Story</h6>
        </CardHeader>
        <CardBody>
        <Form>
        <Row form>     
        <Col md={4}>
          <FormGroup check className="mt-1 pt-3">
                <Input
                  name="checkbox1"
                  type="checkbox" />
                <Label check>
                Show case story on website
              </Label>
            </FormGroup>
          </Col>
        </Row>

        <Row form>     
        <Col md={12}>
         <FormGroup>
         <Label for="">Story Description</Label>
         <Input type="textarea" Row={3} className="form-control" id="" />
       
         </FormGroup>
          </Col>
         </Row>

          <Row form>     
          <Col md={3}>
            <FormGroup>
              <Label for="">Attach Images</Label>
              <input type="file" className="form-control" id=""/>
            </FormGroup>
          </Col>
        </Row>
       
      </Form>

                  <Row form>
        <Col md={12}>
          <h2 className="h6">Images</h2>
        </Col>
      </Row>
                  <Row form>
        <Col md={12}>
          <Table bordered striped responsive>
            <thead>
              <tr>
                <th>Sr #</th>
                <th>File Name</th>
                <th>Download</th>
                <th>View on website</th>
                                      <th className="text-center" style={{ width: 150 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td></td>
                <td></td>
                <td><a href="" color="primary" size="sm">View on website <i className="fa fa-link"></i></a></td>
                <td className="text-center"><Button color="primary" className="btn-circle" size="sm"><i className="nc-icon nc-ruler-pencil"></i></Button>
                                          <Button color="danger" className="btn-circle" size="sm"><i className="nc-icon nc-simple-remove"></i></Button></td>
                
              </tr>
              <tr>
                <td>2</td>
                <td></td>
                <td></td>
                <td><a href="" color="primary" size="sm">View on website <i className="fa fa-link"></i></a></td>
                                      <td className="text-center"><Button color="primary" className="btn-circle" size="sm"><i className="nc-icon nc-ruler-pencil"></i></Button>
                                          <Button color="danger" className="btn-circle" size="sm"><i className="nc-icon nc-simple-remove"></i></Button></td>
              </tr>
              <tr>
                <td>3</td>
                <td></td>
                <td></td>
                <td><a href="" color="primary" size="sm">View on website <i className="fa fa-link"></i></a></td>
                                      <td className="text-center"><Button color="primary" className="btn-circle" size="sm"><i className="nc-icon nc-ruler-pencil"></i></Button>
                                          <Button color="danger" className="btn-circle" size="sm"><i className="nc-icon nc-simple-remove"></i></Button></td>
              </tr>
              <tr>
                <td>4</td>
                <td></td>
                <td></td>
                <td><a href="" color="primary" size="sm">View on website <i className="fa fa-link"></i></a></td>
                                      <td className="text-center"><Button color="primary" className="btn-circle" size="sm"><i className="nc-icon nc-ruler-pencil"></i></Button>
                                          <Button color="danger" className="btn-circle" size="sm"><i className="nc-icon nc-simple-remove"></i></Button></td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row form>     
       <Col md={3}>
      <FormGroup>
      <Label for="">Upload video from device/ Enter URL</Label>
     {// <Input type="file" className="form-control" id="" />
     }
     <VideoInput/>
    </FormGroup>
    </Col>
     <Col md={3}>
     <FormGroup>
    <Label for="">Enter URL</Label>
    <Input type="text" className="form-control" id="" />
    </FormGroup>
    </Col>
    </Row>

    {/*
    <Row form className="text-right">
    <Col md={12}>
      <FormGroup>
        <Button color="primary">Upload</Button>
      </FormGroup>
    </Col>
    </Row>
   */}

        </CardBody>
      </Card>
{/*case story*/}

{/*success story*/}
<Card className="mb-3">
<CardHeader>
  <h6 className="font-weight-bold mb-0">Success Story</h6>
</CardHeader>
<CardBody>
<Form>
<Row form>     
<Col md={4}>
  <FormGroup check className="mt-1 pt-3">
        <Input
          name="checkbox1"
          type="checkbox" />
        <Label check>
        Show case success on website
      </Label>
    </FormGroup>
  </Col>
</Row>
        <Row form>     
          <Col md={12}>
            <FormGroup>
              <Label for="">Succes Story</Label>
              {/* <Editer/> */}
            </FormGroup>
          </Col>
          </Row>
  
  <Row form> 
  <Col md={3}>
    <FormGroup>
      <Label for="">Attach Images</Label>
      <input type="file" className="form-control" id=""/>
    </FormGroup>
  </Col>
</Row>
{/*<Row form className="text-right">
  <Col md={12}>
    <FormGroup>
      <Button color="primary">Upload</Button>
    </FormGroup>
  </Col>
</Row>*/}
</Form>

                  <Row form>
<Col md={12}>
  <h2 className="h6">Images</h2>
</Col>
</Row>
                  <Row form>
<Col md={12}>
  <Table bordered striped responsive>
    <thead>
      <tr>
      <th>Sr #</th>
      <th>File Name</th>
      <th>Download</th>
      <th>View on website</th>
      <th className="text-center" style={{ width: 150 }}>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td></td>
        <td></td>
        <td><a href="" color="primary" size="sm">View on website <i className="fa fa-link"></i></a></td>
        <td className="text-center"><Button color="primary" className="btn-circle" size="sm"><i className="nc-icon nc-ruler-pencil"></i></Button>
        <Button color="danger" className="btn-circle" size="sm"><i className="nc-icon nc-simple-remove"></i></Button></td>
        
      </tr>
      <tr>
        <td>2</td>
        <td></td>
        <td></td>
        <td><a href="" color="primary" size="sm">View on website <i className="fa fa-link"></i></a></td>
        <td className="text-center"><Button color="primary" className="btn-circle" size="sm"><i className="nc-icon nc-ruler-pencil"></i></Button>
        <Button color="danger" className="btn-circle" size="sm"><i className="nc-icon nc-simple-remove"></i></Button></td>
      </tr>
      <tr>
        <td>3</td>
        <td></td>
        <td></td>
        <td><a href="" color="primary" size="sm">View on website <i className="fa fa-link"></i></a></td>
        <td className="text-center"><Button color="primary" className="btn-circle" size="sm"><i className="nc-icon nc-ruler-pencil"></i></Button>
        <Button color="danger" className="btn-circle" size="sm"><i className="nc-icon nc-simple-remove"></i></Button></td>
      </tr>
      <tr>
        <td>4</td>
        <td></td>
        <td></td>
        <td><a href="" color="primary" size="sm">View on website <i className="fa fa-link"></i></a></td>
        <td className="text-center"><Button color="primary" className="btn-circle" size="sm"><i className="nc-icon nc-ruler-pencil"></i></Button>
        <Button color="danger" className="btn-circle" size="sm"><i className="nc-icon nc-simple-remove"></i></Button></td>
      </tr>
    </tbody>
  </Table>
</Col>
</Row>

<Row form>     
  <Col md={3}>
    <FormGroup>
      <Label for="">Upload video from device/ Enter URL</Label>
     {// <Input type="file" className="form-control" id="" />
     }
     <VideoInput/>
    </FormGroup>
  </Col>
  <Col md={3}>
  <FormGroup>
    <Label for="">Enter URL</Label>
    <Input type="text" className="form-control" id="" />
  </FormGroup>
</Col>
</Row>

{/*
<Row form className="text-right">
    <Col md={12}>
      <FormGroup>
        <Button color="primary">Upload</Button>
      </FormGroup>
    </Col>
</Row>*/}

</CardBody>
</Card>

{/*success story*/}
      {/* <Row className="text-right">
        <Col md={12}>
          <Button color="primary">Update</Button>
        </Col>
      </Row> */}
      
    {
      openModal &&
      <ModalApplHistory {...props}
        HeaderText="Applicant History"
        Ismodalshow={openModal}
        closeNewmodal={closeNewmodal}
      />

    }
    </div>
  );



}

export default Story