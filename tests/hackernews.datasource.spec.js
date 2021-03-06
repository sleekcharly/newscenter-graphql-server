import { HackerNewsAPI } from "../datasources/hackernews";
import {
  emptyReducerReturnValue,
  getAllArticleIdsStub,
  getArticlePostReducerStub,
  getArticlePreReducerStub,
} from "../fixtures/hackernews";

const ds = new HackerNewsAPI();
ds.get = jest.fn();

describe("[HackerNeswAPI.articleReducer]", () => {
  it("transforms using the article reducer", () => {
    expect(ds.articleReducer(getArticlePreReducerStub)).toEqual(
      getArticlePostReducerStub
    );
  });

  it("does not transform using the articl reducer", () => {
    expect(ds.articleReducer()).toEqual(emptyReducerReturnValue);
  });
});

describe("[HackerNeswAPI.getArticle]", () => {
  it("gets a single article from the HackerNewsAPI", async () => {
    ds.get.mockReturnValueOnce(getArticlePreReducerStub);
    const res = await ds.getArticle(21168364);

    expect(res).toEqual(getArticlePostReducerStub);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith("item/21168364.json");
  });
});

describe("[HackerNeswAPI.getArticlesByIds]", () => {
  it("gets an array of articles from the HackerNewsAPI", async () => {
    ds.get.mockReturnValueOnce(getArticlePreReducerStub);
    const res = await ds.getArticlesByIds([21168364]);

    expect(res).toEqual([getArticlePostReducerStub]);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith("item/21168364.json");
  });
});

describe("[HackerNeswAPI.getAllArticleIds]", () => {
  it("gets an array of article Ids from the HackerNewsAPI", async () => {
    ds.get.mockReturnValueOnce([getAllArticleIdsStub]);
    const res = await ds.getAllArticleIds([21168364]);

    expect(res).toEqual([getAllArticleIdsStub]);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith("topstories.json");
  });
});

describe("[HackerNeswAPI.getAllArticles]", () => {
  it("gets an array of all articles from the HackerNewsAPI", async () => {
    ds.getAllArticleIds = jest.fn();
    ds.getAllArticleIds.mockReturnValueOnce(getAllArticleIdsStub);
    ds.get.mockReturnValueOnce(getArticlePreReducerStub);
    const res = await ds.getAllArticles();

    expect(res).toEqual([getArticlePostReducerStub]);
    expect(ds.get).toHaveBeenCalled();
    expect(ds.get).toBeCalledWith("item/21168364.json");
  });
});
