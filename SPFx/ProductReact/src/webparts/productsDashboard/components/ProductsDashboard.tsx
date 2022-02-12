import * as React from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { IProductsDashboardProps } from './IProductsDashboardProps';
import Products from './Products';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';


export interface IProductsDashboardState {
  count: number;
  items: any[];
  currentLink: string;
  nextLink: string;
  previousLink: string[];
  searchKeyword: string;
}


export default class ProductsDashboard extends React.Component<IProductsDashboardProps, IProductsDashboardState> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      items: [],
      nextLink: undefined,
      previousLink: [],
      currentLink: undefined,
      searchKeyword: ''
    }
  }

  componentDidMount() {
    if (this.props.listName || this.props.maxItem) {
      let url = this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${this.props.listName}')/items?$top=${this.props.maxItem}`;

      this.getListItems(url).then(response => {
        console.log('Response ', response);
        console.log('Next Link is', response["@odata.nextLink"]);
        this.setState({ items: response.value, nextLink: response["@odata.nextLink"] })
      }, error => console.error('Oops error occured', error));
    }
  }

  private getListItems(url) {
    this.setState({ currentLink: url })
    return this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  handleNext = () => {
    let prev = this.state.previousLink;
    prev.push(this.state.currentLink);

    this.getListItems(this.state.nextLink).then(response => {
      console.log('Response ', response);
      console.log('Next Link is', response["@odata.nextLink"]);

      this.setState({ items: response.value, nextLink: response["@odata.nextLink"], previousLink: prev });

    }, error => console.error('Oops error occured', error));
  }

  handleSearch = () => {    
    let url = this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${this.props.listName}')/items?$filter=substringof('${this.state.searchKeyword}',field_1)&$top=${this.props.maxItem}`;

    this.getListItems(url).then(response => {
      console.log('Response ', response);
      console.log('Next Link is', response["@odata.nextLink"]);

      this.setState({ items: response.value, nextLink: response["@odata.nextLink"], previousLink: [] });

    }, error => console.error('Oops error occured', error));
  }

  handlePrev = () => {
    let prev = this.state.previousLink;
    let url = prev.pop();

    this.getListItems(url).then(response => {
      console.log('Response ', response);
      console.log('Next Link is', response["@odata.nextLink"]);

      this.setState({ items: response.value, nextLink: response["@odata.nextLink"], previousLink: prev });

    }, error => console.error('Oops error occured', error));
  }

  public render(): React.ReactElement<IProductsDashboardProps> {
    console.log('State Value is', this.state);
    return (
      <div className="container-fluid">
        <h2>Products Dashboard</h2>

        <div className="input-group mb-3">
          <input type="search" value={this.state.searchKeyword} onChange={e=>this.setState({searchKeyword: e.target.value})} className="form-control" placeholder="Search Product Name ..."  />
          <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" onClick={this.handleSearch}><FontAwesomeIcon icon={faSearch} /></button>
          </div>
        </div>

        <Products items={this.state.items}></Products>

        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${this.state.previousLink.length > 0 ? '' : 'disabled'}`}>
              <a className="page-link" href="#" tabIndex={-1} onClick={this.handlePrev}>Previous</a>
            </li>
            <li className="page-item disabled"><a className="page-link" href="#">{this.state.previousLink.length + 1}</a></li>
            <li className={`page-item ${this.state.nextLink ? '' : 'disabled'}`}>
              <a className="page-link" href="#" onClick={this.handleNext}>Next</a>
            </li>
          </ul>
        </nav>

      </div>
    );
  }
}
