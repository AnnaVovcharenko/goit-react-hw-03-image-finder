import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const BASE_URL = 'https://pixabay.com/api/';
const limitPage = 12;
const API_KEY = '39130708-8822508b9719607ff3135caf6';
// export const fetchImg = async (query, page) => {
//   const response = await axios.get(
//     `?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${limitPage}`
//   );
//   return response.data;
// };

export const fetchImg = async (queryFetch, pageFetch) => {
  const response = {
    params: {
      key: API_KEY,
      q: queryFetch,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: limitPage,
      page: pageFetch,

    }
  };

  const { data } = await axios.get(BASE_URL, response)
  return data;
}

export const normalizedImg = imagesArray =>
  imagesArray.map(({ id, tags, webformatURL, largeImageURL }) => {
    return { id, tags, webformatURL, largeImageURL };
  });