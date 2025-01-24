import React from 'react';
import './categorysCardSkeleton.css'
import logo from '../../image/logo.svg'

const CategorysCardSkeleton = () => {
    return (
        <div className='CategorysCard ' >
            <div className='link' >
                <div className='skeleton1'>
                    <img className='logoSkeleton' src={logo} alt="" />
                </div>
                <div className='skeleton2'>
                    <svg xmlns="http://www.w3.org/2000/svg" width={60} height={60} viewBox="0 0 24 24"><circle cx={18} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0.67} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={12} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0.33} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle><circle cx={6} cy={12} r={0} fill="currentColor"><animate attributeName="r" begin={0} calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"></animate></circle></svg>                </div>
            </div>
        </div>
    );
}

export default CategorysCardSkeleton;
