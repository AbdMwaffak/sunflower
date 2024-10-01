import React, { useEffect, useState } from 'react';
import './myCategory.css'
import CategorysCard from "../../allExtensions/categorysCard/CategorysCard"
import Form from 'react-bootstrap/Form';
import { postNewCategory } from '../../RTK/categories/postNewCategorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../RTK/categories/getCategoriesSlice ';
import { Toaster } from 'react-hot-toast';


const MyCategory = () => {
    const allCategories = useSelector(state => state.getCategories).data
    const addState = useSelector(state => state.postNewCategory)
    ///////////////////////////////
    const [imageSquer, setImageSquer] = useState([]);
    const [image, setImage] = useState([]);
    const [name, setName] = useState("name")
    const [stateMessage, setStateMessage] = useState(false);
    const [validated, setValidated] = useState(false);
    const [reload, setReload] = useState(true);
    ///////////////////////////////
    const dispatch = useDispatch()
    ///////////////////////////////
    const imag2OnChange = (event) => {
        setImage(event.target.files[0])
        setImageSquer(URL.createObjectURL(event.target.files[0]))
    }
    ///////////////////////////////
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
            formData.append('name', name);
            formData.append('image', image);

            dispatch(postNewCategory(formData))
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
    ///////////////////////////////
    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch, reload])
    const notify = () => toast('Here is your toast.');
    ////////////////////////////////////
    useEffect(
        function () {
            document.title = 'SUNFLOWER - My Category';
            return function () { document.title = 'SUNFLOWER' };
        }, [allCategories])
    ////////////////////////////////////
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
            <div className='myCategory'>
                <div className='myCategoryTitle'>
                    My Category
                </div>
                <div className='myCategoryContener'>
                    <div className='nowCategory'>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='addCategory'>
                            <div className='activeTitel'> Add new category</div>
                            <hr />
                            <Form.Group className="mb-3" controlId="validationCustom01">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    required
                                    type="file"

                                    onChange={imag2OnChange}
                                />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="validationCustom03">
                                <Form.Label>Category Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Category Name"
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <hr />
                            <button type="submit" className='formButton'>add new category </button>
                        </Form>



                        {/* </div> */}
                        <div className='displayNowCategory'>


                            <div className='newImageCategory'>
                                <img className='imageCat' src={imageSquer} />
                            </div>
                            <div className='newTitleCategory'>
                                {name}
                            </div>


                        </div>

                    </div>
                </div>
                <div className='productsTitle'>
                    Current Category
                </div>
                <div className='currentCategory'>
                    {allCategories?.map((category) => (
                        <CategorysCard
                            key={category._id}
                            id={category._id}
                            image={category.image}
                            name={category.name}
                        />

                    ))}

                </div>



            </div >
        </>
    );
}

export default MyCategory;
