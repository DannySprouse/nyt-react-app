import axios from "axios"; // Keep getting an error about "can't resolve an access"

const api = {
  // Query NYT API
  searchNYT: function(topic, startYear, endYear) {
    const authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
    const queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
    authKey + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "1234";
    return axios.get(queryURL);
  },

  getArticle: function() {
    return axios.get("/api/saved");
  },

  saveArticle: function(articleObj) {
    return axios.post("/api/saved", articleObj);
  },

  deleteArticle: function(id) {
    return axios.delete(`/api/saved/${id}`);
  }
};

export default api;