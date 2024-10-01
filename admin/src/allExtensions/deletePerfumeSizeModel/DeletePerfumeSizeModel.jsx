import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { deleteArticelById } from '../../RTK/arcticles/deleteArticelByIdSlice';

function DeletePerfumeSizeModel(props) {
    const [pass, setPass] = useState(false);
    const [show, setShow] = useState(false);
    const [problem, setProblem] = useState('');
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        const value = {
            id: props.id,
            pass: pass
        }
        dispatch(deleteArticelById(value))
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
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                    >
                        <Form.Label>  If you are sure to delete this item, enter the password :</Form.Label>
                        <Form.Control className='input6' type="text" aria-label="With textarea"
                            onChange={(e) => setPass(e.target.value)}
                            placeholder='write here '
                        />
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

export default DeletePerfumeSizeModel;