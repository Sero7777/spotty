import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {createSpot} from "../../actions/index"

const AddSpotsModal = (props) => {
    const initialValues = { title: "", category: "", description: "", streetname: "", zip: "", country: "", city: "", pic: "" }
    const validationSchema = Yup.object({
        title: Yup.string()
            .trim()
            .min(10, "The title has to have a length of 10 chars or more")
            .required("Required field"),
        description: Yup.string()
            .trim()
            .min(20, "The description has to have a length of 20 chars or more")
            .required("Required field"),
        category: Yup.string()
            .trim()
            .required("category has to be provided"),
        streetname: Yup.string()
            .trim()
            .required("Required field"),
        zip: Yup.string()
            .trim()
            .required("Required field"),
        city: Yup.string()
            .trim()
            .required("Required field"),
        country: Yup.string()
            .trim()
            .required("Required field")
    })

    const onSubmit = async formValues => {
        formValues.upvotes = 0

        const res = await createSpot(formValues)

        if (res.status === 201) props.onDismiss()

        else console.log(res.reason)
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="spots__add__modal mg-bottom-m mg-top-m">
                <div>
                    <Field name="title" type="text" placeholder="title" className="spots__add__modal__field--stretch"/>
                    <ErrorMessage name="title" component="div" className="register__input__form__error" />
                </div>
                <div>
                    <Field name="description" component="textarea" placeholder="description" className="spots__add__modal__textarea--stretch"/>
                    <ErrorMessage name="description" component="div" className="register__input__form__error" />
                </div>
                <div>
                    <Field as="select" name="category" className="spots__add__modal__field--stretch">
                        <option value="">Select a Category</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Chilling">Chilling</option>
                        <option value="Romantic">Romantic</option>
                        <option value="Action">Action</option>
                        <option value="Sports">Sports</option>
                    </Field>
                    <ErrorMessage name="category" component="div" className="register__input__form__error" />
                </div>
                <div>
                    <Field name="pic" type="text" placeholder="picture url" className="spots__add__modal__field--stretch"/>
                    <ErrorMessage name="pic" component="div" className="register__input__form__error" />
                </div>
                <div className="spots__add__modal__street-zip">
                    <div className="spots__add__modal__street-zip--name">
                        <Field name="streetname" type="text" placeholder="streetname" className="spots__add__modal__field--stretch"/>
                        <ErrorMessage name="streetname" component="div" className="register__input__form__error" />
                    </div>
                    <div className="spots__add__modal__street-zip--zip">
                        <Field name="zip" type="text" placeholder="zip" className="spots__add__modal__field--stretch"/>
                        <ErrorMessage name="zip" component="div" className="register__input__form__error" />
                    </div>
                </div>
                <div className="spots__add__modal__city-country">
                    <div className="spots__add__modal__city-country--city">
                        <Field name="city" type="text" placeholder="city" className="spots__add__modal__field--stretch"/>
                        <ErrorMessage name="city" component="div" className="register__input__form__error" />
                    </div>
                    <div className="spots__add__modal__city-country--country">
                        <Field name="country" type="text" placeholder="country" className="spots__add__modal__field--stretch"/>
                        <ErrorMessage name="country" component="div" className="register__input__form__error" />
                    </div>
                </div>

                <div className="spots__add__modal__btns">
                    <button type="button" className="spots__add__modal__btn" onClick={props.onDismiss}>Cancel</button>
                    <button type="submit" className="spots__add__modal__btn">Submit</button>
                </div>
            </Form>
        </Formik>
    )
}

export default AddSpotsModal;
