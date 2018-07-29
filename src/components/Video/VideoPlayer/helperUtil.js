import queryString from "query-string";

/**
 *
 * @function validateVidURL
 * @param {*} url
 * @returns {object} parsed URL for video, gives url, id or error
 */
export const validateVidUrl = url => {
  const inputUrl = url;
  const urlObj = queryString.parseUrl(inputUrl);

  if (urlObj.url.includes(".youtube.com")) {
    // TODO for youtube search api
    if (!urlObj.query.v) {
      throw new Error(
        `The URL should look like this https://www.youtube.com/watch?v=mCscZ2tPFmI`
      );
    } else {
      try {
        const id = urlObj.query.v.length;
        if (!id === 11) {
          throw new Error(`The video id "${urlObj.query.v}" was not valid`);
        }
      } catch (err) {
        console.log(err);
      }
    }
    const cutStr = urlObj.url.substr(0, 23);
    const embedStr = cutStr + "/embed/" + urlObj.query.v + "?enablejsapi=1";

    return {
      url: embedStr,
      id: urlObj.query.v,
      screenState: false
    };
  } else {
    throw new Error(
      `URL must be copied and pasted from youtube,
      you tried "${inputUrl}"`
    );
  }
};
/**
 *
 * @function checkForSync
 * @param {boolean} stateToCheck property of state object bool
 * @param {object} socket
 */
export const checkForSync = (stateToCheck, socket) => {
  if (stateToCheck) {
    if (!socket.connected) {
      socket.open();
    }
  } else {
    socket.close();
  }
};
