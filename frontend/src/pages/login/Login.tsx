import React, {useState} from "react"
import './Login.css'
import logo from '@/assets/images/logo.png'
import {sign} from "node:crypto";

const Login = () => {

    const [signState, setSignState] = useState(true)

    return (
        <div className='login'>
            <img src={logo} alt="" className="login-logo"/>
            <div className="login-form">
                <h1>{signState ? "Sign In" : "Sign Up"}</h1>
                <form>
                    { !signState ?
                        (
                            <div className="form-field">
                                <input className="form-input" type="text" placeholder=" "/>
                                <label className="form-label">Name</label>
                            </div>
                        ) : <></>}
                    <div className="form-field">
                        <input className="form-input" placeholder=" " type="email"/>
                        <label className="form-label">Email</label>
                    </div>
                    <div className="form-field">
                        <input className="form-input" placeholder=" " type="password"/>
                        <label className="form-label">Password</label>
                    </div>
                    {
                        signState ? (
                            <>
                                <button className="btn btn-login">Sign In</button>
                                <p className="text-desc">OR</p>
                                <button className="btn btn-code">Use a Sign-In Code</button>
                                <a href="" className="forgot-pass">Forgot Password?</a>
                            </>
                        ) : (
                            <button className="btn btn-login">Sign Up</button>
                        )
                    }
                </form>
                <div className="form-help">
                    <div className="remember">
                        <input type="checkbox"/>
                        <label htmlFor="">Remember me</label>
                    </div>
                </div>
                <div className="form-switch">
                    {signState ? (
                        <p>
                            New to Netflix?
                            <span onClick={() => setSignState(false)}> Sign Up Now</span>
                        </p>
                    ) : (
                        <p>
                            Already have an account?
                            <span onClick={() => setSignState(true)}> Sign In Now</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Login