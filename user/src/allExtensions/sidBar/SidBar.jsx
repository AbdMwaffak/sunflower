
import './sidBar.css';
import { Link } from 'react-router-dom';

function SidBar(props) {

    return (
        <div>
            <div className={props.sidBarButton ? 'sid-active' : 'sid-unactive'}>
                <div className='haderSB'>
                    <div className='close' onClick={() => props.sidBarButtonHandler(false)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24" ><path fill="currentColor" d="m8.4 16.308l3.6-3.6l3.6 3.6l.708-.708l-3.6-3.6l3.6-3.6l-.708-.708l-3.6 3.6l-3.6-3.6l-.708.708l3.6 3.6l-3.6 3.6zM12.003 21q-1.866 0-3.51-.708q-1.643-.709-2.859-1.924t-1.925-2.856T3 12.003t.709-3.51Q4.417 6.85 5.63 5.634t2.857-1.925T11.997 3t3.51.709q1.643.708 2.859 1.922t1.925 2.857t.709 3.509t-.708 3.51t-1.924 2.859t-2.856 1.925t-3.509.709M12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"></path></svg>
                    </div>
                </div>
                <div className='bodySB'>
                    <div className='divButton'>
                        <Link to={'/'} className='linkSB' >
                            Home
                        </Link>
                    </div>
                    <div className='divButton'>
                        <Link to={'/Articles'} className='linkSB' >
                            Articles
                        </Link>
                    </div>
                    {/* /////////// */}
                    <div className='divButton'>
                        <Link to={'/AboutTheStore'} className='linkSB' >
                            About the store
                        </Link>
                    </div>
                    {/* /////////// */}
                    <div className='divButton'>
                        <Link to={'/ContactUs'} className='linkSB' >
                            Contact us
                        </Link>
                    </div>
                    {/* /////////// */}
                    <div className='divButton'>
                        <Link to={'/StoreMessages'} className='linkSB' >
                            Store messages
                        </Link>
                    </div>
                    {/* /////////// */}

                </div>


                {/* </div> */}

                {/* <span onClick={flButtonnHandler} className='flButtonn'>
                    filter
                </span> */}
            </div>

        </div>
    );
}

export default SidBar;
