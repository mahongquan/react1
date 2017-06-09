/* eslint-disable no-undef */
import queryString from 'query-string';
function post(url,data,cb) {
  var method="POST"
  if (data.id){
    method="PUT"
  }
  return fetch(url,
  {
      method: method,
      credentials: 'include',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(data)
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function contacts(query, cb) {
  return fetch(`/rest/Contact?baoxiang=${query}&limit=10`, {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function items(query, cb) {
  return fetch(`/rest/Item?name=${query}`, {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function login_index( cb) {
  return fetch('/rest/login_index', {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function logout( cb) {
  return fetch('/rest/logout', {
    credentials: 'include',
    accept: 'application/json',
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function login(username,password,cb) {
  var payload = {
    username: username,
    password: password,
  };
  return fetch("/rest/login",
  {
      method: "POST",
      credentials: 'include',
      headers: {'Content-Type':'application/x-www-form-urlencoded'},
      body: queryString.stringify( payload )
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb);
}
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  console.log(error); // eslint-disable-line no-console
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = {contacts,items,login_index,login,logout,post};
export default Client;
