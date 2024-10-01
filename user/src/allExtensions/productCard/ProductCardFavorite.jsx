import { useDispatch } from 'react-redux';
import './productCard.css'
import { useNavigate } from 'react-router-dom';
import { removeFromFavorite } from '../../RTK/favorite/removeFromFavoriteSlice';

const ProductCardFavorite = (props) => {
    const navigate = useNavigate();
    const handelgo = () => {
        navigate(`/product/${props.name}`, { state: { id: props.id } })
    }
    //////////////////////////////
    const dispatch = useDispatch()
    //////////////////////////////
    const hanleRemoveToFavorite = () => {
        dispatch(removeFromFavorite({ productId: props.id }))
        props.handleReload()
    }
    return (
        <div className='productCard'>
            <div className='imageCard'>
                <img className='image-Card' src={props.image} onClick={handelgo} />
                <div className='imgNum'>
                    1/4
                </div>
                <div className='producButten'>
                    <div className='share' >
                        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M9 12a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"></path><path strokeLinecap="round" d="M14 6.5L9 10m5 7.5L9 14"></path><path d="M19 18.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm0-13a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"></path></g></svg>
                    </div>
                    <div className='favoret' onClick={hanleRemoveToFavorite}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 20 20" ><g fill="currentColor"><path fillRule="evenodd" d="M11 6.722c1.69-3.023 7.5-1.968 7.5 2.4q0 4.377-7.5 7.993Q3.5 13.5 3.5 9.122c0-4.368 5.81-5.423 7.5-2.4" clipRule="evenodd" opacity={0.2}></path><path fillRule="evenodd" d="M5.618 4.618C4.185 4.966 3 6.07 3 7.996c0 2.564 2.169 5.073 7 7.448c4.831-2.375 7-4.884 7-7.448c0-1.925-1.185-3.03-2.618-3.378c-1.471-.358-3.122.103-3.979 1.27a.5.5 0 0 1-.806 0C8.74 4.721 7.089 4.26 5.618 4.618m4.382.21C8.81 3.635 6.968 3.26 5.382 3.645C3.565 4.088 2 5.546 2 7.996c0 3.24 2.766 6.032 7.783 8.454a.5.5 0 0 0 .434 0C15.234 14.028 18 11.237 18 7.996c0-2.45-1.565-3.908-3.382-4.35c-1.586-.385-3.427-.01-4.618 1.181" clipRule="evenodd"></path><path d="M1.15 1.878a.514.514 0 0 1 .728-.727l16.971 16.971a.514.514 0 0 1-.727.727z"></path></g></svg>
                    </div>
                </div>
            </div>
            <div className='productTitle'>
                <div className='pName'>     {props?.name}</div>
                <div className='title2' >
                    <div className='pDate'>   {props.price} .SAR </div>
                    <div className='pDate'> {props?.createdAt?.split("T")[0]}</div>
                </div>
            </div>
            <hr className='phr' />
            <div className='sizesCard'>
                {props?.sizes?.map((size, index) => (
                    <div
                        className='sizeCard'
                        key={index}
                        id={size._id}
                    >
                        <div>   {size.size} </div>
                    </div>
                ))}
            </div>
            <hr className='phr' />
            <div className='colorsCard'>
                {props?.colors?.map((color, index) => (
                    <div
                        className='colorCard'
                        key={index}
                        id={color._id}
                        style={{ backgroundColor: color }}
                    >
                    </div>
                ))}
            </div>
        </div>
    );
}
export default ProductCardFavorite;
