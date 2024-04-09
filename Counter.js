import React from 'react'
import { PropTypes } from 'prop-types';

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync, onNameNumberUpdate, getPostData }) =>
  <div>
    <button onClick={onIncrementAsync}>
      Increment after 2 second
    </button>
    {' '}
    <button onClick={onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={onDecrement}>
      Decrement
    </button>
    {' '}
    {/* <button onClick={onNameNumberUpdate}>
      Increment And Update Name
    </button> */}
    <button onClick={getPostData}>
      Get All Post Data
    </button>

    <hr />

    <div>
      Clicked: {value.count} times
      <hr />
      {value.name ? <span>Clicked: {value.name} times</span> : ''}
      {value.isLoading ? <div style={{ color: 'blue' }}>Loading...</div> 
      :value.postData && value.postData?.length > 0 
      ? value.postData?.map((data, index) => {
          return (
            <div key={index} style={{ color: 'grey' }}>{data.id}.  {data.title}</div>
          )
        })
        :value.error ? <div style={{ color: 'red' }}>{value.error} </div> : ''}
    </div>
  </div>

Counter.propTypes = {
  value: PropTypes.object.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired
}

export default Counter
