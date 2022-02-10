import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IProductsDashboardProps {
  description: string;
  context: WebPartContext;
  listName: string;
  maxItem: number;
}
