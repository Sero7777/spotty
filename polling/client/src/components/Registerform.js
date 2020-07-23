import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RegisterForm = (props) => {
    const initialValues = { email: "", username: "", password: "", passwordRepeat: "" }
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Required field"),
        username: Yup.string()
            .min(5, "The username has to have at least 5 characters")
            .required("Required field"),
        password: Yup.string()
            .trim()
            .min(8, "The password has to have at least 8 characters")
            .required("Required field"),
        passwordRepeat: Yup.string()
            .trim()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Required field")
    })
    const onSubmit = async (formValues, {resetForm}) => {
        const response = await props.onSubmit(formValues)

        if (response.status === 201) resetForm()

        else console.log("Something went wrong")
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="register__input__form">
                <div className="mg-bottom-s">
                    <Field name="email" type="text" placeholder="email" />
                    <ErrorMessage name="email" component="div" className="register__input__form__error"/>
                </div>
                <div className="mg-bottom-s">
                    <Field name="username" type="text" placeholder="username" />
                    <ErrorMessage name="username" component="div" className="register__input__form__error"/>
                </div>
                <div className="mg-bottom-s">
                    <Field name="password" type="password" placeholder="password" />
                    <ErrorMessage name="password" component="div" className="register__input__form__error"/>
                </div>
                <div className="mg-bottom-s">
                    <Field name="passwordRepeat" type="password" placeholder="repeat password" />
                    <ErrorMessage name="passwordRepeat" component="div" className="register__input__form__error"/>
                </div>
                <p className="register__input__form__legal mg-bottom-sm mg-top-xs">Durch die Registrierung stimmst du unseren Nutzungsbedingungen zu. In unserer Datenrichtlinie erfährst du, wie wir deine Daten erfassen, verwenden und teilen. Unsere Cookie-Richtlinie erklärt, wie wir Cookies und ähnliche Technologien verwenden.</p>
                <button className="register__btn">Register</button>
            </Form>
        </Formik>
    )
}

const errorMessage = () => {

}

export default RegisterForm;