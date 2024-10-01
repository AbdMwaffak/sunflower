import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage } from '../../RTK/message/deleteMessageSlice';
import { getMe } from '../../RTK/Auth/getMeSlice';

function DeleteMsgModel(props) {
    const me = useSelector(state => state.getMe)?.data
    ////////////////////////
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ////////////////////////
    const handleDelete = () => {
        if (me.username == props.name) {
            dispatch(deleteMessage(props.id))
            setTimeout(() => {
                props.handelReload()
            }, 1000);
            setShow(false)
        }
    }
    //////////////////////
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    return (
        <>
            <div className={props.openMenu ? "returnOpen" : "returnClose"} onClick={handleShow}  > Delete Message  </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>DELETE MESSAGE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {(me?.username == props?.name) &&
                        <div className='modelBody'>
                            Are you sure you want to delete this message?
                        </div>
                    }
                    {(me?.username != props?.name) &&
                        <>
                            <div className=''> You can't delete this message !! </div>
                            <div className=''> You aren't the owner of this message !! </div>
                        </>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {(me?.username == props?.name) &&
                        <button className='send' onClick={handleDelete}>Delete</button>}
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default DeleteMsgModel;