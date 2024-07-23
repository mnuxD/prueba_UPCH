import {
  GoogleMap,
  LoadScriptNext,
  MarkerF,
  StandaloneSearchBox
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { googleMapsLibraries } from "../../constants/googleMapsLibraries";

interface Props {
  formContext: UseFormReturn<FieldValues, any, undefined>;
  addressName: string;
  countryName: string;
  latName: string;
  lngName: string;
}

interface Location {
  lat: number;
  lng: number;
}

const MapComponent = ({
  formContext,
  addressName,
  countryName,
  latName,
  lngName
}: Props) => {
  const [mapRef, setMapRef] = useState<google.maps.Map>();

  const {
    watch,
    setValue,
    trigger,
    formState: { errors }
  } = formContext;

  const latWatcher = watch(latName) || 0;
  const lngWatcher = watch(lngName) || 0;

  const [mapCenter, setMapCenter] = useState({
    lat: latWatcher,
    lng: lngWatcher
  });
  const [zoom, setZoom] = useState(8);
  const [searchBox, setSearchBox] = useState<google.maps.places.SearchBox>();
  const [marker, setMarker] = useState<Location | null>({
    lat: latWatcher,
    lng: lngWatcher
  });

  const [geocoder, setGeocoder] = useState<google.maps.Geocoder>();

  const handlePlaceChange = (place: google.maps.places.PlaceResult) => {
    const countryTarget =
      place.address_components?.find((component) =>
        component.types.includes("country")
      )?.long_name || "";

    setValue(countryName, countryTarget);
    setValue(addressName, place.formatted_address);
    trigger(countryName);
    trigger(addressName);
  };

  const onPlacesChanged = () => {
    const places = searchBox?.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];

      handlePlaceChange(place);

      const coordinates = place.geometry?.location;

      if (coordinates) {
        setMarker({
          lat: coordinates.lat(),
          lng: coordinates.lng()
        });
        setValue(latName, coordinates.lat());
        setValue(lngName, coordinates.lng());
        setMapCenter({ lat: coordinates.lat(), lng: coordinates.lng() });
        setZoom(15);
      }
    }
  };

  const onMapClick = (e: google.maps.MapMouseEvent) => {
    const latEvent = e.latLng!.lat();
    const lngEvent = e.latLng!.lng();
    setMarker({
      lat: latEvent,
      lng: lngEvent
    });
    setValue(latName, latEvent);
    setValue(lngName, lngEvent);

    // Perform reverse geocoding to obtain the location
    if (geocoder) {
      geocoder.geocode(
        { location: { lat: latEvent, lng: lngEvent } },
        (results, status) => {
          if (
            status === google.maps.GeocoderStatus.OK &&
            results &&
            results[0]
          ) {
            const place = results[0];

            handlePlaceChange(place);
          } else {
            console.error("Geocode failed: " + status);
          }
        }
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  useEffect(() => {
    // conditional to automatically set your current location if nothing is saved
    if (latWatcher === 0 && lngWatcher === 0)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setMapCenter({ lat: latitude, lng: longitude });
          },
          () => {
            console.error("Error: The Geolocation service failed.");
          }
        );
      } else {
        console.error("Error: Your browser doesn't support geolocation.");
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapRef) {
      setGeocoder(new google.maps.Geocoder());
    }
  }, [mapRef]);

  return (
    <div style={{ position: "relative" }}>
      <LoadScriptNext
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY || ""}
        libraries={googleMapsLibraries}
      >
        <GoogleMap
          mapContainerStyle={{
            height: "600px",
            width: "100%",
            position: "relative"
          }}
          center={mapCenter}
          zoom={zoom}
          onLoad={setMapRef}
          onClick={onMapClick}
        >
          <StandaloneSearchBox
            onLoad={setSearchBox}
            onPlacesChanged={onPlacesChanged}
          >
            <div
              style={{
                position: "absolute",
                right: 60,
                top: 10,
                width: "50%"
              }}
            >
              <input
                type="text"
                placeholder="Buscar lugar..."
                style={{
                  boxSizing: `border-box`,
                  width: `100%`,
                  color: "black"
                }}
                onKeyDown={handleKeyDown}
              />
            </div>
          </StandaloneSearchBox>
          {marker && <MarkerF position={marker} />}
        </GoogleMap>
      </LoadScriptNext>
    </div>
  );
};

export default MapComponent;
