import React, { useState } from "react"
import { Modal } from "antd"
import VerifyButton from "./VerifyButton"

const Verification = () => {

    const [modalOpen, setModalOpen] = useState(false);
    

    const handleConfirmModal = () => console.log("adsf")

    return (
        <section>
            <VerifyButton onClick={() => setModalOpen(true)} />
            <Modal
                title="Code of Conduct"
                visible={modalOpen}
                onOk={() => handleConfirmModal()}
                okButtonProps={({type: 'promary', })}
                onCancel={() => setModalOpen(false)}
                >
                <p>Being a great volunteer In order to support safety and trust in our community, 
                    we have a code of conduct all volunteers need to follow in your heart. This 
                    code sets out principles and behaviours that the Voluntarily community reasonably 
                    expects of buyers and sellers participating in online auctions. Basic Principles 
                    The community expects volunteers to: 
                    • Conduct themselves honestly and in good faith at all times. •
                     Comply with all laws, including sale of goods and intellectual property laws. • Comply with Voluntariliy’s terms and conditions. View the full Code of Conduct and Terms of Use</p>
            </Modal>
        </section>
    )

}

export default Verification