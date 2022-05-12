export const loadMapApi = () => {
  const mapsURL = `https://`;
  const scripts = document.getElementsByTagName("script");

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(mapsURL) === 0) {
      return scripts[i];
    }
  }

  const googleMapScript = document.createElement("script");
  googleMapScript.src = mapsURL;
  googleMapScript.async = true;
  googleMapScript.defer = true;

  window.document.body.appendChild(googleMapScript);

  return googleMapScript;
};
