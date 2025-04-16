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
            <div className='pName'>     {props?.name}</div>
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
                <div className='title2' >
                    <div className='pDate'>   {props.price} .{t('public.sar')} </div>
                    <div className='pDate'> {props?.createdAt?.split("T")[0]}</div>
                </div>
            </div>
            <div className='cardDescription' >
                {props?.description}
            </div>

            <div className='bouquetTail'>
                <div className='deleteButten1'
                    onClick={handelDeleteProduct}     >
                    {t("public.delete")}</div>
            </div>
        </div >
    );
}

export default ProductCard;
