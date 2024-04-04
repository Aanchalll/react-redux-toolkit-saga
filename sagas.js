
import { put, takeEvery , takeLatest} from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* incrementAsync() { //worker
    yield delay(3000)
    yield put({ type: 'INCREMENT' })
}
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() { //watcher
    // yield takeEvery('INCREMENT_ASYNC', incrementAsync)
    yield takeLatest('INCREMENT_ASYNC', incrementAsync)
}



