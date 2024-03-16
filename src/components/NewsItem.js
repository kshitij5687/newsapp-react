import React, { Component } from 'react'

export class NewsItem extends Component {
    
  render() {
    let {title,description,imageUrl,newsUrl,author,date} = this.props;
    return (
      <div>
        <div className="card" style={{width: "18rem"}}>
            <img src={imageUrl?imageUrl:"https://storage.googleapis.com/support-forums-api/attachment/thread-243956535-14305442424050420808.png"} 
            className="card-img-top" alt="..." style={{ height: "200px", objectFit: "cover" }}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {author?author:"Unknwon"} on {new Date(date).toGMTString()}</small></p>
                <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
