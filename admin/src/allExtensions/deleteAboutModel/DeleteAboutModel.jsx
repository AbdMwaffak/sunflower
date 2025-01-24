import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteaboutById } from '../../RTK/about/deleteaboutByIdSlice';
import { useTranslation } from 'react-i18next';

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
    ///////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className={props.openMenu ? "DMOpen" : "DMClose"} onClick={handleShow}  > {t('about.deleteElement')} </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{t('public.deleteItem')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='delelteBody'>
                        {t('about.message1')}?
                    </div>
                </Modal.Body>
                <Modal.Footer id='modal-footer'>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('public.close')}
                    </Button>
                    <button className='deleteButten' onClick={handleDelete}>{t('public.delete')}</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteAboutModel;