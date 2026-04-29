import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'b86a154941599d280d31f3d8c606dec94ee13b0c', queries,  });
export default client;
  