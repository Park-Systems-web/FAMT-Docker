import React from "react";
import { MapContainer } from "./MapStyles";

interface IMap {
  // mapType: google.maps.MapTypeId;
  mapTypeControl: boolean;
}

// 현재 이 컴포넌트를 사용하지 않지만 길찾기 등 동적인 상황이 필요할때 사용합니다

const Map = ({ mapTypeControl = false }: IMap) => {
  return <MapContainer>He;lop</MapContainer>;
};

export default Map;
