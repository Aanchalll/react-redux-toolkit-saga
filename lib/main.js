"use strict";

require("@babel/polyfill");
var _react = _interopRequireDefault(require("react"));
var _reactDom = _interopRequireDefault(require("react-dom"));
var _redux = require("redux");
var _reduxSaga = _interopRequireDefault(require("redux-saga"));
var _sagas = require("./sagas");
var _reduxDevtoolsExtension = require("redux-devtools-extension");
var _Counter = _interopRequireDefault(require("./Counter"));
var _reducers = _interopRequireDefault(require("./reducers"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// const store = createStore(reducer)

var sagaMiddleware = (0, _reduxSaga["default"])();
var store = (0, _redux.createStore)(_reducers["default"], (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(sagaMiddleware)));
var action = function action(type) {
  return store.dispatch({
    type: type
  });
};
sagaMiddleware.run(_sagas.rootSaga);
// sagaMiddleware.run(helloSaga1)

function render() {
  _reactDom["default"].render( /*#__PURE__*/_react["default"].createElement(_Counter["default"], {
    value: store.getState(),
    onIncrement: function onIncrement() {
      return action('INCREMENT');
    },
    onDecrement: function onDecrement() {
      return action('DECREMENT');
    },
    onIncrementAsync: function onIncrementAsync() {
      return action('INCREMENT_ASYNC');
    },
    onNameNumberUpdate: function onNameNumberUpdate() {
      return action('INCREMENT_AND_NAME');
    },
    getPostData: function getPostData() {
      return action('GET_POST_DATA');
    }
  }), document.getElementById('root'));
}
render();
store.subscribe(render);