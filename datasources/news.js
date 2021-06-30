import { RESTDataSource } from "apollo-datasource-rest";

export class NewsAPI extends RESTDataSource {
  articleReducer({ source, author, title, url, publishedAt } = {}) {
    return {
      id: `news-${source.id}`,
      title,
      author,
      url,
      time: publishedAt,
      source: "News",
    };
  }

  async getAllArticles() {
    const result = await this.get(
      "https://newsapi.org/v2/top-headlines?country=ng&apiKey=738426735e384909a922a09ef3f2c22f"
    );
    return result?.articles?.map((article) => this.articleReducer(article));
  }
}
