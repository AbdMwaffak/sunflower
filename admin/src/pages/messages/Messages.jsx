import React, { useEffect, useState } from 'react';
import './messages.css'
import Message from '../../allExtensions/message/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getAllMessage } from '../../RTK/message/getAllMessageSlice';
import { Toaster } from 'react-hot-toast';

const Messages = () => {
    const allMessage = useSelector(state => state.getAllMessage)?.data
    /////////////////////////////
    const [reload, setReload] = useState(true)
    /////////////////////////////
    const dispatch = useDispatch()
    /////////////////////////////
    const handelReload = () => {
        setTimeout(() => {
            setReload(!reload)
        }, 1000);

    }
    /////////////////////////////
    useEffect(() => {
        dispatch(getAllMessage())
    }, [dispatch, reload])
    /////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Messages`;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////

    return (
        <>
            <Toaster />
            <div className='messages'>
                <div className='messagesTitle'>
                    Messages
                </div>
                <div className='messagesContener'>
                    {allMessage?.length == 0 &&
                        <div className='noProducts' >
                            <b> you don't have any messages yet
                                <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 36 36" ><path fill="#ffcb4c" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={12.176} cy={14.71} fill="#65471b" rx={2.647} ry={3.706}></ellipse><circle cx={24.882} cy={14.294} r={6.882} fill="#f4f7f9"></circle><path fill="#65471b" d="M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694"></path><path fill="#292f33" d="M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36"></path><path fill="#67757f" d="M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824"></path><path fill="#65471b" d="M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007"></path><path fill="#bdddf4" d="M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z"></path></svg>
                                ! </b>
                            <br />
                            <b>
                                Wait for customer messages
                                <svg className='ms'
                                    xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 26 26" ><path fill="currentColor" d="M23 4H3C1.3 4 0 5.3 0 7v12c0 1.7 1.3 3 3 3h20c1.7 0 3-1.3 3-3V7c0-1.7-1.3-3-3-3m.8 15.4L16 13.8l-3 2l-3.1-2l-7.7 5.6l6.3-6.5l-7.7-6L13 13.5L25.1 7l-7.6 6z"></path></svg>
                                !
                            </b>
                        </div>}
                    {allMessage?.map((mess, index) => (
                        <Message
                            key={index}
                            id={mess?._id}
                            createdAt={mess?.createdAt}
                            message={mess?.message}
                            reply={mess?.reply}
                            userId={mess?.userId}
                            userDetails={mess?.userDetails}
                            handelReload={handelReload}
                        />

                    ))}
                </div>
            </div>
        </>
    );
}

export default Messages;
