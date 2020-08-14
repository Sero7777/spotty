import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import UpdateSpotModal from "./Modals/UpdateSpotModal"
import DeleteSpotModal from "./Modals/DeleteSpotModal"
import SpotItemModal from "./Modals/SpotItemModal"
import Modal from "./Modals/Modal"

const MapView = (props) => {
    const [updateModalTriggered, setUpdateModalTriggered] = useState(false)
    const [deleteModalTriggered, setDeleteModalTriggered] = useState(false)
    const [spotModalTriggered, setSpotModalTriggered] = useState(false)
    const [spotState, setSpotState] = useState(null)

    const onUpdateClick = (spot) => {
        setSpotState(spot)
        setUpdateModalTriggered(true)
    }

    const onSpotClick = (spot) => {
        setSpotState(spot)
        setSpotModalTriggered(true)
    }

    const onDeleteClick = (spot) => {
        setSpotState(spot)
        setDeleteModalTriggered(true)
    }


    const triggerUpdateSpotModal = () => {
        if (updateModalTriggered) {
            return (
                <Modal onDismiss={() => { setUpdateModalTriggered(false) }} title={spotState.title}>
                    <UpdateSpotModal spot={spotState} onDismiss={() => setUpdateModalTriggered(false)} />
                </Modal>
            )
        }
        return null
    }

    const triggerDeleteSpotModal = () => {
        if (deleteModalTriggered) {
            return (
                <Modal onDismiss={() => { setDeleteModalTriggered(false) }} title={spotState.title}>
                    <DeleteSpotModal spotId={spotState.id} onDismiss={() => setDeleteModalTriggered(false)} />
                </Modal>
            )
        }
        return null
    }

    const triggerSpotModal = () => {
        if (spotModalTriggered) {
            return (
                <Modal onDismiss={() => { setSpotModalTriggered(false) }} title={spotState.title}>
                    <SpotItemModal spot={spotState} onDismiss={() => setSpotModalTriggered(false)} />
                </Modal>
            )
        }
        return null
    }

    let map = useRef()
    let markerAnnotation = useRef()

    useEffect(() => {
        window.mapkit.init({
            authorizationCallback: function (done) {
                fetch("http://spotty.com/api/maptoken")
                    .then((response) => response.json())
                    .then((result) => {
                        done(result.token);
                    });
            },
        })
        map.current = new window.mapkit.Map("map")
        markerAnnotation.current = window.mapkit.MarkerAnnotation

        setRegion()

        return () => {
            map.current.destroy()
            markerAnnotation = null
        }
    }, [])

    useEffect(() => {
        console.log(map.current)
        map.current.showsUserLocation = true
        map.current.showsUserLocationControl = true
        map.current.showsCompass = window.mapkit.FeatureVisibility.Hidden
        map.current.showsMapTypeControl = false
        map.current.showsZoomControl = true
        // map.current.colorScheme = window.mapkit.Map.ColorSchemes.Dark // make it user switchable maybe?
        // map.current.showsPointsOfInterest = false

        const annotations = props.spots.map(spot => {
            return getAnnotation(spot)
        })

        if (props.spots.length > 0) map.current.addAnnotations(annotations)
    }, [props.spots])

    const getAnnotation = (spot) => {
        const coordinate = new window.mapkit.Coordinate(spot.latitude, spot.longitude)

        const calloutDelegate = {
            calloutContentForAnnotation: function () {

                const element = document.createElement("div")
                element.className = "callout__container"

                const title = document.createElement("h1")
                title.textContent = spot.title
                title.onclick = () => onSpotClick(spot)

                const img = document.createElement("img")
                const imgAttr = document.createAttribute("src")
                imgAttr.value = spot.pic === "" ? "https://ephemerica.kfstock.at/wp-content/themes/koji/assets/images/default-fallback-image.png" : spot.pic
                img.setAttributeNode(imgAttr)
                img.onclick = () => onSpotClick(spot)

                const flexCont = document.createElement("div")
                flexCont.className = "callout__flex-container"

                const updateBtn = document.createElement("button")
                updateBtn.textContent = "Update"
                updateBtn.className = "mg-top-xs"
                const deleteBtn = document.createElement("button")
                deleteBtn.textContent = "Delete"
                deleteBtn.className = "mg-top-xs"
                updateBtn.onclick = () => onUpdateClick(spot)
                deleteBtn.onclick = () => onDeleteClick(spot)

                flexCont.appendChild(updateBtn)
                flexCont.appendChild(deleteBtn)

                element.appendChild(title)
                element.appendChild(img)
                element.appendChild(flexCont)

                return element
            }
        };

        const annotation = new markerAnnotation.current(coordinate, {
            callout: calloutDelegate,
            // clusteringIdentifier: "spot",
            displayPriority: spot.upvotes
        })

        return annotation
    }

    const setRegion = () => {
        const currentRegion = new window.mapkit.CoordinateRegion(
            new window.mapkit.Coordinate(52.520008, 13.404954),
            new window.mapkit.CoordinateSpan(0.1, 0.2)
        );
        map.current.region = currentRegion;
    }

    return (
        <>
            <div id="map" className="mapView"></div>
            {triggerUpdateSpotModal()}
            {triggerDeleteSpotModal()}
            {triggerSpotModal()}
        </>
    )
}

const mapStateToProps = state => {
    return { spots: state.spots, username: state.user.username };
};

export default connect(mapStateToProps)(MapView)