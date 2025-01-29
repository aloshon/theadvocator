import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:8080";

/** AdvocatorAPI Class. 
 *
 * Static class tying together methods used to get/send datat to the Advocator API
 */

class AdvocatorAPI {

  static async request(endpoint, data = {}, method = "get") {
    const url:string = `${BASE_URL}/${endpoint}`;
    const params:Object = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params })).data;
    } catch (err: any) {
      console.error("AdvocatorAPI Error:", err.response);
      let message:string = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual AdvocatorAPI routes

  /** Initiate role on chat gpt 
   */

  static async initiateAdvocator() {
    let res = await this.request(`/start`);
    return res.response;
  }
}

export default AdvocatorAPI;