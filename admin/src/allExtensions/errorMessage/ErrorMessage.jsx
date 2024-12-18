import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function ErrorMessage(props) {

    const [show, setShow] = useState(true);
    const [problem, setProblem] = useState('');
    ////////////////////////
    const handleClose = () => (setShow(false), props.handleClose())
    const handleShow = () => setShow(true);
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props?.messageTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className='modelBody' style={{ textAlign: "center" }}>
                        <h5
                            style={{ width: '100%', textAlign: "center", color: "red" }}>
                            {t('public.sorry')}
                        </h5>
                        <b>
                            {props?.message} {" "}
                            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 36 36"><path fill="#ffcc4d" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={11.5} cy={16.5} fill="#664500" rx={2.5} ry={3.5}></ellipse><ellipse cx={24.5} cy={16.5} fill="#664500" rx={2.5} ry={3.5}></ellipse><path fill="#664500" d="M12 28c2-5 13-5 13-3c0 1-8-1-13 3"></path></svg>

                        </b>
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        {t('public.close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ErrorMessage;