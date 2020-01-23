import { LOAD_HITS, LOAD_HIT } from '../actions/siteActions';

const initState = {
  hits: []
}

const rootReducer = (state=initState, action) => {
  switch (action.type) {
    
    case LOAD_HITS:
      return {
        ...state,
        hits: action.payload
      }

    case LOAD_HIT:
      return {
        ...state,
        hits: [...state.hits, action.payload]
      }

    default:
      return state
  }
}

export default rootReducer;