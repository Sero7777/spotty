import React, { useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import SpotItemModal from "./Modals/SpotItemModal"
import Modal from "./Modals/Modal"
import _ from "lodash"

const MapView = (props) => {
    const [spotModalTriggered, setSpotModalTriggered] = useState(false)
    const [oldSpots, setOldSpots] = useState([])
    const allSpotsRef = useRef([])
    const idRef = useRef(null)
    const currentSpotRef = useRef(null)
    let mapRef = useRef()
    let markerAnnotationRef = useRef()

    const triggerSpotModal = () => {
        if (spotModalTriggered) {
            return (
                <Modal onDismiss={() => { setSpotModalTriggered(false) }} title={currentSpotRef.current.title}>
                    <SpotItemModal spot={currentSpotRef.current} onDismiss={() => setSpotModalTriggered(false)} />
                </Modal>
            )
        }
        if(mapRef.current) mapRef.current.selectedAnnotation = null
        return null
    }

    useEffect(() => {
        mapRef.current = new window.mapkit.Map("map")
        markerAnnotationRef.current = window.mapkit.MarkerAnnotation

        mapRef.current.showsUserLocation = true
        mapRef.current.showsUserLocationControl = true
        mapRef.current.showsCompass = window.mapkit.FeatureVisibility.Hidden
        mapRef.current.showsMapTypeControl = false
        mapRef.current.showsZoomControl = true
        mapRef.current._allowWheelToZoom = true
        mapRef.current.showsPointsOfInterest = false
        setRegion()

        mapRef.current.addEventListener("select", (event) => {
            idRef.current = event.annotation.data
            currentSpotRef.current = allSpotsRef.current.find(spot => spot.id === idRef.current)
            setSpotModalTriggered(true)
        })

        return () => {
            mapRef.current.destroy()
            markerAnnotationRef = null
        }
    }, [])

    useEffect(() => {
        // has to be added to update spotModal while its opened
        allSpotsRef.current = props.spots
        if (idRef.current) currentSpotRef.current = props.spots.find(spot => spot.id === idRef.current)

        // removing deleted annotations
        const deletedSpots = oldSpots.filter(spot => !_.some(props.spots, { "id": spot.id }))
        const annotationsToBeDeleted = mapRef.current.annotations.filter(anno => _.some(deletedSpots, { "id": anno.data }))
        mapRef.current.removeAnnotations(annotationsToBeDeleted)

        // adding newly added spots as annotations
        const addedSpots = props.spots.filter(spot => !_.some(oldSpots, { "id": spot.id }))
        const annotations = addedSpots.map(spot => getAnnotation(spot))
        if (props.spots.length > 0) mapRef.current.addAnnotations(annotations)

        setOldSpots(props.spots)
    }, [props.spots])

    const getAnnotation = (spot) => {
        const coordinate = new window.mapkit.Coordinate(spot.latitude, spot.longitude)

        const annotation = new markerAnnotationRef.current(coordinate, {
            displayPriority: spot.upvotes,
            data: spot.id,
            calloutEnabled: false,
        })

        return annotation
    }

    const setRegion = () => {
        const currentRegion = new window.mapkit.CoordinateRegion(
            new window.mapkit.Coordinate(52.520008, 13.404954),
            new window.mapkit.CoordinateSpan(0.1, 0.2)
        );
        mapRef.current.region = currentRegion;
    }

    return (
        <>
            <div id="map" className="mapView"></div>
            {triggerSpotModal()}
        </>
    )
}

const mapStateToProps = state => {
    return { spots: state.spots };
};

export default connect(mapStateToProps)(MapView)