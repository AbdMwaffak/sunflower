import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AccountModel(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <button className='editInfo'  >
                <svg onClick={handleShow} className='svgEdit' xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 82.313 82.182">
                    <g id="SVGRepo_iconCarrier" transform="translate(3.5 3.5)">
                        <path id="Path_2292" data-name="Path 2292" d="M60.33,18.707,24.623,54.413c-3.556,3.556-14.111,5.2-16.469,2.845s-.749-12.913,2.807-16.469L46.706,5.045A9.657,9.657,0,1,1,60.33,18.707Z" transform="translate(11.832 -1.913)" fill="none" stroke="#F1C92F" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" />
                        <path id="Path_2293" data-name="Path 2293" d="M35.686,4H16.971A14.972,14.972,0,0,0,2,18.971V56.4A14.972,14.972,0,0,0,16.971,71.372H58.143c8.272,0,11.229-6.737,11.229-14.971V37.686" transform="translate(-2 3.81)" fill="none" stroke="#F1C92F" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" />
                    </g>
                </svg>
            </button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={props.type == "name" ? "tt" : "ff"} >
                        <Form.Label>  user name :</Form.Label>
                        <Form.Control className='input6' type="text" aria-label="With textarea"
                            placeholder='write here '
                        />
                    </div>
                    <div className={props.type == "phone" ? "tt" : "ff"} >
                        <Form.Label>  phone :</Form.Label>
                        <Form.Control className='input6' type="text" aria-label="With textarea"
                            placeholder='write here '
                        />
                    </div>
                    <div className={props.type == "gender" ? "tt" : "ff"} >
                        <Form.Label>  gender :</Form.Label>
                        <Form.Control className='input6' type="text" aria-label="With textarea"
                            placeholder='write here '
                        />
                    </div>
                    <div className={props.type == "passWord" ? "tt" : "ff"} >
                        <Form.Label> old password :</Form.Label>
                        <Form.Control className='input6' type="password" aria-label="With textarea"
                            placeholder='write here '
                        />
                        <Form.Label>  new password :</Form.Label>
                        <Form.Control className='input6' type="password" aria-label="With textarea"
                            placeholder='write here '
                        />
                    </div>
                    <div className={props.type == "birth" ? "tt" : "ff"} >
                        <Form.Label>  birth :</Form.Label>
                        <Form.Control className='input6' type="date" aria-label="With textarea"
                            placeholder='write here '
                        />
                    </div>
                    <div className={props.type == "adrress" ? "tt" : "ff"} >
                        <Form.Label>  address :</Form.Label>
                        <Form.Control className='input6' type="adrress" aria-label="With textarea"
                            placeholder='write here '
                        />
                    </div>
                    <div className={props.type == "gmail" ? "tt" : "ff"} >
                        <Form.Label> gmail :</Form.Label>
                        <Form.Control className='input6' type="gmail " aria-label="With textarea"
                            placeholder='write here '
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className='addToCart' onClick={handleClose}>Save Change</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AccountModel;