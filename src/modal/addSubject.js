import React, { Component } from 'react';
import { Modal, Input, Radio, Row, Col } from 'antd';
import SimpleReactValidator from 'simple-react-validator';

class AddSubjectModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            phone: "",
            gender: "",
            language: "",
            country: "",
            id: "",
            dataController: "",
            consentGdpr: "",
            consentOther: "",
            visible : props.visible,
            localData : ""
        }
        this.validator = new SimpleReactValidator({});
    }

    componentDidMount(){
        let data = JSON.parse(localStorage.getItem("defaultData"));
        if (data) {
          this.setState({ localData: data })
        }
    }

    cancelModal = () => {
        this.setState({ visible : !this.state.visible } , () => {
            this.props.toggleAdd();
        })
    }

    handleFormSubmit = () => {
        const { localData } = this.state;
        if (this.validator.allValid()) {
          let obj = {
            key: this.state.name,
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            gender: this.state.gender,
            language: this.state.language,
            country: this.state.country,
            idc10: this.state.id,
            data_controller: this.state.dataController,
            consent_gdpr: this.state.consentGdpr,
            consent_other: this.state.consentOther,
            created_at: new Date()
          }
          localData.unshift(obj)
          localStorage.setItem("defaultData", JSON.stringify(localData))
          this.props.toggleAdd();
          this.props.confirmToggleAdd();
    
        }
        else {
          this.validator.showMessages();
          this.forceUpdate();
        }
    }

    handleChangeForm = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
      }
    
      onChangeRadio = (e) => {
        this.setState({ gender: e.target.value })
      }

    render() {
        const { visible } = this.state;
        return (
            <Modal
                width="700px"
                title="Add Subject"
                visible={visible}
                onOk={this.handleFormSubmit}
                onCancel={this.cancelModal}
            >
                <Row>
                    <Col lg={12}>
                        <div className="form-data left-col">
                            <label>Name</label>
                            <Input name="name" value={this.state.name} placeholder="Name" onChange={this.handleChangeForm} />
                            <div className="error-message"> {this.validator.message('name', this.state.name, 'required')}</div>
                        </div>
                    </Col>

                    <Col lg={12}>
                        <div className="form-data right-col">
                            <label>Email</label>
                            <Input type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChangeForm} />
                            <div className="error-message"> {this.validator.message('email', this.state.email, 'required|email')}</div>
                        </div>
                    </Col>
                </Row>

                <div className="form-data">
                    <label>Phone</label>
                    <Input type="text" name="phone" value={this.state.phone} placeholder="Phone" onChange={this.handleChangeForm} />
                    <div className="error-message"> {this.validator.message('Phone', this.state.phone, 'required|phone')}</div>
                </div>

                <div className="form-data">
                    <label>Gender</label><br />
                    <Radio.Group onChange={this.onChangeRadio} value={this.state.gender}>
                        <Radio value="Male">Male</Radio>
                        <Radio value="Female">Female</Radio>
                    </Radio.Group>
                    <div className="error-message"> {this.validator.message('gender', this.state.gender, 'required')}</div>
                </div>

                <Row>
                    <Col lg={12}>
                        <div className="form-data left-col">
                            <label>Language</label>
                            <Input type="text" name="language" value={this.state.language} placeholder="Language" onChange={this.handleChangeForm} />
                            <div className="error-message"> {this.validator.message('language', this.state.language, 'required')}</div>
                        </div>
                    </Col>

                    <Col lg={12}>
                        <div className="form-data right-col">
                            <label>Country</label>
                            <Input type="text" name="country" value={this.state.country} placeholder="Country" onChange={this.handleChangeForm} />
                            <div className="error-message"> {this.validator.message('country', this.state.country, 'required')}</div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12}>
                        <div className="form-data left-col">
                            <label>Idc10</label>
                            <Input type="text" name="id" value={this.state.id} placeholder="Idc10" onChange={this.handleChangeForm} />
                            <div className="error-message"> {this.validator.message('Idc10', this.state.id, 'required')}</div>
                        </div>
                    </Col>

                    <Col lg={12}>
                        <div className="form-data right-col">
                            <label>Data Controller</label>
                            <Input type="text" name="dataController" value={this.state.dataController} placeholder="Data Controller" onChange={this.handleChangeForm} />
                            <div className="error-message"> {this.validator.message('dataController', this.state.dataController, 'required')}</div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col lg={12}>
                        <div className="form-data left-col">
                            <label>Consent Gdpr</label>
                            <Input type="text" name="consentGdpr" value={this.state.consentGdpr} placeholder="Consent Gdpr" onChange={this.handleChangeForm} />
                        </div>
                    </Col>

                    <Col lg={12}>
                        <div className="form-data right-col">
                            <label>Consent Other</label>
                            <Input type="text" name="consentOther" value={this.state.consentOther} placeholder="Consent Other" onChange={this.handleChangeForm} />
                        </div>
                    </Col>
                </Row>
            </Modal>
        )
    }
}

export default AddSubjectModal;