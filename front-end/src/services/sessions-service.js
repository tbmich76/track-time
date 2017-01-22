import * as constants from "../constants";
import axios from "axios";

export class SessionsService {
  constructor() {
    this.apiUrl = constants.API_URL;
  }
  createSession(session) {
    return new Promise(function(resolve, reject) {
      axios.post(this.apiUrl, session).then(function(response) {
        resolve("Saved session successfully");
      }).catch(function(error) {
        console.log(error);
        if (reject) {
          reject("An error occured saving the session");
        }
      });
    }.bind(this));
  }
  getSessions() {
    return new Promise(function(resolve, reject) {
      axios.get(this.apiUrl).then(function(result) {
        var sessions = result.data || [];
        resolve(sessions);
      }).catch(function(error) {
        console.log(error);
        if (reject) {
          reject(error);
        }
      });
    }.bind(this));
  }
  getSession(id) {
    return axios.get(`${this.apiUrl}/${id}`)
    .then(function(result) {
      return result.data
    })
    .catch(function(error) {
      console.log(error);
    });
  }
}
