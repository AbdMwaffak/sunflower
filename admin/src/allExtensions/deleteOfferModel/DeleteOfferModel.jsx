import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteaboutById } from '../../RTK/about/deleteaboutByIdSlice';
import { useTranslation } from 'react-i18next';
import { deleteOfferById } from '../../RTK/offers/deleteOfferByIdSlice';

function DeleteOfferModel(props) {
    const [show, setShow] = useState(false);
    const [problem, setProblem] = useState('');
    const dispatch = useDispatch()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = () => {
        dispatch(deleteOfferById(props.id))
        props.handelReload()
        setShow(false);
    }
    ///////////////////////////
    // const handleDelete = (event) => {
    //     dispatch(deleteOfferById(id))
    // }
    ///////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            {/* <div type='submit' className='formButton' onClick={handleDelete}> {t('public.delete')}  </div> */}
            <div className="formButton" style={{ width: "100%", margin: "0px" }} onClick={handleShow}  > {t('public.delete')} </div>
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
                        {t('editOffer.message2')}
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

export default DeleteOfferModel;