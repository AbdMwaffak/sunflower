import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { Form } from 'react-bootstrap';
import { deleteArticelById } from '../../RTK/arcticles/deleteArticelByIdSlice';
import { useTranslation } from 'react-i18next';

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
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <div className={props.openMenu ? "DMOpen" : "DMClose"} onClick={handleShow}  >   {t('perfume.deleteElement')} </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title> {t('public.deleteItem')}</Modal.Title>
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
                <Modal.Footer id='modal-footer'>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('public.close')}
                    </Button>
                    <button className='deleteButten' onClick={handleDelete}> {t('public.delete')}</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeletePerfumeSizeModel;