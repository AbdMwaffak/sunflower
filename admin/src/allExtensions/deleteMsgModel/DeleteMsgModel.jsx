import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../RTK/message/deleteMessageSlice';
import { useTranslation } from 'react-i18next';

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
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className={props.openMenu ? "DMOpen" : "DMClose"} onClick={handleShow}  > {t('messages.deleteMessage')} </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>    {t('messages.deleteElement')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='delelteBody'>
                        {t('messages.message1')}?
                    </div>


                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('public.close')}
                    </Button>
                    <button className='deleteButten' onClick={handleDelete}> {t('public.delete')}</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteMsgModel;