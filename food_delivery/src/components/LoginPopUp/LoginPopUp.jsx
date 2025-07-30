import React, {  useContext, useState } from 'react'
import './LoginPopUp.css';
import {assets} from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopUp = ({setshowLogin}) => {

    const [currState ,setcurrState] =useState("Sign Up");
    const {url , setToken} = useContext(StoreContext)
    const [data ,setData] = useState({
        name : "",
        email : "",
        password :""
    })

    const onChangeHandler = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({...data,[name]:value}))
    }

   const onLogin = async (event) =>
   {
        event.preventDefault();
        let newURL = url;
        if(currState === "Login")
        {
            newURL += '/api/user/login';
        }
        else{
            newURL += '/api/user/register';
        }
        const response = await axios.post(newURL,data);
        
        if(response.data.success)
        {
            setToken(response.data.token);
            localStorage.setItem("token",response.data.token);
            setshowLogin(false);
        }
        else{
            alert(response.data.message);
        }

   
    }

  return (
    <>
        <div className='login-popup'>

            <form onSubmit={onLogin} className='login-popup-container'>
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() =>setshowLogin(false)} src={assets.cross_icon}></img>
                </div>
                <div className='login-popup-inputs'>
                {currState==="Login"?<></>:<input type='text'name='name' onChange={onChangeHandler} value={data.name} placeholder='Your name' required/>}
                    
                    <input name='email' onChange={onChangeHandler} value={data.email} type='email' placeholder='Your email' required/>
                    <input name='password' onChange={onChangeHandler} value={data.password} type='password' placeholder='password' required/>
                </div>
                <button type='submit'>{currState==="Sign Up"?"Create account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type='checkbox' required />
                    <p>I follow all terms and conditions</p>
                </div>
                {currState==="Login"?
                <p>Create a new account ?<span onClick={() => setcurrState("Sign Up")}>Click here</span></p> :
                <p>Already have account ?<span onClick={() => setcurrState("Login")}>Login here</span></p>}
                
                
            </form>
        </div>
    </>
  )
}

export default LoginPopUp