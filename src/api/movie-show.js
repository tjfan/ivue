import axios from 'axios';
import { commonParams } from './config';

export function getMovie(start, count) {
  const url = '/v2/movie/in_theaters';
  const data = Object.assign({}, commonParams, {
    start,
    count
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

export function getNewMovie(start, count) {
  const url = 'v2/movie/coming_soon';
  const data = Object.assign({}, commonParams, {
    start,
    count
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}

export function getFreeMovie(start, count) {
  const url = 'v2/movie/search';
  const data = Object.assign({}, commonParams, {
    start,
    count,
    tag: '免费'
  });
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  }).catch((err) => {
    console.log(err);
  });
}
