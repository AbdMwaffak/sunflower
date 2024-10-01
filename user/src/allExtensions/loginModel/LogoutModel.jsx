import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import './loginModel.css'
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
        cookies.remove('dealerId')
        cookies.remove('token')
        window.location.pathname = '/'
    }
    return (
        <>
            <div className='login' onClick={handleShow} >
                Logout
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