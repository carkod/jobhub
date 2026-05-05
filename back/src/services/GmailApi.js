import { handleResponse } from "../utils.js";

export default class GmailApi {
  constructor(access_token, limit = 100) {
    this.access_token = access_token;
    this.limit = limit;
  }

  getAuthHeaders(extra = {}) {
    return {
      Authorization: `Bearer ${this.access_token}`,
      ...extra,
    };
  }

  async startWatch(topicName, labelIds = ["INBOX"]) {
    const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/watch", {
      method: "POST",
      headers: this.getAuthHeaders({ "Content-Type": "application/json" }),
      body: JSON.stringify({ topicName, labelIds }),
    });

    return handleResponse(response);
  }

  async fetchHistory(startHistoryId, pageToken = null, history = []) {
    let url = `https://gmail.googleapis.com/gmail/v1/users/me/history?startHistoryId=${startHistoryId}&maxResults=${this.limit}`;

    if (pageToken) {
      url += `&pageToken=${pageToken}`;
    }

    const response = await fetch(url, {
      headers: this.getAuthHeaders(),
    });

    const data = await handleResponse(response);
    const currentHistory = data.history || [];
    const all = history.concat(currentHistory);

    if (data.nextPageToken) {
      return this.fetchHistory(startHistoryId, data.nextPageToken, all);
    }

    return {
      history: all,
      historyId: data.historyId,
    };
  }

  decodePubSubMessage(pubSubPayload) {
    const data = pubSubPayload?.message?.data;
    if (!data) return null;

    try {
      const decoded = Buffer.from(data, "base64").toString("utf-8");
      return JSON.parse(decoded);
    } catch (error) {
      return null;
    }
  }

  extractMessageIdsFromHistory(history = []) {
    const ids = new Set();

    history.forEach((entry) => {
      (entry.messagesAdded || []).forEach((added) => {
        if (added?.message?.id) ids.add(added.message.id);
      });
    });

    return Array.from(ids);
  }

  async fetchIndividualEmail(messageId) {
    const response = await fetch(
      `https://www.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      { headers: this.getAuthHeaders() }
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
      headers: this.getAuthHeaders(),
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
