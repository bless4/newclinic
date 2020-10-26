
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Table, Select, Button, Modal, Input, Radio, Row, Col } from 'antd';
import CSVReader from "react-csv-reader";
import SimpleReactValidator from 'simple-react-validator';
import {columns} from './columns';

const { Option } = Select;

class TableData extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        uploadModelVisibility: false,
        emailModelVisibility: false,
        addModalVisibility: false,
        data: "",
        temp: "",
        holdData: [],
        conditionFilter: undefined,
        countryFilter: undefined,
        languageFilter: undefined,
        storeLocalData: '',
        fileRowCounts: undefined,
        rowArray: [],
  
        // form variable
        name: "",
        email: "",
        phone: "",
        gender: "",
        language: "",
        country: "",
        id: "",
        dataController: "",
        consentGdpr: "",
        consentOther: ""
      }
      this.validator = new SimpleReactValidator({});
    }
  
    componentDidMount() {
      let data = JSON.parse(localStorage.getItem("defaultData"));
      if (data) {
        this.setState({ data: data, temp: data })
      }
    }
  
    onSelectChange = selectedRowKeys => {
      this.setState({ selectedRowKeys });
    };
  
    // multiple select condition set
    handleChangeCondition = value => {
      const { temp, languageFilter, countryFilter } = this.state;
      const array = [];
      temp.filter(function (item, i) {
        if (countryFilter && languageFilter) {
          if (item.idc10 === value && item.language === languageFilter && item.country === countryFilter) {
            array.push(item)
          }
        }
        else if (countryFilter) {
          if (item.idc10 === value && item.country === countryFilter) {
            array.push(item)
          }
        }
        else if (languageFilter) {
          if (item.idc10 === value && item.language === languageFilter) {
            array.push(item)
          }
        }
        else {
          if (item.idc10 === value) {
            array.push(item)
          }
        }
      });
      this.setState({ data: array, conditionFilter: value });
  
    };
  
    // multiple select country set
    handleChangeCountry = value => {
      const { temp, conditionFilter, languageFilter } = this.state;
      const array = [];
      temp.filter(function (item, i) {
        if (conditionFilter && languageFilter) {
          if (item.country === value && item.idc10 === conditionFilter && item.language === languageFilter) {
            array.push(item)
          }
        }
        else if (conditionFilter) {
          if (item.country === value && item.idc10 === conditionFilter) {
            array.push(item)
          }
        }
        else if (languageFilter) {
          if (item.country === value && item.language === languageFilter) {
            array.push(item)
          }
        }
        else {
          if (item.country === value) {
            array.push(item)
          }
        }
      });
      this.setState({ data: array, countryFilter: value })
    };
  
    // multiple select language select
    handleChangeLanguage = value => {
      const { temp, conditionFilter, countryFilter } = this.state;
      const array = [];
      temp.filter(function (item, i) {
        if (conditionFilter && countryFilter) {
          if (item.language === value && item.idc10 === conditionFilter && item.country === countryFilter) {
            array.push(item)
          }
        }
        else if (conditionFilter) {
          if (item.language === value && item.idc10 === conditionFilter) {
            array.push(item)
          }
        }
        else if (countryFilter) {
          if (item.language === value && item.country === countryFilter) {
            array.push(item)
          }
        }
        else {
          if (item.language === value) {
            array.push(item)
          }
        }
      });
      this.setState({ data: array, languageFilter: value });
    };
  
    clearCondition = () => {
      this.setState({ conditionFilter: undefined }, () => {
        const { temp, languageFilter, countryFilter, conditionFilter } = this.state;
        const array = [];
        temp.filter(function (item, i) {
          if (countryFilter && languageFilter) {
            if (item.idc10 === conditionFilter || (item.language === languageFilter && item.country === countryFilter)) {
              array.push(item)
            }
          }
          else if (countryFilter) {
            if (item.idc10 === conditionFilter || item.country === countryFilter) {
              array.push(item)
            }
          }
          else if (languageFilter) {
            if (item.idc10 === conditionFilter || item.language === languageFilter) {
              array.push(item)
            }
          }
          else {
            array.push(item)
          }
        });
        this.setState({ data: array });
      })
    }
  
    clearCountry = () => {
      this.setState({ countryFilter: undefined }, () => {
        const { temp, languageFilter, countryFilter, conditionFilter } = this.state;
        const array = [];
        temp.filter(function (item, i) {
          if (conditionFilter && languageFilter) {
            if (item.country === countryFilter || (item.idc10 === conditionFilter && item.language === languageFilter)) {
              array.push(item)
            }
          }
          else if (conditionFilter) {
            if (item.country === countryFilter || item.idc10 === conditionFilter) {
              array.push(item)
            }
          }
          else if (languageFilter) {
            if (item.country === countryFilter || item.language === languageFilter) {
              array.push(item)
            }
          }
          else {
            array.push(item)
          }
        });
        this.setState({ data: array });
      })
    }
  
    clearLanguage = () => {
      this.setState({ languageFilter: undefined }, () => {
        const { temp, languageFilter, countryFilter, conditionFilter } = this.state;
        const array = [];
        temp.filter(function (item, i) {
          if (conditionFilter && countryFilter) {
            if (item.language === languageFilter || (item.idc10 === conditionFilter && item.country === countryFilter)) {
              array.push(item)
            }
          }
          else if (conditionFilter) {
            if (item.language === languageFilter || item.idc10 === conditionFilter) {
              array.push(item)
            }
          }
          else if (countryFilter) {
            if (item.language === languageFilter || item.country === countryFilter) {
              array.push(item)
            }
          }
          else {
            array.push(item)
          }
        });
        this.setState({ data: array });
      })
    }
  
  
    // upload modal
    showUploadModal = () => {
      this.setState({ uploadModelVisibility: !this.state.uploadModelVisibility });
    };
  
    // add modal
    showAddModal = () => {
      this.setState({ addModalVisibility: !this.state.addModalVisibility });
    }
  
    // email modal
    showEmailModal = () => {
      this.setState({ emailModelVisibility: !this.state.emailModelVisibility });
    };
  
    onUploadModalOk = () => {
      if (this.state.holdData.length > 0) {
        localStorage.setItem("defaultData", JSON.stringify(this.state.holdData));
      }
      const data = JSON.parse(localStorage.getItem("defaultData"))
      this.setState({ uploadModelVisibility: false, temp: data, data: data });
    };
  
    onEmailModalOk = () => {
      console.log('Selected rows are', this.state.rowArray)
      this.setState({ emailModelVisibility: false });
    };
  
    handleForce = (data, fileInfo) => {
      let object = {};
      let consent_gdpr = "";
      let consent_other = "";
      var result = data.map(function (el, index) {
        if (el.consent_gdpr === true) {
          consent_gdpr = "true"
        } else if (el.consent_gdpr === false) {
          consent_gdpr = "false"
        } else {
          consent_gdpr = ""
        }
  
        if (el.consent_other === true) {
          consent_other = "true"
        } else if (el.consent_other === false) {
          consent_other = "false"
        } else {
          consent_other = ""
        }
        object = {
          key: index + 1,
          name: el.name ? el.name : "",
          email: el.email ? el.email : "",
          phone: el.phone ? el.phone : "",
          gender: el.gender ? el.gender : "",
          language: el.language ? el.language : "",
          country: el.country ? el.country : "",
          idc10: el.idc10 ? el.idc10 : "",
          data_controller: el.data_controller ? el.data_controller : "",
          consent_gdpr: consent_gdpr,
          consent_other: consent_other,
          created_at: el.created_at ? el.created_at : "",
        }
        return object;
      })
      this.state.holdData = result;
      this.setState({ fileRowCounts: result ? result.length : 0 })
    }
  
    handleChangeForm = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value })
    }
  
    onChangeRadio = (e) => {
      this.setState({ gender: e.target.value })
    }
  
    // form submit
    handleFormSubmit = () => {
      const { data } = this.state;
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
        data.unshift(obj)
        localStorage.setItem("defaultData", JSON.stringify(data))
        setTimeout(() => {
          let array = JSON.parse(localStorage.getItem("defaultData"))
          this.setState({ data: array, temp: array, addModalVisibility: false })
        }, 100);
  
      }
      else {
        this.validator.showMessages();
        this.forceUpdate();
      }
    }
  
    handleSelectRow = (value) => {
      const { rowArray } = this.state;
      var temp = this.state.rowArray.findIndex(o => o.key == value.key);
      if (temp === -1) {
        rowArray.push(value);
        this.setState({ rowArray: this.state.rowArray })
      }
      else {
        this.state.rowArray.filter((row, index) => {
          if (row.key == value.key) {
            this.state.rowArray.splice(index, 1)
          }
          this.setState({ rowArray: this.state.rowArray })
        })
      }
    }
  
    render() {
      const { loading, selectedRowKeys, temp, fileRowCounts } = this.state;
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange,
        onSelect: this.handleSelectRow
      };
      var conditions = [], countries = [], languages = []
      if (temp.length > 0) {
        conditions = temp.map(function (obj) { return obj.idc10; });
        conditions = conditions && conditions.filter(function (v, i) {
          return conditions.indexOf(v) === i && v !== null && v !== "";
        });
  
        countries = temp.map(function (obj) { return obj.country; });
        countries = countries && countries.filter(function (v, i) {
          return countries.indexOf(v) == i && v !== null && v !== "";
        });
  
        languages = temp.map(function (obj) { return obj.language; });
        languages = languages && languages.filter(function (v, i) {
          return languages.indexOf(v) == i && v !== null && v !== "";
        });
      }
  
      var hasSelected = selectedRowKeys.length;
      const papaparseOptions = {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
      };
  
      return (
        <div className="App">
          <Select placeholder="Condition" value={this.state.conditionFilter} className="condition" onChange={this.handleChangeCondition.bind(this)}
            allowClear={true} onClear={this.clearCondition}>
            {conditions.length > 0 && conditions.map((condition, index) =>
              <Option value={condition} key={index}>{condition}</Option>
            )}
          </Select>
          <Select placeholder="Country" className="country" value={this.state.countryFilter} onChange={this.handleChangeCountry.bind(this)} allowClear={true}
            allowClear={true} onClear={this.clearCountry}>
            {countries.length > 0 && countries.map((country, index) =>
              <Option value={country} key={index}>{country}</Option>
            )}
          </Select>
          <Select placeholder="Language" className="language" value={this.state.languageFilter} onChange={this.handleChangeLanguage.bind(this)} allowClear={true}
            allowClear={true} onClear={this.clearLanguage}>
            {languages.length > 0 && languages.map((language, index) =>
              <Option value={language} key={index}>{language}</Option>
            )}
          </Select>
          <Button type="primary" onClick={this.showEmailModal} className="btn-send-email">Send Email</Button>
          <Button type="primary" onClick={this.showUploadModal} className="btn-upload">Upload subjects</Button>
          <Button type="primary" onClick={this.showAddModal} className="btn-upload">Add subject</Button>
  
          {/* table */}
          <Table rowSelection={rowSelection} rowKey={record => record.key}
            columns={columns} bordered dataSource={this.state.data} />
          <div>
  
            {/* email modal */}
            <Modal
              title="Confirm Email"
              visible={this.state.emailModelVisibility}
              onOk={this.onEmailModalOk}
              onCancel={this.showEmailModal}
            >
              Please click to confirm sending {hasSelected} emails
            </Modal>
  
            {/* upload modal */}
            <Modal
              title="Upload"
              visible={this.state.uploadModelVisibility}
              onOk={this.onUploadModalOk}
              onCancel={this.showUploadModal}
            >
              <CSVReader
                cssClass="react-csv-input"
                onFileLoaded={this.handleForce}
                parserOptions={papaparseOptions}
              />
              {(fileRowCounts > 0) ? <span>Contains {fileRowCounts} rows</span> : null}
            </Modal>
  
            {/* add form modal */}
            <Modal
              width="700px"
              title="Add Subject"
              visible={this.state.addModalVisibility}
              onOk={this.handleFormSubmit}
              onCancel={this.showAddModal}
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
          </div>
        </div>
      );
    }
  }
  
  export default TableData;
  