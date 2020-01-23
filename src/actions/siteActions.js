export const LOAD_HITS = 'LOAD_HITS';
export const LOAD_HIT = 'LOAD_HIT';

export const loadHits = (hits) => {
  return dispatch => {
    dispatch(loadHitsToStore(hits));
  }
}

export const loadHitsToStore = (hits) => {
  return {
    type: LOAD_HITS,
    payload: hits
  }
}

export const loadCreatedHit = (hit) => {
  return {
    type: LOAD_HIT,
    payload: hit
  }
}

