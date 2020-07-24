import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const LoginForm = (props) => {
    const initialValues = { email: "", password: "" }

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Required field"),
        password: Yup.string()
            .trim()
            .required("Required field")
    })

    const onSubmit = async (formValues, { resetForm }) => {
        const response = await props.onSubmit(formValues)

        if (response.status === 200) resetForm()

        else console.log("Something went wrong")
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="mg-right-xl">
                <span className="mg-right-s">
                    <Field name="email" type="text" placeholder="email" />
                    <ErrorMessage name="email" component="span" className="register__input__form__error mg-left-xs" />
                </span>
                <span className="mg-right-s">
                    <Field name="password" type="password" placeholder="password" />
                    <ErrorMessage name="password" component="span" className="register__input__form__error mg-left-xs" />
                </span> 
                <button className="header__login__btn">Login</button>
            </Form>
        </Formik>
    )
}

export default LoginForm