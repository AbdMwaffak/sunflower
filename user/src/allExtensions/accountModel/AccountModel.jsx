import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function AccountModel(props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ////////////////////////////////////

    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <button className='editInfo'  >
                <svg onClick={handleShow} className='svgEdit' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 24 24" ><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.946 3.173c.587-.587.88-.88 1.206-1.021c.469-.203 1-.203 1.469 0c.325.14.619.434 1.206 1.021s.88.881 1.021 1.206c.203.469.203 1 0 1.469c-.14.325-.434.619-1.021 1.206l-5.022 5.022c-1.237 1.237-1.855 1.855-2.63 2.222s-1.646.452-3.387.624L9 15l.078-.788c.172-1.741.257-2.612.624-3.387s.985-1.393 2.222-2.63zM6 15H3.75a1.75 1.75 0 1 0 0 3.5h9.5a1.75 1.75 0 1 1 0 3.5H11" color="currentColor"></path></svg>
            </button >
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>EDIT MY ACCOUNT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={props.type == "name" ? "tt" : "ff"} >
                        <Form.Label>  {t('me.name')} :</Form.Label>
                        <Form.Control className='input6' type="text" aria-label="With textarea"
                            placeholder={t('public.write')}
                        />
                    </div>
                    <div className={props.type == "phone" ? "tt" : "ff"} >
                        <Form.Label>  {t('me.phone')} :</Form.Label>
                        <Form.Control className='input6' type="number" aria-label="With textarea"
                            placeholder={t('public.write')}
                        />
                    </div>
                    <div className={props.type == "gender" ? "tt" : "ff"} >
                        <Form.Label>  {t('me.gender')} :</Form.Label>
                        <Form.Control className='input6' type="text" aria-label="With textarea"
                            placeholder={t('public.write')}
                        />
                    </div>
                    <div className={props.type == "passWord" ? "tt" : "ff"} >
                        <Form.Label>  {t('me.oldPassword')} :</Form.Label>
                        <Form.Control className='input6' type="password" aria-label="With textarea"
                            placeholder={t('public.write')}
                        />
                        <Form.Label> {t('me.newPassword')}  :</Form.Label>
                        <Form.Control className='input6' type="password" aria-label="With textarea"
                            placeholder={t('public.write')}
                        />
                    </div>
                    <div className={props.type == "birth" ? "tt" : "ff"} >
                        <Form.Label>  {t('me.birth')} :</Form.Label>
                        <Form.Control className='input6' type="date" aria-label="With textarea"
                            placeholder={t('public.write')}
                        />
                    </div>
                    <div className={props.type == "adrress" ? "tt" : "ff"} >
                        <Form.Label>  {t('me.adrress')} :</Form.Label>
                        <Form.Control className='input6' type="adrress" aria-label="With textarea"
                            placeholder={t('public.write')}
                        />
                    </div>
                    <div className={props.type == "gmail" ? "tt" : "ff"} >
                        <Form.Label> {t('me.email')} :</Form.Label>
                        <Form.Control className='input6' type="gmail " aria-label="With textarea"
                            placeholder={t('public.write')}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer id='modal-footer'>
                    {/* <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button> */}
                    <button className='meButton' onClick={handleClose}>{t('me.save')} </button>
                </Modal.Footer >
            </Modal>
        </>
    );
}
export default AccountModel;