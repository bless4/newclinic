import React, { Component } from 'react';
import { Modal } from 'antd';

class SendEmailModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible : props.visible ,
            count : props.count.length
        }
    }

    handleEmailModal = () => {
        this.props.toggleEmail();
        this.props.confirmToggleEmail();
    }

    cancelEmailModal = () => {
        this.props.toggleEmail();
    }

    render() {
        const { visible , count } = this.state;
        return (
            <Modal
                title="Confirm Email"
                visible={visible}
                onOk={this.handleEmailModal}
                onCancel={this.cancelEmailModal}
            >
                Please click to confirm sending {count} emails
            </Modal>
        )
    }

}

export default SendEmailModal;