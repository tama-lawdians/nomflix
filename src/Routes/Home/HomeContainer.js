import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "../../api";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  state = {
    nowPlaying: null,
    upComing: null,
    popular: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upComing },
      } = await moviesApi.upComing();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      // throw Error();
      this.setState({
        nowPlaying,
        upComing,
        popular,
      });
    } catch {
      this.setState({
        error: "Can't find movies information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { nowPlaying, upComing, popular, error, loading } = this.state;
    console.log(this.state);
    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upComing={upComing}
        popular={popular}
        error={error}
        loading={loading}
      />
    );
  }
}
