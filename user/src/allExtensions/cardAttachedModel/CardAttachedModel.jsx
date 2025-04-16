import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function CardAttachedModel(props) {
    const [show, setShow] = useState(false);
    const [card, setCard] = useState('');
    const [validated, setValidated] = useState(false);
    // const [problem, setProblem] = useState('');
    // const [cardch, setCardch] = useState("true");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ////////////////////////////////////

    const handleAdd = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        e.stopPropagation();
        if (form.checkValidity() === false) {
            setValidated(true);
        }
        else {
            setShow(false);
            props?.handeladdToCartMoney(card)
        }
    }
    ////////////////////////////////////
    const handleAddNoCard = () => {
        setShow(false);
        props?.handeladdToCartMoney()
    }
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <div className='formButton5' onClick={handleShow} > {t("product.addtoCart(by money)")}  </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> CARD ATTACHED</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modelBody'>

                        <Form className='input2' noValidate validated={validated} onSubmit={handleAdd}>
                            <div className='inputCard'>{t('flower.attachCard2')} </div>
                            <div className='input5'>
                                <Form.Group className="mb-3" controlId="form1">
                                    <Form.Control className='input6' as="textarea" aria-label="With textarea"
                                        onChange={(e) => setCard(e.target.value)}
                                        placeholder={t('public.write')}
                                        required
                                    />
                                </Form.Group>
                            </div>
                            <button type="submit" className='loginBT'  >
                                {t("product.yes")}
                            </button>
                        </Form>

                    </div>
                </Modal.Body >
                <Modal.Footer id='modal-footer'>
                    {/* <Button className='meButton' onClick={handleAdd}>
                        {t("product.yes")}
                    </Button> */}
                    <button className='loginBT' onClick={handleAddNoCard}>
                        {t("product.no")}
                    </button>
                    {/* <button className='send' onClick={handleClose}>send</button> */}
                </Modal.Footer>
            </Modal >
        </>
    );
}
export default CardAttachedModel; 