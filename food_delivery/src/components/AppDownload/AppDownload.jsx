import React from 'react'
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
  return (
    <>
        <div className='app-download' id='app-download'>
        <hr/>
        <p>
            For Better Experience Download <br/>Tomato App
        </p>
        <div className='app-download-platforms'>
            <img src={assets.play_store}></img>
            <img src={assets.app_store}></img>
        </div>
        </div>
    </>
  )
}

export default AppDownload