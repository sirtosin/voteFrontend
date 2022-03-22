import React, { useState } from 'react'
import { Modal } from 'antd';

const VoteModal = ({ candidate, party }) => {
    const [isModalVisible, setIsModalVisible] = useState(true);

    const handleOk = () => {
        setIsModalVisible(!isModalVisible);
    };


    return (
        <>
            <Modal title="2023 voting exercise" visible={isModalVisible} onOk={handleOk} >
                <h3>you voted for {candidate} in {party}  party</h3>
                <p>thank you for voting</p>
            </Modal>
        </>
    );

}

export default VoteModal
