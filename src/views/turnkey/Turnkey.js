import React, {Component} from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'
import axios from "axios";
import { nominalTypeHack } from 'prop-types';

class Turnkey extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      allDataUser: [],
      limit: 10,
      page: 1,
      fields: ['Picture', 'Full Name','Telephone', 'Email', 'Country']
     };
  }

  getData = (page) => {
    const limit = this.state.limit;
    page = page != null ? page : 1;
    this.setState({page: page});
    axios.get(`https://randomuser.me/api/?results=${20}&page=${page}`)
    .then((response) => {
        this.setState({allDataUser: response.data.results});
        console.log("RESPONSE =>", response.data.results);
    })
    .catch((error) => {
        console.log("ERROR =>", error);
    })
    .finally(() => {
    })
  }

  componentDidMount = () => {
    this.getData(1);
  }

  render() {
    return (
      <>
        <div className="c-app c-default-layout">
          <div className="c-wrapper">
            <div className="c-body">
              <CRow>
                <CCol xs="12" lg="12">
                  <CCard>
                    <CCardHeader>
                      Random User
                    </CCardHeader>
                    <CCardBody>
                    <CDataTable
                      items={this.state.allDataUser}
                      fields={this.state.fields}
                      striped
                      itemsPerPage={5}
                      pagination
                      scopedSlots = {{
                        'Picture':
                          (item)=>(
                            <td>
                              <img src={item.picture.medium} />
                            </td>
                          ),
                        'Full Name':
                          (item)=>(
                            <td>
                              {item.name.title+" "+item.name.first+" "+item.name.last}
                            </td>
                          ),
                        'Telephone':
                          (item)=>(
                            <td>
                              {item.phone}
                            </td>
                          ),
                          'Email':
                          (item)=>(
                            <td>
                              {item.email}
                            </td>
                          ),
                          'Country':
                          (item)=>(
                            <td>
                              {item.location.country}
                            </td>
                          ),
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

export default Turnkey;
