import { useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTranslation } from 'react-i18next';

function InfoModel(props) {
    const [show, setShow] = useState(false);
    const [problem, setProblem] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <>
            <div className={props.openMenu ? "returnOpen" : "returnClose"} onClick={handleShow} > {t("orders.more")}  </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>ORDER INFORMATION</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modelBody'>

                        <div className='kk'> <div>   {t('cart.RecipientName')} {" "} : </div>  {"  "} {props?.name}</div>
                        <div className='kk'> <div>   {t('cart.RecipientPhone')} {" "} : </div>  {"  "} {props?.phone}</div>
                        <div className='kk'> <div>     {t('cart.city')} {" "} : </div>  {"  "} {props?.city}</div>
                        <div className='kk'> <div>      {t('cart.adressDetails')}{" "} : </div>  {"  "} {props?.addressDetails}</div>
                        <div className='kk'> <div>      {t('cart.notes')} {" "} : </div>  {"  "} {props?.notes}</div>
                        <div className='kk'> <div>  {t('orders.status')} {" "} : </div>  {"  "} {props?.orderStatus == "processing" && <> {t("orders.processing")} </>} {props?.orderStatus == "delivered" && <> {t("orders.delivered")} </>} </div>
                        {/* <div className='kk'> <div>  {t('cart.totalMoneyCost')} {" "} : </div>  {"  "} {props?.isPaid}</div> */}
                        {/* <div className='kk'> <div>  {t('cart.totalMoneyCost')} {" "} : </div>  {"  "} {props?.paymentMethod}</div> */}
                        <div className='kk'> <div>  {t('cart.totalMoneyCost')} {" "} : </div>  {"  "} {props?.totalMoneyCost}.{t('public.sar')}</div>
                        <div className='kk'> <div>  {t('cart.totalPointsCost')}   {" "} : </div> {"  "} {props?.totalPointsCost}.{t('public.point')} </div>
                        <div className='kk'> <div>  {t('cart.totalPointsEarned')} {" "} :  </div> {"  "}{props?.totalPointsEarned}.{t('public.point')}  </div>
                        <div className='kk'> <div>  id {" "} :  </div> {"  "}{props?.id} </div>

                        {/* Create a return request
                        <div className='input5'>
                            <Form.Control className='input6' as="textarea" aria-label="With textarea"
                                onChange={(e) => setProblem(e.target.value)}
                                placeholder='Write the problem here'
                            />
                        </div>
                        <div className='ImageAttached'>
                            Image attached
                        </div> */}
                    </div>
                </Modal.Body>
                <Modal.Footer id='modal-footer'>
                    <Button variant="secondary" onClick={handleClose}>
                        {t("public.close")}
                    </Button>
                    {/* <button className='send' onClick={handleClose}>send</button> */}
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default InfoModel;