import { Client, TablesDB, ID } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("atharva-portfolio");

export const tablesDB = new TablesDB(client);
export { ID };

export const DATABASE_ID = "main";
export const MESSAGES_TABLE_ID = "messages";
