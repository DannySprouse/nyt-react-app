import React, { Component } from "react";
import Saved from "./Saved";
import Search from "./Search";
import Results from "./Results";
import API from "../utils/api";

class Main extends Component {

  state = {
    topic: "",
    startYear: "",
    endYear: "",
    articles: [],
    saved: []
  };

  // Check to see if the component mounted and get a list of the articles
  componentDidMount() {
    this.getSavedArticles()
  }

  // Pull the articles down from the db
  getSavedArticles = () => {
    API.getArticle()
      .then((res) => {
        this.setState({ saved: res.data });
      });
  }

  // Loads each individual article
  renderArticles = () => {
    return this.state.articles.map(article => (
      <Results
        _id={article._id}
        key={article._id}
        title={article.headline.main}
        date={article.pub_date}
        url={article.web_url}
        handleSaveButton={this.handleSaveButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }
  renderSaved = () => {
    return this.state.saved.map(save => (
      <Saved
        _id={save._id}
        key={save._id}
        title={save.title}
        date={save.date}
        url={save.url}
        handleDeleteButton={this.handleDeleteButton}
        getSavedArticles={this.getSavedArticles}
      />
    ));
  }

  // Not sure this section is right - saw in several examples but not certain it will work as it's written here, about handling input information - I honestly am not sure what this is all really doing, I just saw it in some examples so am using it - could be part of why this is not running

  handleTopicChange = (event) => {
    this.setState({ topic: event.target.value });
  }
  handleStartYearChange = (event) => {
    this.setState({ startYear: event.target.value });
  }
  handleEndYearChange = (event) => {
    this.setState({ endYear: event.target.value });
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    API.searchNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then((res) => {
        this.setState({ articles: res.data.response.docs });
      });
  }
  handleSaveButton = (id) => {
    const findArticleByID = this.state.articles.find((el) => el._id === id);
    console.log("findArticleByID: ", findArticleByID);
    const newSave = {title: findArticleByID.headline.main, date: findArticleByID.pub_date, url: findArticleByID.web_url};
    API.saveArticle(newSave)
    .then(this.getSavedArticles());
  }
  handleDeleteButton = (id) => {
    API.deleteArticle(id)
      .then(this.getSavedArticles());
  }

  render() {
    return (

      <div className="main-container">
        <div className="container">
          {/* Jumbotron */}
          <div className="jumbotron">
            <h1 className="text-center"><strong>NYT React Article Search</strong></h1>
            <h2 className="text-center">If this page were working, you would be able to find past articles from the New York Times!</h2>
          </div>
          {}
          <Search
            handleTopicChange={this.handleTopicChange}
            handleStartYearChange={this.handleStartYearChange}
            handleEndYearChange={this.handleEndYearChange}
            handleFormSubmit={this.handleFormSubmit}
            renderArticles={this.renderArticles}
          />

          <div className="container">
            <div className="row">
              <div className="col">
                <div className="frame frame-primary">
                  <div className="frame-heading">
                    <h3 className="frame-title">
                      <strong>
                        <i className="fa fa-download" aria-hidden="true"></i>Saved Articles</strong>
                    </h3>
                  </div>
                  <div className="frame-body">
                    <ul className="list-group">
                      {this.renderSaved()}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;