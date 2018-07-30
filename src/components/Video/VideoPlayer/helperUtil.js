import queryString from "querystring";

/**
 *
 * @function validateVidURL
 * @param {*} url
 * @returns {object} parsed URL for video, gives url, id or error
 */
export const validateVidUrl = url => {
  const urlArr = url.split('?');
  const inputUrl = urlArr[0];
  const query = urlArr[1];
  const urlObj = queryString.parse(query);
  if (inputUrl.includes(".youtube.com")) {
    // TODO for youtube search api
    if (!urlObj.v) {
      throw new Error(
        `The URL should look like this https://www.youtube.com/watch?v=mCscZ2tPFmI`
      );
    } else {
      try {
        const id = urlObj.v.length;
        if (!id === 11) {
          throw new Error(`The video id "${urlObj.v}" was not valid`);
        }
      } catch (err) {
        console.log(err);
      }
    }

    const embedStr = "https://www.youtube.com/embed/" + urlObj.v + "?enablejsapi=1";

    return {
      url: embedStr,
      id: urlObj.v,
      screenState: false
    };
  } else {
    throw new Error(
      `URL must be copied and pasted from youtube,
      you tried "${inputUrl}"`
    );
  }
};

