import loadScript from "load-script2";

export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const loadSdk = () => {
  return new Promise((resolve, reject) => {
    if (
      typeof window.YT === "object" &&
      typeof window.YT.ready === "function"
    ) {
      // A YouTube SDK is already loaded, so reuse that
      window.YT.ready(() => {
        resolve(window.YT);
      });
      return;
    }

    loadScript("https://www.youtube.com/iframe_api", err => {
      if (err) {
        reject(err);
      } else {
        window.YT.ready(() => {
          resolve(window.YT);
        });
      }
    });
  });
};
