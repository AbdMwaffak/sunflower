import React, { useEffect, useState } from 'react';

const UseMouse = () => {
    const [mousePosition, setMousePosition] = useState({
        x: null,
        y: null,
    })

    const handle = (e) => {
        setMousePosition({
            x: e.pageX,
            y: e.pageY
        })
    }
    useEffect(() => {
        window.addEventListener('mousemove', handle)
        return () => window.addEventListener('mousemove', handle)
    }, [])
    return mousePosition;
}

export default UseMouse;
