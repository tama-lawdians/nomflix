import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Section from "../../Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";

const Container = styled.div`
  padding: 0px 20px;
`;

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) => (
  <>
    <Helmet>
      <title>TVs | Nomflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <Container>
        {topRated && topRated.length > 0 && (
          <Section title="Top Rated TV">
            {topRated.map((TV) => (
              // <span key={TV.id}>{TV.name}</span>
              <Poster
                key={TV.id}
                id={TV.id}
                title={TV.original_name}
                imageUrl={TV.poster_path}
                rating={TV.vote_average}
                year={TV.first_air_date && TV.first_air_date.substring(0, 4)} // release_data가 있을 때만 사용
                isMovie={false}
              />
            ))}
          </Section>
        )}
        {popular && popular.length > 0 && (
          <Section title="Popular TV">
            {popular.map((TV) => (
              // <span key={TV.id}>{TV.name}</span>
              <Poster
                key={TV.id}
                id={TV.id}
                title={TV.original_name}
                imageUrl={TV.poster_path}
                rating={TV.vote_average}
                year={TV.first_air_date && TV.first_air_date.substring(0, 4)} // release_data가 있을 때만 사용
                isMovie={false}
              />
            ))}
          </Section>
        )}
        {airingToday && airingToday.length > 0 && (
          <Section title="Airing Today">
            {airingToday.map((TV) => (
              // <span key={TV.id}>{TV.name}</span>
              <Poster
                key={TV.id}
                id={TV.id}
                title={TV.original_name}
                imageUrl={TV.poster_path}
                rating={TV.vote_average}
                year={TV.first_air_date && TV.first_air_date.substring(0, 4)} // release_data가 있을 때만 사용
                isMovie={false}
              />
            ))}
          </Section>
        )}
        {error && <Message color="#e74c3c" text={error} />}
      </Container>
    )}
  </>
);

TVPresenter.propTypes = {
  topRated: PropTypes.array,
  popular: PropTypes.array,
  airingToday: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default TVPresenter;
