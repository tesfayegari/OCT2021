import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";




export interface ICustomerDashboardWebPartProps {
  description: string;
  listName: string;
  sliderproperty: number;
  dropdown: string;
}

export default class CustomerDashboardWebPart extends BaseClientSideWebPart<ICustomerDashboardWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");
    
    this.domElement.innerHTML = `<h2>Customer Dashboard Coming soon</h2>`;
  }

  private getData(){
    return "Tesfaye Gari";
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
                PropertyPaneSlider('sliderproperty',{  
                  label:"Max Items",  
                  min:5,  
                  max:20,  
                  value:5,  
                  showValue:true,  
                  step:1                
                }),
                PropertyPaneDropdown('dropdown', {
                  label:'Select Students',
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
