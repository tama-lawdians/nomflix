import React from "react";
import { moviesApi, TVApi } from "../../api";
import DetailPresenter from "./DetailPresenter";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        // const request = await moviesApi.movieDetail(parsedId);
        // result = request.data;
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        // const request = await TVApi.tvDetail(parsedId);
        // result = request.data;
        ({ data: result } = await TVApi.tvDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result });
    }
  }

  render() {
    const { result, error, loading } = this.state;
    console.log(result);
    return <DetailPresenter result={result} error={error} loading={loading} />;
  }
}
