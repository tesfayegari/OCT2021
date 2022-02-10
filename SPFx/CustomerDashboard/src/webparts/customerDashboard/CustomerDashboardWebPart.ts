import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';



export interface ICustomerDashboardWebPartProps {
  description: string;
  listName: string;
  maxItem: number;
  dropdown: string;
}

export default class CustomerDashboardWebPart extends BaseClientSideWebPart<ICustomerDashboardWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");



    this.domElement.innerHTML = `
    <h2>Customer Dashboard Coming soon</h2>
    <div class="alert alert-primary" role="alert">
      This is a primary alert—check it out!
    </div>
    `;

    if (this.properties.listName && this.properties.maxItem) {
      this.getListItems()
        .then(response => {
          console.log('Data is ', response.value);
          let itemsHtml = `<h2>Product Dashboard</h2>
                          <div class="container-fluid">
                             <div class="row">`;
          for (let item of response.value) {
            itemsHtml += this.getProductHtml(item);
          }
          this.domElement.innerHTML = itemsHtml + '</div></div>';

        },
          error => console.error('Oops error occured', error))
    } else {
      console.log('Please Type List name and max item');
    }

  }

  private getProductHtml(item) {
    return `
          <div class="col col-md-4 mb-2">
            <div class="card">
              <img class="card-img-top" src="${item.field_5}" alt="Card image cap">
              <div class="card-body">
                <h4 class="card-title"><a href="/sites/OCT2021Communication/Lists/DummyTestData1/DispForm.aspx?ID=${item.Id}" target="_blank" title="View Product">${item.field_1}</a></h4>
                <p class="card-text">${item.field_2}</p>
                <div class="row">
                  <div class="col-6">
                    <p class="btn btn-danger btn-block">$${item.field_4}</p>
                  </div>
                  <div class="col-6">
                    <a href="#" class="btn btn-success btn-block">Add</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
  }



  private getListItems() {
    let url = this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${this.properties.listName}')/items?$top=${this.properties.maxItem}`;

    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }


  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Customer Dashboard Webpart"
          },
          groups: [
            {
              groupName: "General Information",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Webpart Description'
                }),
                PropertyPaneTextField('listName', {
                  label: 'Type Your List Name',
                  placeholder: 'List Name'
                }),
                PropertyPaneSlider('maxItem', {
                  label: "Max Items",
                  min: 1,
                  max: 20,
                  value: 1,
                  showValue: true,
                  step: 1
                }),
                PropertyPaneDropdown('dropdown', {
                  label: 'Select Students',
                  options: [
                    { key: 'Item1', text: 'Tesfaye' },
                    { key: 'Item2', text: 'Berhan' },
                    { key: 'Item3', text: 'Dawit' },
                    { key: 'Item4', text: 'Bereket' },
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
