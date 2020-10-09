import React from 'react';
import moment from 'moment';
import { Button, FiveStars, FourStars, ThreeStars, TwoStars, OneStar } from '../Styling/Styles.jsx';

const SingleReview = (props) => {

  return (
  <div className="listItem">
    <span className="title">{props.element.title}</span>
    <div className="break"></div>

    <span className="stars">{props.element.stars + " out of 5 stars"}</span>

    <span className="recommend">{" | " + "would recommend"}</span>
    <div className="break"></div>
    <span className="author">{props.element.author}</span>
    <span className="date">{" - " + moment(props.element.createdAt).startOf('minute').fromNow()}</span>
    <p className="review-body">{props.element.body}</p>
    {/* <div className="helpful">{"Helpful: " + props.element.helpfulVotes}</div>
    <div className="sizing">{"Sizing: " + props.element.sizing}</div>
    <div className="review-sidebar">SIDEBAR GOES HERE</div> */}
  </div>
  )
}

export default SingleReview;