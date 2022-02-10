import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from "@microsoft/sp-loader";


import ProductsDashboard from './components/ProductsDashboard';
import { IProductsDashboardProps } from './components/IProductsDashboardProps';

export interface IProductsDashboardWebPartProps {
  description: string;
  listName: string;
  maxItem: number;
}

export default class ProductsDashboardWebPart extends BaseClientSideWebPart<IProductsDashboardWebPartProps> {

  public render(): void {
    SPComponentLoader.loadCss("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css");

    const element: React.ReactElement<IProductsDashboardProps> = React.createElement(
      ProductsDashboard,
      {
        description: this.properties.description,
        context: this.context,
        listName: this.properties.listName,
        maxItem: this.properties.maxItem
      }
    );

    ReactDom.render(element, this.domElement);
  }  

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Webpart Settings"
          },
          groups: [
            {
              groupName: "General Settings",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Title"
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
