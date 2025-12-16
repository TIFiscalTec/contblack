import ReactPixel from 'react-facebook-pixel';

const options = {
  autoConfig: true,
  debug: false,
};

const pixelId = '821213393953804';

export const initFacebookPixel = () => {
  ReactPixel.init(pixelId, {}, options);
  ReactPixel.pageView();
};

export default ReactPixel;
