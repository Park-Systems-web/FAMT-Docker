import React, { useEffect, useState } from "react";
import Title from "components/Title/Title";
import { loadMapApi } from "utils/GoogleMapsUtils";
// import Map from "components/Map/Map";
import { KoreaAttendContainer } from "./KoreaAttendStyles";

const KoreaAttend = () => {
  const [scriptLoaded, setScriptLoaded] = useState<boolean>(false);
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener("load", () => {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <KoreaAttendContainer>
      <Title title="오시는 길" fontSize={36} />
      <section className="image-container">
        <img
          src="https://user-images.githubusercontent.com/69495129/153314104-d22f63c6-06e5-40a1-a447-56ae1a43a1a7.png"
          alt="map"
        />

        <img
          src="https://user-images.githubusercontent.com/69495129/153314107-f2e543f2-b54d-47c2-8fff-5bca2de76fc3.png"
          alt="map"
        />
      </section>

      <section className="map-container">
        <div className="string-container">
          <i className="fas fa-location-arrow" aria-hidden="true" />
          <p>
            경기도 용인시 처인구 남사읍 통삼리 853-2, 서플러스글로벌
            반도체장비클러스터 (2F, Billion room)
          </p>
        </div>

        {/* 이 밑에 Map 컴포넌트는 나중에 유동적으로 API KEY 이용해서 쓰기위함 */}
        {/* {scriptLoaded && (
          <Map mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl />
        )} */}

        {/* eslint-disable-next-line jsx-a11y/iframe-has-title */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2163403842724!2d127.12867614582217!3d37.14194667570094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357b477d314deb39%3A0xd10824147b1538f9!2sSurplusGLOBAL%2C%20Inc.!5e0!3m2!1sko!2skr!4v1634795004754!5m2!1sko!2skr"
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
        />
      </section>
    </KoreaAttendContainer>
  );
};

export default KoreaAttend;
