import React, { Component } from "react";
import { useParams } from "react-router-dom";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CListGroup,
  CListGroupItem,
  CCardLink,
} from "@coreui/react";
import axios from "axios";
import { nominalTypeHack } from "prop-types";
import { CPagination } from "@coreui/react";

class DetailMovie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      genres: [],
      production_companies: [],
    };
  }

  getData = (id) => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=2fccde01a371b106b09a241d6d1d5b49`
      )
      .then((response) => {
        this.setState({
          allData: response.data,
          genres: response.data.genres,
          production_companies: response.data.production_companies,
        });
        console.log("RESPONSE =>", response.data);
      })
      .catch((error) => {
        console.log("ERROR =>", error);
      })
      .finally(() => {});
  };

  componentDidMount = () => {
    const { id } = this.props.match.params;
    this.getData(id);
  };

  render() {
    return (
      <>
        <div className="c-app c-default-layout">
          <div className="c-wrapper">
            <div className="c-body">
              <CCard style={{ width: "100%" }}>
                <img
                  orientation="top"
                  src={
                    "https://image.tmdb.org/t/p/original" +
                    this.state.allData.backdrop_path
                  }
                  height="400"
                />
                <CCardBody>
                  <CCardTitle>{this.state.allData.title}</CCardTitle>
                  <CCardText>{this.state.allData.overview}</CCardText>
                </CCardBody>
                <CListGroup flush>
                  <CListGroupItem>
                    Genre :
                    {this.state.genres.map(function (element, i) {
                      return (
                        <CBadge
                          key={i}
                          shape="pill"
                          color="info"
                          className="mr-2 ml-2"
                        >
                          &nbsp;{element.name}
                        </CBadge>
                      );
                    })}
                  </CListGroupItem>
                  <CListGroupItem>
                    Popularity : {this.state.allData.popularity}
                  </CListGroupItem>
                  <CListGroupItem>
                    Produksi :{"  "}
                    {this.state.production_companies.map(function (element, i) {
                      return (
                        <picture>
                          <div className="d-inline">
                            <img
                              src={
                                "https://image.tmdb.org/t/p/original" +
                                element.logo_path
                              }
                              className="img-fluid rounded mr-2 ml-2"
                              width="100"
                            />
                          </div>
                        </picture>
                      );
                    })}
                  </CListGroupItem>
                  <CListGroupItem>
                    Status : {this.state.allData.status}
                  </CListGroupItem>
                </CListGroup>
                <CCardBody>
                  <CCardLink href="#">
                    <i className="cil-caret-right"></i> {"  "}Play Trailer
                  </CCardLink>
                  <CCardLink href={this.state.allData.homepage}>
                    Homepage
                  </CCardLink>
                </CCardBody>
              </CCard>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DetailMovie;
