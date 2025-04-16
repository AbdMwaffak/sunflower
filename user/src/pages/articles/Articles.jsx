import React, { useEffect, useState } from 'react';
import './articles.css'
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from '../../RTK/arcticles/getArticlesSlice';
import Post from '../../allExtensions/post/Post';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import { Toaster } from 'react-hot-toast';

const Articles = () => {
    const cookies = new Cookies();
    let lng = ''
    let token = ''
    if (cookies.get('token') !== undefined || null) {
        token = true
    } else token = false
    if (cookies.get('i18next') === "ar") {
        lng = "ar"
    } else lng = "en"
    ////////////////////////////////////
    const [reload, setReload] = useState(true);
    const articels = useSelector(state => state.getArticles).data
    ////////////////////////////////////
    const reloadHandel = () => {
        setReload(!reload)
    }
    ////////////////////////////////////
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getArticles())
    }, [dispatch, reload])
    ////////////////////////////////////
    useEffect(
        function () {
            document.title = `SUNFLOWER - Articles `;
            return function () { document.title = 'SUNFLOWER' };
        }, [])
    ////////////////////////////////////
    const { t } = useTranslation();
    return (<>
        <Toaster />
        <div className='bage'>
            <div className='title'>
                {t('articles.title')}
            </div>
            <div className='editeContener'>
                {articels?.length == 0 &&
                    <div className='noProducts' >
                        <b>  {t('articles.message1')}
                            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={25} viewBox="0 0 36 36" ><path fill="#ffcb4c" d="M36 18c0 9.941-8.059 18-18 18c-9.94 0-18-8.059-18-18C0 8.06 8.06 0 18 0c9.941 0 18 8.06 18 18"></path><ellipse cx={12.176} cy={14.71} fill="#65471b" rx={2.647} ry={3.706}></ellipse><circle cx={24.882} cy={14.294} r={6.882} fill="#f4f7f9"></circle><path fill="#65471b" d="M14.825 9.946c-.322 0-.64-.146-.848-.423c-.991-1.321-2.028-2.029-3.083-2.104c-1.39-.095-2.523.947-2.734 1.158A1.057 1.057 0 1 1 6.663 7.08c.457-.457 2.129-1.936 4.381-1.773c1.695.12 3.251 1.111 4.627 2.945a1.059 1.059 0 0 1-.846 1.694"></path><path fill="#292f33" d="M32.824 36a1.059 1.059 0 0 1-1.059-1.059V14.824a1.059 1.059 0 1 1 2.118 0v20.118A1.06 1.06 0 0 1 32.824 36"></path><path fill="#67757f" d="M32.824 12.706c-.054 0-.105.012-.158.016c-.732-3.628-3.943-6.369-7.784-6.369c-4.379 0-7.941 3.562-7.941 7.941s3.562 7.941 7.941 7.941c3.468 0 6.416-2.238 7.496-5.343a2.118 2.118 0 1 0 .446-4.186m-7.942 7.412c-3.211 0-5.823-2.612-5.823-5.824s2.613-5.824 5.823-5.824c3.211 0 5.824 2.612 5.824 5.824s-2.613 5.824-5.824 5.824"></path><path fill="#65471b" d="M21.175 28.588c-.159 0-.321-.036-.473-.112c-1.819-.91-3.587-.91-5.406 0a1.059 1.059 0 1 1-.947-1.895c2.421-1.21 4.877-1.21 7.3 0a1.06 1.06 0 0 1-.474 2.007"></path><path fill="#bdddf4" d="M28.049 9.411a5.788 5.788 0 0 0-3.167-.94a5.824 5.824 0 0 0-5.824 5.824c0 1.169.348 2.255.94 3.167zm-5.652 10.144a5.794 5.794 0 0 0 2.485.563a5.824 5.824 0 0 0 5.824-5.824c0-.89-.206-1.731-.563-2.485z"></path></svg>
                            ! </b>
                        <br />
                        <b> {t('articles.message2')} {" "}
                            <svg className='aboveHand' xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 36 36"><path fill="#d9cdab" d="m30.415 9.586l-9-9a2.001 2.001 0 0 0-2.829 2.829l-3.859 3.859l9 9l3.859-3.859a2 2 0 0 0 2.829-2.829"></path><path fill="#ece4d0" d="M20 0H5a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h22a4 4 0 0 0 4-4V11h-9c-1 0-2-1-2-2z"></path><path fill="#202126" d="M20 0h-2v9a4 4 0 0 0 4 4h9v-2h-9c-1 0-2-1-2-2zm-5 8a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h8a1 1 0 0 1 1 1m12 4a1 1 0 0 1-1 1H6a1 1 0 0 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1m0 4a1 1 0 0 1-1 1H6a1 1 0 1 1 0-2h20a1 1 0 0 1 1 1"></path><path fill="#d9cdab" d="M31 19s-5.906-.002-5.935 0c-.291 0-.91.174-1.255.606l-2.328 2.929c-.644.809-.644 2.119 0 2.93l2.328 2.929c.345.432.964.606 1.255.606c.019.002 3.547 0 5.935 0z"></path><path fill="#F1C92F" d="M33 19s-8.056-.002-8.084 0c-.291 0-.91.139-1.255.485l-2.328 2.342a1.665 1.665 0 0 0 0 2.344l2.328 2.342c.345.346.964.487 1.255.487c.028.002 8.084 0 8.084 0c1.104 0 2-.897 2-2.001V21a2 2 0 0 0-2-2"></path></svg>
                        </b>
                    </div>
                }
                {articels?.map((articel) => (
                    <Post
                        key={articel._id}
                        id={articel._id}
                        image={articel?.image}
                        description={lng == "ar" ? articel?.descriptionAr : articel?.description}
                        date={articel?.createdAt}
                        like={articel.likeCount}
                        share={articel.shareCount}
                        filetype={articel.filetype}
                        reloadHandel={reloadHandel}
                    />
                ))}
            </div>
        </div >
    </>
    );
}
export default Articles;
