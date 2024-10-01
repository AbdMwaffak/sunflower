import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../../RTK/shoppingCart/emptyCartSlice';

function AllowAddition2(props) {
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
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>DELETE MESSAGE</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='modelBody' style={{ textAlign: "center" }}>
                        <h5
                            style={{ width: '100%', textAlign: "center", color: "red" }}>
                            Sorry
                        </h5>
                        The perfume cannot be added because there are bouquet in your cart <br />
                        You can finish the previous request and continue later <br />
                        Or you can empty the basket and try again
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='send' onClick={handelClearMyCart}>
                        Clean My Cart</button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AllowAddition2;