import React, { useState } from 'react'

const Fms = (props) => {
    const [sms, setSms] = useState(false)
    return (
        <>
            {props?.message !== "" &&
                <div className='cn'>
                    message
                    <div onClick={() => setSms(true)}>
                        <svg className='mss'
                            xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 26 26" ><path fill="currentColor" d="M23 4H3C1.3 4 0 5.3 0 7v12c0 1.7 1.3 3 3 3h20c1.7 0 3-1.3 3-3V7c0-1.7-1.3-3-3-3m.8 15.4L16 13.8l-3 2l-3.1-2l-7.7 5.6l6.3-6.5l-7.7-6L13 13.5L25.1 7l-7.6 6z"></path></svg>
                    </div>
                </div>}
            {sms &&
                <div className='mass1' onClick={() => setSms(false)}>
                    <div className='mass2'>
                        {props?.message}
                    </div>
                </div >
            }
        </>
    )
}

export default Fms
