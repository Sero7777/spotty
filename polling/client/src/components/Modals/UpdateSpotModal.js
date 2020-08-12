import React from "react";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateSpot } from "../../actions/index"

const UpdateSpotModal = (props) => {
    const initialValues = { title: props.spot.title, category: props.spot.category, description: props.spot.description, streetname: props.spot.streetname, zip: props.spot.zip, country: props.spot.country, city: props.spot.city, pic: props.spot.pic }
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
    })

    const onSubmit = async formValues => {
        let hasChanged = false

        Object.keys(formValues).forEach(key => { if (props.spot[`${key}`] !== formValues[`${key}`]) hasChanged = true })

        if (hasChanged) {
            const updatedSpot = {...props.spot, ...formValues}
            const status = await updateSpot(updatedSpot)

            if (status === 200) props.onDismiss()

            else console.log("Something went wrong")
        }

        else {
            console.log("Dismissing update modal as no properties have changed")
            props.onDismiss()
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            <Form className="spots__add__modal mg-bottom-m mg-top-m">
                <div>
                    <Field name="title" type="text" placeholder="title" className="spots__add__modal__field--stretch" />
                    <ErrorMessage name="title" component="div" className="register__input__form__error" />
                </div>
                <div>
                    <Field name="description" component="textarea" placeholder="description" className="spots__add__modal__textarea--stretch" />
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
                    <Field name="pic" type="text" placeholder="picture url" className="spots__add__modal__field--stretch" />
                    <ErrorMessage name="pic" component="div" className="register__input__form__error" />
                </div>
                <div className="spots__add__modal__street-zip">
                    <div className="spots__add__modal__street-zip--name">
                        <Field name="streetname" type="text" placeholder="streetname" className="spots__add__modal__field--stretch" disabled={true}/>
                    </div>
                    <div className="spots__add__modal__street-zip--zip">
                        <Field name="zip" type="text" placeholder="zip" className="spots__add__modal__field--stretch" disabled={true}/>
                    </div>
                </div>
                <div className="spots__add__modal__city-country">
                    <div className="spots__add__modal__city-country--city">
                        <Field name="city" type="text" placeholder="city" className="spots__add__modal__field--stretch" disabled={true}/>
                    </div>
                    <div className="spots__add__modal__city-country--country">
                        <Field name="country" type="text" placeholder="country" className="spots__add__modal__field--stretch" disabled={true}/>
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

export default UpdateSpotModal;