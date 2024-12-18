import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function DeleteBouquetModel(props) {
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState('');
    /////////////////////////////
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    /////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>

            <button className='deleteButten1'
                onClick={handleShow}

            >
                {t('public.delete')}
            </button>

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
                    <div
                    >
                        <Form.Label> {t('flower.message1')} </Form.Label>
                        <Form.Control className='input6' type="text" aria-label="With textarea"
                            onChange={(e) => setPass(e.target.value)}
                            placeholder='write here '
                        />
                    </div>




                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('public.close')}
                    </Button>
                    <button className='deleteButten'
                        onClick={(e) => (props.delete(pass), handleClose)}
                    >{t('public.delete')} </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteBouquetModel;