import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import axios from "axios";
import { CPagination } from "@coreui/react";

class Movie extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      allData: [],
      page: 1,
      totalPage: 1,
      fields: [
        "Image",
        "Title",
        "Description",
        "Popularity",
        "Vote Average",
        "Vote",
        "Action",
      ],
    };
  }

  getData = (page) => {
    const limit = this.state.limit;
    page = page != null ? page : 1;
    this.setState({ page: page });
    axios
      .get(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=2fccde01a371b106b09a241d6d1d5b49&page=${page}`
      )
      .then((response) => {
        this.setState({
          allData: response.data.results,
          page: response.data.page,
          totalPage: response.data.total_pages,
        });
        console.log("RESPONSE =>", response.data.results);
      })
      .catch((error) => {
        console.log("ERROR =>", error);
      })
      .finally(() => {});
  };

  componentDidMount = () => {
    this.getData(1);
  };

  render() {
    return (
      <>
        <div className="c-app c-default-layout">
          <div className="c-wrapper">
            <div className="c-body">
              <CRow>
                <CCol xs="12" lg="12">
                  <CCard>
                    <CCardHeader>List Movie</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={this.state.allData}
                        fields={this.state.fields}
                        striped
                        itemsPerPage={this.state.allData.length}
                        pagination
                        sorter
                        hover
                        scopedSlots={{
                          Image: (item) => (
                            <td>
                              <div className="">
                                <div class="text-center">
                                  <img
                                    src={
                                      "https://image.tmdb.org/t/p/original" +
                                      item.poster_path
                                    }
                                    className="mx-auto d-block img-fluid img-thumbnail rounded"
                                    width="200"
                                    alt={item.title}
                                  />
                                </div>
                              </div>
                            </td>
                          ),
                          Title: (item) => (
                            <td>
                              <div>{item.title}</div>
                              <div className="small text-muted">
                                <span>Upcoming</span> | Release:{" "}
                                {item.release_date}
                              </div>
                            </td>
                          ),
                          Description: (item) => <td>{item.overview}</td>,
                          Popularity: (item) => <td>{item.popularity}</td>,
                          "Vote Average": (item) => (
                            <td>
                              {item.vote_average} <i className="cil-star"></i>
                            </td>
                          ),
                          Vote: (item) => <td>{item.vote_count}</td>,
                          Action: (item) => (
                            <td>
                              <CDropdown className="m-1 btn-group">
                                <CDropdownToggle color="secondary"></CDropdownToggle>
                                <CDropdownMenu>
                                  <CDropdownItem to={"/movie/" + item.id}>
                                    View Detail
                                  </CDropdownItem>
                                </CDropdownMenu>
                              </CDropdown>
                            </td>
                          ),
                        }}
                      />
                      <CPagination
                        activePage={this.state.page}
                        pages={this.state.totalPage}
                        onActivePageChange={(i) => this.getData(i)}
                      ></CPagination>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Movie;
