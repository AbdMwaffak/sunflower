import React from 'react';
import logo from '../../image/logo.png';
import './post.css'
import { useDispatch } from 'react-redux';
import Api from '../API';
import { likeArticle } from '../../RTK/arcticles/likeArticleSlice';

const Post = (props) => {
    ////////////////////////
    let imageType = props?.image?.type?.split("/")
    ////////////////////////
    const dispatch = useDispatch()
    ////////////////////////
    const handelLike = (e) => {
        dispatch(likeArticle(props.id))
        props.reloadHandel()
        props.reloadHandel()
    }
    ////////////////////////
    const handelShare = (e) => {

    }
    return (
        <div className='post'>
            <div className='postHader'>
                <div className='postLogo'>
                    <img className='imgLogo' src={logo} />
                </div>
                <div className='date'>
                    {props.date.split("T")[0]}
                </div>
            </div>
            <hr />
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
            <hr />
            <div className='postTail'
            // onClick={() => handelShare()}
            >
                <button className='postShare'>
                    <svg className='shareIcon' xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" ><g fill="none" stroke="currentColor" strokeWidth={1.5}><path d="M9 12a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"></path><path strokeLinecap="round" d="M14 6.5L9 10m5 7.5L9 14"></path><path d="M19 18.5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Zm0-13a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"></path></g></svg>
                    {props.share}
                </button>
                <button className='postFavoret' onClick={() => handelLike()}>
                    <svg className='favoretIcon'
                        xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 20 20" ><path fill="currentColor" fillRule="evenodd" d="M5.618 4.618C4.185 4.966 3 6.07 3 7.996c0 2.564 2.169 5.073 7 7.448c4.831-2.375 7-4.884 7-7.448c0-1.925-1.185-3.03-2.618-3.378c-1.471-.358-3.122.103-3.979 1.27a.5.5 0 0 1-.806 0C8.74 4.721 7.089 4.26 5.618 4.618m4.382.21C8.81 3.635 6.968 3.26 5.382 3.645C3.565 4.088 2 5.546 2 7.996c0 3.24 2.766 6.032 7.783 8.454a.5.5 0 0 0 .434 0C15.234 14.028 18 11.237 18 7.996c0-2.45-1.565-3.908-3.382-4.35c-1.586-.385-3.427-.01-4.618 1.181" clipRule="evenodd"></path></svg>
                    {props.like}
                </button>
            </div>
        </div >
    );
}
export default Post;
