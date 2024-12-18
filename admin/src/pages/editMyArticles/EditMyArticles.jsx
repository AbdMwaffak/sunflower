import React, { useEffect, useState } from 'react';
import './editMyArticles.css'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { patchArticles } from '../../RTK/arcticles/patchArticlesSlice';
import { getArticleById } from '../../RTK/arcticles/getArticleByIdSlice';
import Api from '../../allExtensions/API';
import EDitPost from '../../allExtensions/post/EditPost';
import { Toaster } from 'react-hot-toast';

const EditMyArticles = () => {
    const id = useParams().ArticalId
    const dispatch = useDispatch()

    const [imageSquer, setImageSquer] = useState([]);
    const [image, setImage] = useState([]);
    const [imageType, setImageType] = useState([]);
    const [description, setDescription] = useState("")
    const [validated, setValidated] = useState(false);
    const [reload, setReload] = useState(true);
    ////////////////////////////////////
    const articel = useSelector(state => state.getArticleById)?.data
    ////////////////////////////////////
    useEffect(() => {
        setImageSquer(`${Api}/users/${articel.image}`)
    }, [articel])
    ////////////////////////////////////
    const imag2OnChange = (event) => {
        setImage(event.target.files[0])
        setImageSquer(URL.createObjectURL(event.target.files[0]))
        const type = event.target.files[0].type.split("/")
        setImageType(type[0])
    }
    ////////////////////////////////////
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else {
            const formData = new FormData();
            formData.append('image', image);
            formData.append('description', description);
            const value = {
                reqobj: formData,
                id: id
            }

            dispatch(patchArticles(value))
            setReload(!reload)
        }
    };
    ////////////////////////////////////
    useEffect(() => {
        dispatch(getArticleById(id))
    }, [dispatch, reload])
    ////////////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - ${articel?.name}`;
            return function () { document.title = 'SUNFLOWER' };
        }, [articel])
    ////////////////////////////////////
    return (
        <>
            <Toaster />
            <div className='editeCategory'>
                <div className='title'>
                    Edit My Articles
                </div>
                <div className='editeContener'>
                    <div className='nowArticle'>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='addCategory'>
                            <Form.Group className="mb-3" controlId="validationCustom02">
                                <Form.Label>Add image or video</Form.Label>
                                <Form.Control
                                    type="file"
                                    placeholder="Category Name"
                                    required
                                    onChange={imag2OnChange}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 " controlId="validationCustom02">
                                <Form.Label>Add description </Form.Label>
                                <Form.Control
                                    className='textarea1'
                                    as="textarea"
                                    type="text"
                                    placeholder="write description here "
                                    required
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <Form.Control.Feedback type="invalid">
                                    Please provide a valid city.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <hr />
                            <button type="submit" className='formButton'>Submit form</button>
                        </Form>


                        <div className='newImageArticle' style={{ display: imageType != "video" ? "flex" : "none" }} >
                            <img className='imageCat' src={imageSquer} />
                        </div>
                        <div className='newImageArticle' style={{ display: imageType == "video" ? "flex" : "none" }}>
                            <video src={imageSquer} width="100%" height="100%" controls>
                            </video>
                        </div>

                    </div>
                </div >
                <div className='supTitle'>
                    The final result
                </div>
                <div className='currentBouquets '>
                    <EDitPost
                        key={articel._id}
                        id={articel._id}
                        image={articel?.image}
                        description={articel.description}
                        date={articel?.createdAt}
                        like={articel.likeCount}
                        share={articel.shareCount}
                        filetype={articel.filetype}
                    />
                </div>
            </div >
        </>
    )
}

export default EditMyArticles;
