import Axios from 'axios';

const AXIOS = Axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '18267918-a545f4b922b3d8b59313b99e1',
    per_page: '12',
    image_type: 'photo',
    orientation: 'horizontal',
  },
});

async function getData(query, page) {
  const response = await AXIOS.get(`?q=${query}&page=${page}`);
  const { data } = response;
  return data;
}

export default getData;
