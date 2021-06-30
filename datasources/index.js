import { HackerNewsAPI } from "./hackernews";
import { NewYorkTimesAPI } from "./newyorktimes";
import { NewsAPI } from "./news";

export default {
  hackernews: new HackerNewsAPI(),
  newyorktimes: new NewYorkTimesAPI(),
  news: new NewsAPI(),
};
