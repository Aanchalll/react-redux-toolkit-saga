export default function counter(state = { count: 0, name: '', isLoading: false, postData: [], error: '' }, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    case 'INCREMENT_IF_ODD':
      return { ...state, count: (state.count % 2 !== 0) ? state.count + 1 : state.count }
    case 'DECREMENT':
      return { ...state, count: state.count - 1 }
    case 'FETCH_POST_REQUEST':
      return { ...state, isLoading: true }
    case 'FETCH_POST_SUCCESS':
      return { ...state, isLoading: false, postData: action.payload }
    case 'FETCH_POST_FAILURE':
      return { ...state, isLoading: false, error: action.payload }
    default:
      return { ...state }
  }
}
