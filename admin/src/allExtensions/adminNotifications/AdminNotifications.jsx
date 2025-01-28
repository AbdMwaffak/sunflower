import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import './adminNotifications.css';

const AdminNotifications = (props) => {
  const [eng, seteng] = useState(false);
  //////////////////////////
  const cookies = new Cookies();
  const lng = cookies.get('i18next') || 'en';
  //////////////////////////
  const [notifications, setNotifications] = useState([]);
  ////////////////////////////////////
  const { t } = useTranslation();
  let message = t('public.messageOrder');
  let close = t('public.close');
  useEffect(() => {
    const eventSource = new EventSource(`/sse?role=admin`); // Connect to SSE endpoint
    //////////////////////
    // Listen for new order events
    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);
      if (eventData.type === 'NEW_ORDER') {
        setNotifications((prev) => [...prev, eventData.data]); // Add new order to notifications
        toast.custom(
          (t) => (
            <div
              className={`toast${
                t.visible ? 'animate-enter' : 'animate-leave'
              } nn`}
            >
              <div className='nn2'>
                <div className='nnImg'>
                  <img
                    className='imageCat'
                    src={`/users/${eventData.data?.user?.image}`}
                    alt=''
                  />
                </div>
                <div className='nnMessage'>
                  <div>
                    {' '}
                    {message} {eventData?.data.user?.username}
                  </div>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={20}
                      height={20}
                      viewBox='0 0 28 28'
                    >
                      <path
                        fill='currentColor'
                        d='M7 4.75A2.75 2.75 0 0 1 9.75 2h8.5A2.75 2.75 0 0 1 21 4.75v8.266a7.6 7.6 0 0 0-1.5.05V4.75c0-.69-.56-1.25-1.25-1.25h-8.5c-.69 0-1.25.56-1.25 1.25v18.5c0 .69.56 1.25 1.25 1.25h3.77l-.44 1.5H9.75A2.75 2.75 0 0 1 7 23.25zM27 20.5a6.5 6.5 0 0 1-9.647 5.688l-2.717.791a.5.5 0 0 1-.62-.62l.795-2.713a6.5 6.5 0 1 1 12.19-3.146M18 19a.5.5 0 0 0 0 1h5a.5.5 0 1 0 0-1zm-.5 2.5a.5.5 0 0 0 .5.5h2.5a.5.5 0 1 0 0-1H18a.5.5 0 0 0-.5.5'
                      ></path>
                    </svg>
                    {eventData.data.user?.phone}
                  </div>
                </div>
              </div>
              <div className='toast-close'>
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className='close-button'
                >
                  {close}
                </button>
              </div>
            </div>
          ),
          { position: 'bottom-right' }
        );
      }
    };
    //////////////////////
    // Handle SSE errors
    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      eventSource.close();
    };
    //////////////////////
    // Cleanup on component unmount
    return () => {
      eventSource.close();
    };
  }, []);
  //////////////////////
  // const toost = () => {
  //     toast.custom(((t) => (
  //         <div className={`toast${t.visible ? 'animate-enter' : 'animate-leave'} nn`} >
  //             <div className="nn2">
  //                 <div className="nnImg">
  //                     <img
  //                         className="imageCat"
  //                         src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
  //                         alt=""
  //                     />
  //                 </div>
  //                 <div className="nnMessage">
  //                     <div> message from murad </div>
  //                     <div>
  //                         <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 28 28"><path fill="currentColor" d="M7 4.75A2.75 2.75 0 0 1 9.75 2h8.5A2.75 2.75 0 0 1 21 4.75v8.266a7.6 7.6 0 0 0-1.5.05V4.75c0-.69-.56-1.25-1.25-1.25h-8.5c-.69 0-1.25.56-1.25 1.25v18.5c0 .69.56 1.25 1.25 1.25h3.77l-.44 1.5H9.75A2.75 2.75 0 0 1 7 23.25zM27 20.5a6.5 6.5 0 0 1-9.647 5.688l-2.717.791a.5.5 0 0 1-.62-.62l.795-2.713a6.5 6.5 0 1 1 12.19-3.146M18 19a.5.5 0 0 0 0 1h5a.5.5 0 1 0 0-1zm-.5 2.5a.5.5 0 0 0 .5.5h2.5a.5.5 0 1 0 0-1H18a.5.5 0 0 0-.5.5"></path></svg>
  //                         0946991028
  //                     </div>
  //                 </div>
  //             </div>
  //             <div className="toast-close">
  //                 <button onClick={() => toast.dismiss(t.id)} className="close-button">
  //                     {close}
  //                 </button>
  //             </div>
  //         </div>
  //     )), { position: "bottom-right" }
  //     )
  // }
  //////////////////////
  return (
    <div
      className={
        props.notificationsListButton
          ? 'notificationsLestT'
          : 'notificationsLestF'
      }
      onClick={() => seteng(!eng)}
      ref={props?.notRef}
      style={{ left: lng == 'ar' ? '0px' : '-166px' }}
    >
      {props?.notHandler(notifications.length)}
      {notifications.length > 0 ? (
        <>
          {notifications
            ?.slice()
            .reverse()
            .map((order, index) => (
              <Link
                to={'/Orders'}
                className='linkDL newOrder'
                key={index}
                onClick={() => props.notificationsListButtonHandler(false)}
              >
                <div>{t('public.newOrder')}</div>
                <div>{`"${order.user?.username}"`}</div>
              </Link>
            ))}
        </>
      ) : (
        <>{t('public.noOrder')}</>
      )}
      {/* <Button onClick={toost}>
                toost
            </Button> */}
    </div>
  );
};

export default AdminNotifications;
