import axios from 'axios';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';
import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';
const JOB_QUERY_PARAMS = {
  publisher: '6727895262474398',
  format: 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
};

buildJobsUrl = zip => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
}
// fetchJobs takes in a region object and
// returns action creator (redux thunk)
export const fetchJobs = (region, callback) => async dispatch => {
  try {
    let zip = await reverseGeocode(region);
    const url = buildJobsUrl(zip);
    let { data } = await axios.get(url);
    dispatch({ type: FETCH_JOBS, payload: data });
    callback();
  } catch (e) { console.log(`ERROR: ${e}`); }
};

export const likeJob = (job) => {
  return {
    payload: job,
    type: LIKE_JOB
  };
};

export const clearLikedJobs = () => ({ type: CLEAR_LIKED_JOBS });