import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteMessage } from '../../RTK/message/deleteMessageSlice';
import { replyMessage } from '../../RTK/message/replyMessageSlice';
import { useTranslation } from 'react-i18next';

function ReplyToMsgModel(props) {
    const [show, setShow] = useState(false);
    const [reply, setReply] = useState('');
    const [validated, setValidated] = useState(false);
    const dispatch = useDispatch()


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // const handleReply = () => {
    //     dispatch(deleteMessage(props.id))
    //     setShow(false);
    // }
    ////////////////// 

    const handleReply = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        // event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            const reqobj = {
                id: props.id,
                value: { reply }
            }
            dispatch(replyMessage(reqobj))
            props.handelReload()
            setShow(false);
        }
    };
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className={props.openMenu ? "DMOpen" : "DMClose"} onClick={handleShow}  >  {t('messages.replyMessage')}</div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('messages.replyMessage')}</Modal.Title>
                </Modal.Header>
                <Form noValidate validated={validated} onSubmit={handleReply} className=''>
                    <Modal.Body>
                        <Form.Group className="mb-3" controlId="validationCustom02">
                            <Form.Label>{t('messages.addReply')}</Form.Label>

                            <Form.Control
                                className='textarea1'
                                as="textarea"
                                type="text"
                                placeholder="write reply here "
                                required
                                onChange={(e) => setReply(e.target.value)}
                            />

                        </Form.Group>
                        <hr />

                    </Modal.Body>
                    <Modal.Footer id='modal-footer'>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <button type="send" className='send'>{t('messages.reply')}</button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}

export default ReplyToMsgModel;