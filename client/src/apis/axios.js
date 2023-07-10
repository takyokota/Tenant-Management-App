import axios from 'axios';

export default axios.create({
  baseURL: 'http://tenant.localhost:80',
});