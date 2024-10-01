import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteaboutById } from '../../RTK/about/deleteaboutByIdSlice';

function DeleteAboutModel(props) {
    const [show, setShow] = useState(false);
    const [problem, setProblem] = useState('');
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        dispatch(deleteaboutById(props.id))
        props.handelReload()
        setShow(false);
    }
    return (
        <>
            <div className={props.openMenu ? "DMOpen" : "DMClose"} onClick={handleShow}  >  delete element </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>DELETE ELEMENT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='delelteBody'>
                        Are you sure you want to delete this post?
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

export default DeleteAboutModel;