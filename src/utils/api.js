export const baseUrl = 'http://localhost:3001';

export const headers = {
  'Content-Type': 'application/json',
};

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }, token) =>
  fetch(`${baseUrl}/items`, {
    method: 'POST',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);

export const removeItem = (itemId, token) =>
  fetch(`${baseUrl}/items/${itemId}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);

export const likeItem = (itemId, token) =>
  fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: 'PUT',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);

export const dislikeItem = (itemId, token) =>
  fetch(`${baseUrl}/items/${itemId}/likes`, {
    method: 'DELETE',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);

export const updateUserInfo = ({ name, avatar }, token) =>
  fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      ...headers,
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, avatar }),
  }).then(handleServerResponse);
