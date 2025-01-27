import { useDispatch } from 'react-redux';
import './productCard.css'
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { deleteProductById } from '../../RTK/product/deleteProductByIdSlice';

const ProductCard = (props) => {
    const dispatch = useDispatch()
    ////////////////////////////////////
    const handelDeleteProduct = (event) => {
        dispatch(deleteProductById(props.id))
        props.handelReload()
    }
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <div className='productCard'>
            <div className='imageCard'>
                <Link to={`/EditProduct/${props.id}`}>
                    {/* <img className='image-Card' src={props.image} onClick={handelgo} /> */}
                    <img className='image-Card' src={props.image} />
                </Link>
                <div className='imgNum'>
                    1/{props?.imageNum}
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
            <hr className='phr' />
            <div className='bouquetTail'>
                <div className='deleteButten1'
                    onClick={handelDeleteProduct}     >
                    {t("public.delete")}</div>
            </div>
        </div >
    );
}

export default ProductCard;
