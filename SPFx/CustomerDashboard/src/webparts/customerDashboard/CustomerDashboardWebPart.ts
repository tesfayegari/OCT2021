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

    if(this.properties.listName && this.properties.maxItem){
      this.getListItems()
      .then(response => {
        console.log('Data is ', response.value);
        let itemsHtml = "<h2>Customer Information:</h2>";
        for(let item of response.value){
          itemsHtml += `<div class="alert alert-primary" role="alert">
                          ${item.Title}
                        </div>`
        }
        this.domElement.innerHTML = itemsHtml;

      }, 
            error => console.error('Oops error occured', error))
    }else{
      console.log('Please Type List name and max item');
    }
    
  }



  private getListItems() {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/getbytitle('${this.properties.listName}')/items?$top=${this.properties.maxItem}`, SPHttpClient.configurations.v1)
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
