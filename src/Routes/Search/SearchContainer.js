import React from "react";
import { moviesApi, TVApi } from "../../api";
import SearchPresenter from "./SearchPresenter";

// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "", // 검색어 string 반환
    loading: false,
    error: null,
  };

  // 시뮬레이션용(searchTerm:"code")
  //   componentDidMount() {
  //     this.handleSubmit();
  //   }

  handleSubmit = (event) => {
    event.preventDefault(); // submit 시 state를 잃는 것(페이지 새로고침)을 방지
    const { searchTerm } = this.state;
    if (searchTerm !== "") {
      // 검색칸이 공백이 아닐 경우
      this.searchByTerm();
    }
  };

  updateTerm = (event) => {
    // console.log(event);
    const {
      target: { value },
    } = event;
    console.log(value);
    this.setState({ searchTerm: value }); // input value uptade
  };

  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    try {
      // throw Error();
      const {
        data: { results: movieResults },
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await TVApi.search(searchTerm);
      this.setState({
        movieResults,
        tvResults,
      });
    } catch {
      this.setState({ error: "Can't find results" });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { movieResults, tvResults, searchTerm, loading, error } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        searchTerm={searchTerm}
        loading={loading}
        error={error}
        handleSubmit={this.handleSubmit}
        updateTerm={this.updateTerm} // presenter로 보내기(렌딩)
      />
    );
  }
}
