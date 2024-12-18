import React, { useEffect, useState } from 'react';
import './myArticles.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../RTK/arcticles/getArticlesSlice ';
import { postArticle } from '../../RTK/arcticles/postArticleSlice';
import Post from '../../allExtensions/post/Post'
import SuccessfulMessage from '../../allExtensions/successfulMessage/SuccessfulMessage';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
const MyArticles = () => {
    const articels = useSelector(state => state.getArticles).data
    const addState = useSelector(state => state.postArticle)
    ////////////////////////////////////
    const [imageSquer, setImageSquer] = useState([]);
    const [image, setImage] = useState([]);
    const [imageType, setImageType] = useState([]);
    const [description, setDescription] = useState("")
    const [stateMessage, setStateMessage] = useState(false);
    const [validated, setValidated] = useState(false);
    const [reload, setReload] = useState(true);
    const dispatch = useDispatch()
    ////////////////////////////////////
    const imag2OnChange = (event) => {
        setImage(event.target.files[0])
        setImageSquer(URL.createObjectURL(event.target.files[0]))
        const type = event.target.files[0].type.split("/")
        setImageType(type[0])
    }
    ////////////////////////////////////
    const handelReload = () => {
        setTimeout(() => {
            setReload(!reload)
        }, 1000);
    }
    ////////////////////////////////////
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('description', description);

            dispatch(postArticle(formData))
            setTimeout(() => {
                setReload(!reload)
            }, 1000);
            setStateMessage(true)
        }
    };
    ////////////////////////////////////
    const handleClose = () => {
        setTimeout(() => {
            setStateMessage(false)
        }, 1000);
    }
    ////////////////////////////////////
    useEffect(() => {
        dispatch(getArticles())
    }, [dispatch, reload])
    ////////////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - My Articles`;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    const { t, i18n } = useTranslation();
    return (
        <>
            <Toaster />
            {/* {
                stateMessage &&

                < SuccessfulMessage
                    handleClose={handleClose}
                    state={addState}
                    open={stateMessage}
                />
            } */}
            <div className='editeCategory'>
                <div className='title'>
                    {t('articles.title')}
                </div>
                <div className='editeContener'>
                    <div className='nowArticle'>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='addCategory'>
                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label> {t('articles.addImageOrVideo')}</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Category Name"
                                    required
                                    onChange={imag2OnChange}
                                />
                            </Form.Group>
                            {/* ///////// */}
                            {/* <Form.Group className="mb-3 " controlId="validationCustom02">
                                <Form.Label>{t('articles.addDescriptionAr')} </Form.Label>
                                <Form.Control
                                    className='textarea1'
                                    as="textarea"
                                    type="text"
                                    placeholder="write description here "
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group> */}
                            {/* ///////// */}
                            <Form.Group className="mb-3 " controlId="validationCustom02">
                                <Form.Label>{t('articles.addDescriptionEn')} </Form.Label>
                                <Form.Control
                                    className='textarea1'
                                    as="textarea"
                                    type="text"
                                    placeholder="write description here "
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Form.Group>
                            <hr className='tapp' />
                            <button type="submit" className='formButton'>{t('public.addButton')}</button>
                        </Form>
                        {/* <div className='displayNewCategory'> */}
                        <div className='newImageArticle' style={{ display: imageType != "video" ? "flex" : "none" }} >
                            <img className='imageCat' src={imageSquer} />
                        </div>
                        {/* </div> */}
                        <div className='newImageArticle' style={{ display: imageType == "video" ? "flex" : "none" }}>
                            {/* <VideoPlayer videoUrl={imageSquer} /> */}
                            <video src={imageSquer} width="100%" height="100%" controls>
                            </video>
                        </div>
                    </div>
                </div >
                <div className='supTitle'>
                    {t('articles.supTitle')}
                </div>
                <div className='currentArticles'>
                    {articels?.map((articel) => (
                        <Post
                            key={articel._id}
                            id={articel._id}
                            image={articel?.image}
                            description={articel.description}
                            date={articel?.createdAt}
                            like={articel.likeCount}
                            share={articel.shareCount}
                            filetype={articel.filetype}
                            handelReload={handelReload}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default MyArticles;
