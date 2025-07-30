import React from 'react'
import './Footer.css';
import {assets} from '../../assets/assets';

const Footer = () => {
  return (
   <>
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                <img src={assets.logo}></img>
                <p>At FoodDash, we're committed to delivering your favorite meals hot and fresh, straight from local kitchens to your doorstep. With a wide selection of dishes and lightning-fast service, we make hunger disappear — one bite at a time.</p>
                <div className='footer-social-icons'>
                    <img src={assets.facebook_icon}></img>
                    <img src={assets.twitter_icon}></img>
                    <img src={assets.linkedin_icon}></img>
                </div>
                </div>

                <div className='footer-content-center'>
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>    
                </div>

                <div className='footer-content-right'>
                    <h2>Get in touch</h2>
                    <ul>
                        <li>+1-334-546-6578</li>
                        <li>contact@tomato.com</li>
                        
                    </ul> 
                </div>
                
            </div>
            <hr/>
            <p className='footer-copyright'>Copyright 2025 @ Tomato.com - All Rights Reserverd</p>
        </div>
   </>
  )
}

export default Footer