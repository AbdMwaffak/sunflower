import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../../RTK/Auth/getMeSlice';

function AllowPoint(props) {
    const me = useSelector(state => state.getMe)?.data
    ////////////////////////
    const [show, setShow] = useState(false);
    const [problem, setProblem] = useState('');
    const dispatch = useDispatch()
    const handleClose = () => (setShow(false), props.handleClose())
    const handleShow = () => setShow(true);
    ////////////////////////
    useEffect(() => {
        dispatch(getMe())
    }, [dispatch])

    useEffect(() => {
        if (me?.points <= props.productPoint)
            handleShow()
    }, [dispatch, props?.productPoint])

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
                        {me?.points != 0 && me?.points << props.productPoint &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                The product value is greater than your points balance
                            </div>}
                        {me?.points == 0 &&
                            <div style={{ width: '100%', textAlign: "center" }}>
                                You don't have loyalty points yet
                            </div>}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
export default AllowPoint;