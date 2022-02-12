import * as React from 'react';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faTable, faTh } from '@fortawesome/free-solid-svg-icons';

export interface IProductsProps {
  items: any[];
}
export interface IProductsState {
  buttonName: string;
  toggle: boolean;
}


export default class Products extends React.Component<IProductsProps, IProductsState> {
  constructor(props) {
    super(props);
    this.state = {
      buttonName: "Table",
      toggle: true
    }
  }

  handleButton = () => {
    console.log('Button clickied');
    this.setState({ toggle: !this.state.toggle, buttonName: !this.state.toggle ? 'Table' : 'Grid' });
  }



  public render(): React.ReactElement<IProductsProps> {
    return (
      <div className="container-fluid">
        <h2>Products</h2>
        <div>
          <div className="row">
            <div className="col mb-2">
              <button onClick={this.handleButton} className="btn float-right">{this.state.buttonName=='Table'? <FontAwesomeIcon icon={faTable} /> : <FontAwesomeIcon icon={faTh} />}</button>
            </div>
          </div>
          
          {this.state.toggle && <GridProduct items={this.props.items}></GridProduct>}
          {!this.state.toggle && <TableProduct items={this.props.items}></TableProduct>}
        </div>
      </div>

    );
  }
}

const GridProduct = (props) => {
  return (
    <div className="row">
      {props.items.map(item =>
        <div className="col col-md-4 mb-2">
          <div className="card">
            <img className="card-img-top" src={item.field_5} alt="Card image cap" />
            <div className="card-body">
              <h4 className="card-title"><a href="/sites/OCT2021Communication/Lists/DummyTestData1/DispForm.aspx?ID=${item.Id}" target="_blank" title="View Product">{item.field_1}</a></h4>
              <p className="card-text">{item.field_2}</p>
              <div className="row">
                <div className="col-6">
                  <p className="btn btn-danger btn-block">${item.field_4}</p>
                </div>
                <div className="col-6">
                  <a href="#" className="btn btn-success btn-block">Add</a>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>);
}

const TableProduct = (props) => {
  return (
    <div className="row">
      <table className="table">
        <tr>
          <th>Product Name</th>
          <th>Manufacturer</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>

        {props.items.map(item =>
          <tr>
            <td>{item.field_1}</td>
            <td>{item.field_2}</td>
            <td>{item.field_3}</td>
            <td>${item.field_4}</td>
          </tr>

        )}
      </table>
    </div>);
}
