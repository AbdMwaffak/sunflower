import React, { useState } from 'react';
import './favoriteButton.css'

const FavoriteButton = (props) => {
    const [active, setActive] = useState(false)
    return (
        <div className='stage'>
            <div className={props?.isFavorite ? "heartFavIsActive" : "heartFav"}
            ></div>
        </div>

    );
}
export default FavoriteButton;
