import React, { Component, PropTypes } from 'react';

export default function Img({ ...props }) {
  return <img {...props} src={`http://testbbcimage.leimingtech.com${props.src}`} />
}
