import * as React from 'react';

import { IProductsDashboardProps } from './IProductsDashboardProps';
import Products from './Products';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';


export interface IProductsDashboardState {
  count: number;
  items: any[];
}


export default class ProductsDashboard extends React.Component<IProductsDashboardProps, IProductsDashboardState> {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      items: []
    }
  }

  componentDidMount() {
    if (this.props.listName || this.props.maxItem) {
      this.getListItems().then(response => {
        console.log('Data is ', response.value);
        this.setState({ items: response.value })
      }, error => console.error('Oops error occured', error))
    }
  }

  private getListItems() {
    let url = this.props.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${this.props.listName}')/items?$top=${this.props.maxItem}`;

    return this.props.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  public render(): React.ReactElement<IProductsDashboardProps> {
    console.log('State Value is', this.state);
    return (
      <div className="container-fluid">
        <h2>Products Dashboard</h2>
       
        <Products items={this.state.items}></Products>
        
      </div>
    );
  }
}
