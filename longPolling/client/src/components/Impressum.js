import React from "react";
import Footer from "./Footer";

const Impressum = () => {
    return (
        <>
            <div className="impressum">
                <div className="impressum__text mg-top-m">
                    <h1 className="impressum__text--headline mg-bottom-m">Impressum</h1>
                    <p className="impressum__text--paragraph">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Voluptatem, eveniet ipsam. Error quod eaque, sit nemo minima ut ab veniam dolorem architecto facere
                        adipisci ullam! Beatae vero eos minus quod!</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Impressum;