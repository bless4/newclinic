import React, { Component } from 'react';
import { Table, Select, Button } from 'antd';
import SimpleReactValidator from 'simple-react-validator';
import AddSubjectModal from '../../modal/addSubject';
import UploadSubjectModal from '../../modal/uploadSubject';
import SendEmailModal from '../../modal/sendEmail';
import defaultData from './defaultData';
import columns from './columns';



const { Option } = Select;


class HomeComponent extends Component {

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
      rowArray: []
    }
    this.validator = new SimpleReactValidator({});
  }

  getData() {
    let data = JSON.parse(localStorage.getItem("defaultData"));
    if (data) {
      this.setState({ data: data, temp: data })
    } else {
      data = defaultData;
      localStorage.setItem("defaultData", JSON.stringify(data));
      this.setState({ data: data, temp: data })
    }
  }

  componentDidMount() {
    this.getData();
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
    this.setState({ uploadModelVisibility: true });
  };

  // add modal
  showAddModal = () => {
    this.setState({ addModalVisibility: true });
  }

  closeAddModal = () => {
    this.setState({ addModalVisibility: !this.state.addModalVisibility })
  }

  closeUploadModal = () => {
    this.setState({ uploadModelVisibility: !this.state.uploadModelVisibility })
  }

  // email modal
  showEmailModal = () => {
    this.setState({ emailModelVisibility: true });
  };

  closeEmailModal = () => {
    this.setState({ emailModelVisibility: !this.state.emailModelVisibility })
  }
  // 

  onEmailModalOk = () => {
    console.log('Selected rows are', this.state.rowArray)
    this.setState({ emailModelVisibility: false });
  };

  handleSelectRow = (value) => {
    const { rowArray } = this.state;
    var temp = this.state.rowArray.findIndex(o => o.key == value.key);
    if (temp === -1) {
      rowArray.push(value);
      this.setState({ rowArray: this.state.rowArray })
    }
    else {
      this.state.rowArray.filter((row, index) => {
        if (row.key === value.key) {
          this.state.rowArray.splice(index, 1)
        }
        this.setState({ rowArray: this.state.rowArray })
      })
    }
  }  

  render() {
    const {  selectedRowKeys, temp } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      onSelect: this.handleSelectRow
    };
    var conditions = [], countries = [], languages = []
    if (temp.length > 0) {
      conditions = temp.map(function (obj) { return obj.idc10; });
      conditions = conditions && conditions.filter(function (v, i) {
        return conditions.indexOf(v) === i && v != null && v !== "";
      });

      countries = temp.map(function (obj) { return obj.country; });
      countries = countries && countries.filter(function (v, i) {
        return countries.indexOf(v) === i && v !== null && v !== "";
      });

      languages = temp.map(function (obj) { return obj.language; });
      languages = languages && languages.filter(function (v, i) {
        return languages.indexOf(v) === i && v !== null && v !== "";
      });
    }

    return (
      <div className="App">
        <Select placeholder="Condition" value={this.state.conditionFilter}
         className="condition" onChange={this.handleChangeCondition.bind(this)}
          allowClear={true} onClear={this.clearCondition}>
          {conditions.length > 0 && conditions.map((condition, index) =>
            <Option value={condition} key={index}>{condition}</Option>
          )}
        </Select>

        <Select placeholder="Country" className="country" value={this.state.countryFilter}
         onChange={this.handleChangeCountry.bind(this)} allowClear={true}
          allowClear={true} onClear={this.clearCountry}>
          {countries.length > 0 && countries.map((country, index) =>
            <Option value={country} key={index}>{country}</Option>
          )}
        </Select>

        <Select placeholder="Language" className="language" value={this.state.languageFilter}
         onChange={this.handleChangeLanguage.bind(this)} allowClear={true}
          allowClear={true} onClear={this.clearLanguage}>
          {languages.length > 0 && languages.map((language, index) =>
            <Option value={language} key={index}>{language}</Option>
          )}
        </Select>

        <Button type="primary" onClick={this.showEmailModal} className="btn-send-email">Send Email</Button>
        <Button type="primary" onClick={this.showUploadModal} className="btn-upload">Upload Subjects</Button>
        <Button type="primary" onClick={this.showAddModal} className="btn-upload">Add Subject</Button>

        {/* table */}
        <Table rowSelection={rowSelection} rowKey={record => record.key}
          columns={columns} bordered dataSource={this.state.data} />
        <div>
        </div>

        {this.state.addModalVisibility ? <AddSubjectModal visible={this.state.addModalVisibility} toggleAdd={this.closeAddModal} confirmToggleAdd={this.getData.bind(this)} /> : ""}
        {this.state.uploadModelVisibility ? <UploadSubjectModal visible={this.state.uploadModelVisibility} toggleUpload={this.closeUploadModal} confirmToggleUpload={this.getData.bind(this)} /> : ""}
        {this.state.emailModelVisibility ? <SendEmailModal visible={this.state.emailModelVisibility} count={this.state.selectedRowKeys} toggleEmail={this.closeEmailModal} confirmToggleEmail={this.onEmailModalOk.bind(this)} /> : ""}
      </div>
    );
  }
}

export default HomeComponent;