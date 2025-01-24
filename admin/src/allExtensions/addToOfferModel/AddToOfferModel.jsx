import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../RTK/message/deleteMessageSlice';

function AddToOfferModel(props) {
    const [show, setShow] = useState(false);
    const [problem, setProblem] = useState('');
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        dispatch(deleteMessage(props.id))
        setShow(false);
    }
    return (
        <>
            {/* <div className={props.openMenu ? "DMOpen" : "DMClose"} onClick={handleShow}  >  delete message </div> */}
            <button className='formButton' onClick={handleShow} > add Products</button>
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
                <Modal.Footer id='modal-footer'>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button className='deleteButten' onClick={handleDelete}>{t('public.delete')}</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddToOfferModel;