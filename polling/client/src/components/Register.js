import React from "react";
import { connect } from 'react-redux';

import logo_register from "../assets/logo-register.png";
import Footer from "./Footer";
import { register, getSpots } from "../actions";
import RegisterForm from "./Registerform";

const Register = (props) => {

    const onSubmit = async formValues => {
        const res = await props.register(formValues)

        if (res.status === 201) props.getSpots()
    }

    return (
        <>
            <div className="register">
                <div className="register__container">
                    <div className="register__intro">
                        <h1 className="mg-bottom-s">Spotty - Connecting people</h1>
                        <div className="register__intro__quote">
                            <blockquote>"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quam, accusamus magni modi reprehenderit ex eos labore delectus, recusandae necessitatibus animi, blanditiis fugiat error. Ea similique doloremque architecto praesentium ullam!"</blockquote>
                            <blockquote className="mg-top-s">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate quam, accusamus magni modi reprehenderit ex eos labore delectus, recusandae necessitatibus animi, blanditiis fugiat error. Ea similique doloremque architecto praesentium ullam!"</blockquote>
                        </div>
                        <img src={logo_register} alt="Spotty Register Image" className="register__intro__img" />
                    </div>
                    <div className="register__input">
                        <h1>Register</h1>
                        <h3 className="mg-bottom-m">Register to see the Spots of your friends.</h3>

                        <RegisterForm onSubmit={onSubmit}/>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    )
}

export default connect(
    null,
    { register, getSpots }
)(Register)