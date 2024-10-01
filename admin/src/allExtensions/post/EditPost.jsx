import React from 'react';
import logo from '../../images/logo.png';
import './post.css'
import { useDispatch } from 'react-redux';
import { deleteArticelById } from '../../RTK/arcticles/deleteArticelByIdSlice';
import { likeArticle } from '../../RTK/arcticles/likeArticleSlice';
import Api from '../API';
const EDitPost = (props) => {

    let imageType = props?.image?.type?.split("/")
    const dispatch = useDispatch()
    const handelDelete = (e) => {
        const value = {
            id: props.id,
            pass: e
        }
        dispatch(deleteArticelById(value))
        props.reloadHandel()
        props.reloadHandel()
    }

    const handelLike = (e) => {
        dispatch(likeArticle(props.id))
        props.reloadHandel()
        props.reloadHandel()
    }
    const handelShare = (e) => {
        console.log("share")
    }
    return (
        <div className='post'>
            <div className='postHader'>
                <div className='postLogo'>
                    <img className='imgLogo' src={logo} />
                </div>
                <div className='date'>
                    {props?.date?.split("T")[0]}
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
            <div className='postTail'  >
                <button className='postShare'>
                    <svg className='shareIcon' xmlns="http://www.w3.org/2000/svg" width="51.21" height="60.247" viewBox="0 0 51.21 60.247">
                        <path id="Path_2268" data-name="Path 2268" d="M34.536,12.041a10.065,10.065,0,1,1,2.9,7.049L23.477,28.6a10.042,10.042,0,0,1-.549,5.774L38.239,44.431a10.032,10.032,0,1,1-3.7,7.775,9.972,9.972,0,0,1,.87-4.084L20.219,38.144a10.039,10.039,0,1,1,1.269-13.807l13.533-9.214A9.993,9.993,0,0,1,34.536,12.041Z" transform="translate(-3.5 -2)" fill="#202126" fillRule="evenodd" />
                    </svg>
                    {props.share}
                </button>
                <button className='postFavoret' onClick={() => handelLike()}>
                    <svg className='favoretIcon' xmlns="http://www.w3.org/2000/svg" width="72.545" height="66.5" viewBox="0 0 72.545 66.5">
                        <g id="SVGRepo_iconCarrier" transform="translate(-3 -3.75)">
                            <path id="Path_2269" data-name="Path 2269" d="M39.245,9.178A21.837,21.837,0,0,0,3,25.352,21.459,21.459,0,0,0,8.449,39.7L39.273,70.25,69.184,40.6l.884-.932a21.413,21.413,0,0,0,5.477-14.321A21.837,21.837,0,0,0,39.3,9.178l-.028-.028Zm.028,8.071.221.194,3.438-3.408.358-.315A15.792,15.792,0,0,1,69.5,25.352a15.365,15.365,0,0,1-3.884,10.23l-.754.795L39.273,61.738,12.845,35.545a15.417,15.417,0,0,1-3.8-10.194,15.792,15.792,0,0,1,26.21-11.631l.358.315,3.438,3.408Z" transform="translate(0)" fill="#202126" fillRule="evenodd" />
                        </g>
                    </svg>
                    {props.like}
                </button>
            </div>
        </div >
    );
}

export default EDitPost;
