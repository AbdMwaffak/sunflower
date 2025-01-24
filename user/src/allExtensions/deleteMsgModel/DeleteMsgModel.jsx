import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessage } from '../../RTK/message/deleteMessageSlice';
import { getMe } from '../../RTK/Auth/getMeSlice';
import { useTranslation } from 'react-i18next';

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
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <div className={props.openMenu ? "returnOpen" : "returnClose"} onClick={handleShow}  >  {t("messages.deleteMessage")} </div>
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
                            {t("messages.message11")} {" "}
                        </div>
                    }
                    {(me?.username != props?.name) &&
                        <>
                            <div className=''>    {t("messages.message22")}{" "} !! </div>
                            <div className=''>   {t("messages.message33")}{" "} !! </div>
                        </>}
                </Modal.Body>
                <Modal.Footer id='modal-footer'>
                    {(me?.username == props?.name) &&
                        <button className='send' onClick={handleDelete}>    {t("public.delete")}</button>}
                    <Button variant="secondary" onClick={handleClose}>
                        {t("public.close")}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default DeleteMsgModel;