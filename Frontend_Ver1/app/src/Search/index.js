import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';
import {Col, Container, Row} from "react-bootstrap";
import {AlgoliaProvider, SearchControl} from "leaflet-geosearch";
import {useEffect, useState} from "react";
import "leaflet-geosearch/dist/geosearch.css";
import constantUrl from "../Components/ConstantUrl";


delete L.Icon.Default.prototype._getIconUrl;


const SearchMap = () => {
    const map = useMap();
    useEffect(() => {
        const searchControl = new SearchControl({
            // provider: new OpenStreetMapProvider({
            //     params: {
            //         countrycodes: "vn",
            //         addressdetails: 1,
            //     }
            // }),
            provider: new AlgoliaProvider(),
            style: "bar",
            zoom: 12,
            showMarker: false,
            searchLabel: "Which district are you looking for?"
        })
        map.addControl(searchControl)
        return () => map.removeControl(searchControl);
    }, [])
    return null
}
const CurrentLocation = () => {
    const [position, setPosition] = useState(null);
    const map = useMap();
    useEffect(() => {
        map.locate().on("locationfound", function (e){
            setPosition(e.latlng);
            map.flyTo(e.latlng, 15);
            const radius = 500;
            const circle = L.circle(e.latlng, radius);
            circle.addTo(map);
        })
    },[map]);
    return position === null ? null : (
        <Marker position = {position}>
            <Popup>
                You are here
            </Popup>
        </Marker>
    )
};
const Search = () => {
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
    });
    const HN_pos = [21.027763, 105.834160]
    // const HN_DD = [21.019294906324916, 105.82435224232968]
    const [geo, setGeo] = useState([]);
    const [geoList, setGeoList] = useState([]);
    useEffect(() => {
        let url = "/api/v1/stations/";
        fetch(constantUrl + url)
            .then(res => res.json())
            .then(data => setGeo(data));
        if (geo != null) {
            setGeoList(geo.map((item) => {
                return (
                    <Marker position={[item.latitude, item.longtitude]}>
                        <Popup>
                            {item.stationName}
                        </Popup>
                    </Marker>
                );
            }));
        }
    },[geo.length]);
    return (
        <>
            <Container fluid className={'p-0'}>
                <Row>
                    <Col md={12}>
                        <MapContainer style={{height: "100vh", width: "100%"}} className={'ms-auto me-auto'}
                                      center={HN_pos}
                                      zoom={10}
                                      scrollWheelZoom={true}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <SearchMap/>
                            <CurrentLocation/>
                            {/*<Marker position={HN_DD}>*/}
                            {/*    <Popup>*/}
                            {/*        36 Hoang Cau, Dong Da, Ha Noi*/}
                            {/*    </Popup>*/}
                            {/*</Marker>*/}
                            {geoList}
                        </MapContainer>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default Search;