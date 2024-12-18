import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './logoutModel.css'
import Cookies from 'universal-cookie';

function LogoutModel() {
    const cookies = new Cookies();
    ////////////////////////
    const [show, setShow] = useState(false);
    ////////////////////////
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    ////////////////////////
    const handleLogout = () => {
        setShow(false);
        cookies.remove('adminToken')
        window.location.pathname = '/'
    }
    return (
        <>
            <div className='loginOut'>

                <div className='login' onClick={handleShow} >
                    Logout
                </div>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='md'
            >
                <Modal.Header closeButton>
                    <Modal.Title> LOGOUT </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    Are you sure you want to log out?
                </Modal.Body>
                <Modal.Footer>
                    <button className='logoutBT' onClick={handleLogout}>logout</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default LogoutModel;