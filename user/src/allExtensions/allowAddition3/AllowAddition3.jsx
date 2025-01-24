import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../../RTK/shoppingCart/emptyCartSlice';
import { useTranslation } from 'react-i18next';

function AllowAddition3(props) {
    ////////////////////////
    const [show, setShow] = useState(true);
    const [problem, setProblem] = useState('');
    const dispatch = useDispatch()

    const handleClose = () => (setShow(false), props.handleClose())
    const handleShow = () => setShow(true);
    ////////////////////////
    const handelClearMyCart = () => {
        dispatch(emptyCart())
        props?.handelReload()
        setShow(false)
    }
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>PRODUCT MESSAGE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modelBody' style={{ textAlign: "center" }}>
                        <h5
                            style={{ width: '100%', textAlign: "center", color: "red" }}>
                            {t('product.message00')}
                        </h5>     {t('product.message11')}<br />
                        {t('product.message22')}
                    </div>
                </Modal.Body>
                <Modal.Footer id='modal-footer'>
                    <button className='send' onClick={handelClearMyCart}>
                        {t('product.clean')} </button>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('public.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AllowAddition3;