export { fetchSearch };
import axios from 'axios';
const API = '43312748-d2770da7ff63c643db495a6a3';

const fetchSearch = async (imageName, page) => {
  try {
    const result = await axios.get(`https://pixabay.com/api/`, {
      params: {
        key: API,
        q: imageName,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    console.log(result);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
