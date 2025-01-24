import React, { useRef, useState } from 'react';
import logo from '../../images/logo.svg';
import './post.css'
import { useDispatch } from 'react-redux';
import Api from '../API';
import { Link } from 'react-router-dom';
import DeletePostModel from '../deletePostModel/DeletePostModel';
import { likeArticle } from '../../RTK/arcticles/likeArticleSlice';
import { useTranslation } from 'react-i18next';


const Post = (props) => {
    const [openMenu, setOpenMenu] = useState(false)
    ////////////////////////////////////
    let menuRef = useRef()
    ////////////////////
    const dispatch = useDispatch()
    ////////////////////////////////////
    const handelReload = () => {
        setTimeout(() => {
            props?.handelReload()
        }, 1000);

    }
    ////////////////////
    const handelLike = (e) => {
        dispatch(likeArticle(props.id))
        props.reloadHandel()
        props.reloadHandel()
    }
    ////////////////////
    // const handelShare = (e) => {
    // }
    ////////////////////////////////////
    const { t } = useTranslation();
    return (
        <div className='post'>
            <div className='postHader' dir='ltr'>
                <div className='menyMs'
                    ref={menuRef}>
                    <svg className='menuPo'
                        onClick={() => setOpenMenu(!openMenu)}
                        viewBox="0 0 24 24" height="24" width="24"
                        preserveAspectRatio="xMidYMid meet"
                        version="1.1" x="0px" y="0px" enableBackground="new 0 0 24 24">
                        <path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z">
                        </path></svg>
                    <div className={openMenu ? "menuOpenPo" : "menuClosePo"} >
                        <DeletePostModel
                            openMenu={openMenu}
                            handelReload={handelReload}
                            id={props?.id}
                        />
                    </div>
                </div>
                <div className='ttt2'>
                    <div className='postLogo'>
                        <img className='imgLogo' src={logo} />
                    </div>
                    <div className='date'>
                        {props.date.split("T")[0]}
                    </div>
                </div>
            </div>
            <hr className='tapp' />
            <div className='postBody'>
                <div className='text'>
                    {props.description}
                </div>
                <div className='media'>
                    <img className='imageCat' style={{ display: props.filetype != "video" ? "flex" : "none" }}
                        src={`${Api}/users/${props.image}`} />
                    <video style={{ display: props.filetype == "video" ? "flex" : "none" }}
                        src={`${Api}/videos/${props.image}`} width="100%" height="100%" controls>
                    </video>
                </div>
            </div>
            <hr className='tapp' />
            <div className='postTail'
            >
                <button className='postFavoret' >
                    <svg className='favoretIcon'
                        xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 20 20" ><path fill="currentColor" fillRule="evenodd" d="M5.618 4.618C4.185 4.966 3 6.07 3 7.996c0 2.564 2.169 5.073 7 7.448c4.831-2.375 7-4.884 7-7.448c0-1.925-1.185-3.03-2.618-3.378c-1.471-.358-3.122.103-3.979 1.27a.5.5 0 0 1-.806 0C8.74 4.721 7.089 4.26 5.618 4.618m4.382.21C8.81 3.635 6.968 3.26 5.382 3.645C3.565 4.088 2 5.546 2 7.996c0 3.24 2.766 6.032 7.783 8.454a.5.5 0 0 0 .434 0C15.234 14.028 18 11.237 18 7.996c0-2.45-1.565-3.908-3.382-4.35c-1.586-.385-3.427-.01-4.618 1.181" clipRule="evenodd"></path></svg>
                    {props.like}
                </button>
                <Link to={`/EditMyArticles/${props.id}`} className='editPostbutton'>
                    <button className='editeButten' >
                        {t('articles.edit')}
                    </button>
                </Link>
            </div>
        </div >
    );
}

export default Post;
