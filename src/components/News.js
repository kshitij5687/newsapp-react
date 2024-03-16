import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
    static defaultProps={
        country: 'in',
        pageSize: 9,
        category: 'General'
    }
    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }
    constructor(){
        super();
        this.state={
            articles: [],
            loading: false,
            page:1
        }
    }

    async componentDidMount(){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30f928ae65ba4967a0731205f20c4c9c&page=1&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        })
    }

    handlePreviousClick = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30f928ae65ba4967a0731205f20c4c9c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json()

        this.setState({
            page: this.state.page -1,
            articles: parsedData.articles,
            loading: false
        })
    }
    handleNextClick = async () =>{
        if(this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
            
        }
        else{
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=30f928ae65ba4967a0731205f20c4c9c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
            this.setState({loading: true});
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                page: this.state.page +1,
                articles: parsedData.articles,
                loading: false
            })
        }
    }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center'>New 24 - Top Headlines</h2>
        {this.state.loading && <Spinner/>}
        <div className="row my-3">
            {!this.state.loading && this.state.articles.map((element, index) => {
            return (
                <div className="col-md-4 my-3" key={index}>
                <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={element.description ? element.description.slice(0, 60) : ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                />
                </div>
            );
            })}

        </div>
        <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePreviousClick}>&larr; Previous</button>
            <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News

