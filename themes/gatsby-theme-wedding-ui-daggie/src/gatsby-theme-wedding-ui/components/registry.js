import React from 'react'

export default props => {
  return (
    <ul>
      {props.vendors.map(vendor => (
        <li key={vendor.name}>{vendor.name}</li>
      ))}
    </ul>
  )
}
