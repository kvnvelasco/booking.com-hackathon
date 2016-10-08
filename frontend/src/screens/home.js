import React, { Component } from 'react'
import  {AutoComplete} from 'material-ui'
import { connect } from 'react-redux'
import {throttle} from 'lodash'

import {searchByCity} from '../actions'

class Home extends Component{
  constructor(props) {
    super(props)
    this.style = {
      layout: {
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        alignItems: 'center',
        justifyContent: 'center'
      },
      searchBar: {
        fontSize: '24px',
        lineHeight: '36px',
        height: '88px'
      }
    }
  }

  search(searchText, dataSource) {
    this.props.dispatch({type: 'SEARCH STARTED'})
    if(searchText.length >= 2) {
      this.props.dispatch(searchByCity(searchText))
    }
  }

  render() {
    console.log(this.props.autoData)
    return  <div style={this.style.layout}>
              <AutoComplete
                openOnFocus
                fullWidth
                textFieldStyle={this.style.searchBar}
                hintText="Where do you wanna drink?"
                floatingLabelText="Where do you wanna drink?"
                dataSource={this.props.autoData}
                onUpdateInput={throttle(this.search.bind(this), 500)}/>
            </div>
  }
}

export default connect((store) => {
  return {
    query: store.Query.queryString,
    autoData: store.Query.cities
  }
})(Home)
