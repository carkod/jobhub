import { handleResponse } from "../utils";

export default class GmailApi {
  constructor(access_token, limit = 100) {
    this.access_token = access_token;
    this.limit = limit;
  }

  async fetchIndividualEmail(messageId) {
    const response = await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      {
        headers: {
          Authorization: `Bearer ${this.access_token}`,
        },
      }
    );
    const data = await handleResponse(response);
    return data;
  }

  async fetchListEmails(
    query = "",
    currentPageToken = null,
    totalItems = 0,
    allMessages = []
  ) {
    let url = `https://www.googleapis.com/gmail/v1/users/me/messages?q=${query}&maxResults=${this.limit}`;

    if (currentPageToken) {
      url += `&pageToken=${currentPageToken}`;
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.access_token}`,
      },
    });

    const data = await handleResponse(response);

    const messages = data.messages || [];
    const resultSizeEstimate = data.resultSizeEstimate || 0;
    const nextPageToken = data.nextPageToken || null;

    totalItems = totalItems + (parseInt(resultSizeEstimate) - 1);
    allMessages = allMessages.concat(messages);

    if (nextPageToken && this.limit > totalItems) {
      await this.fetchListEmails(query, nextPageToken, totalItems, allMessages);
    }

    return allMessages;
  }
}
