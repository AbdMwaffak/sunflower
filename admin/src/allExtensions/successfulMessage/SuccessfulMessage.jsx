import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function SuccessfulMessage(props) {

    const [show, setShow] = useState(false);
    const handleClose = () => (setShow(false), props.handleClose())
    const handleShow = () => setShow(true);

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Successful Message</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='delelteBody'>
                    {props?.state?.status == "loading" &&
                        <div >  loading</div>
                    }
                    {props?.state?.status == "successful" &&
                        <div >  {props?.state?.data}</div>
                    }
                    {(props?.state?.error != null &&
                        props?.state?.status != "successful" &&
                        props?.state?.status != "loading"
                    ) &&
                        <div >  {props?.state?.error}
                            <div> error  </div>
                        </div>

                    }

                </div>
            </Modal.Body>
            <Modal.Footer id='modal-footer'>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
}

export default SuccessfulMessage;