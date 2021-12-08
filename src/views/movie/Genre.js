import React, { Component } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
} from "@coreui/react";
import axios from "axios";
import { connect } from "react-redux";

class Genre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      fields: ["Genre"],
    };
  }

  getData = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=2fccde01a371b106b09a241d6d1d5b49`
      )
      .then((response) => {
        this.setState({
          allData: response.data.genres,
        });
        console.log("RESPONSE =>", response.data.genres);
      })
      .catch((error) => {
        console.log("ERROR =>", error);
      })
      .finally(() => {});
  };

  componentDidMount = () => {
    this.getData();
  };

  render() {
    console.log(this.props);
    return (
      <>
        <div className="c-app c-default-layout">
          <div className="c-wrapper">
            <div className="c-body">
              <CRow>
                <CCol xs="12" lg="12">
                  <CCard>
                    <CCardHeader>List Genre</CCardHeader>
                    <CCardBody>
                      <CDataTable
                        items={this.state.allData}
                        fields={this.state.fields}
                        striped
                        itemsPerPage={this.state.allData.length}
                        hover
                        scopedSlots={{
                          Genre: (item) => <td>{item.name}</td>,
                        }}
                      />
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

const mapStateToProps = (state) => {
  return {
    allData: state.listGenre,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenre: () => dispatch({ type: "LIST_GENRE" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Genre);
