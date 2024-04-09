
import { put, takeEvery, select, takeLatest, call, all, fork } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

const Sum = () => {
    // const a = yeild select(state => state)
    // console.log(5, a)
    return 5;
}

function* incrementAsync() { //worker
    yield delay(3000)
    yield put({ type: 'INCREMENT' })
    yield call(Sum)
}

function* watchGetPostsDataAsync() { // watcher function
    yield takeLatest('GET_POST_DATA', fetchPostsDataAsync)
}

function* fetchPostsDataAsync() { //worker function
    try {
        yield put({ type: 'INCREMENT' })
        yield put({ type: 'FETCH_POST_REQUEST' });
        const response = yield call(fetchUserData); // blocking call
        yield put({ type: 'FETCH_POST_SUCCESS', payload: response });

    } catch (err) {
        yield put({ type: 'FETCH_POST_FAILURE', payload: err.message });
    }
}

async function fetchUserData() {
    const data = await fetch('https://jsonplaceholder.org/posts? limit=20');
    const res = await data.json();
    return res;
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchIncrementAsync() { //watcher
    yield takeLatest('INCREMENT_ASYNC', incrementAsync)
}

// INCREMENT_AND_NAME
// function* watchIncrementUpdateName() { //watcher
//     yield takeLatest('INCREMENT_AND_NAME', )
//     const a = yield select(state => state);
//     console.log('state value=> ', a.name)
// }



export function* rootSaga() {
    yield all([
        watchIncrementAsync(),
        // incrementAsync(),
        watchGetPostsDataAsync()
    ])
}
