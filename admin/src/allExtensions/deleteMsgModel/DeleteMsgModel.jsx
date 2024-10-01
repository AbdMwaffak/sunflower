import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../RTK/message/deleteMessageSlice';

function DeleteMsgModel(props) {
    const [show, setShow] = useState(false);
    const [problem, setProblem] = useState('');
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        dispatch(deleteMessage(props.id))
        props.handelReload()
        setShow(false);
    }
    return (
        <>
            <div className={props.openMenu ? "DMOpen" : "DMClose"} onClick={handleShow}  >  delete message </div>

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
                    <div className='delelteBody'>
                        Are you sure you want to delete this message?
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className='send' onClick={handleDelete}>delete</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteMsgModel;