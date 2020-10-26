import React, { Component } from 'react';
import { Button, Modal } from 'antd';
import CSVReader from "react-csv-reader";

class UploadSubjectModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            fileRowCounts: 0,
            holdData: ""
        }
    }

    cancelUploadModal = () => {
        this.props.toggleUpload();
    }

    onUploadModalOk = () => {
        if (this.state.holdData.length > 0) {
            localStorage.setItem("defaultData", JSON.stringify(this.state.holdData));
        }
        this.props.toggleUpload();
        this.props.confirmToggleUpload();
    }

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
        this.setState({ fileRowCounts: result ? result.length : 0, holdData: result })
    }

    render() {

        const { fileRowCounts, visible } = this.state;
        const papaparseOptions = {
            header: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
        };

        return (
            <Modal
                title="Upload"
                visible={visible}
                onCancel={this.cancelUploadModal}
                footer={[
                    <Button key="back" onClick={this.cancelUploadModal}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={this.onUploadModalOk}>
                        Add Subject
                    </Button>
                ]}
            >
                <CSVReader
                    cssClass="react-csv-input"
                    onFileLoaded={this.handleForce}
                    parserOptions={papaparseOptions}
                />
                {(fileRowCounts > 0) ? <span>Contains {fileRowCounts} rows</span> : null}
            </Modal>
        )
    }

}

export default UploadSubjectModal;