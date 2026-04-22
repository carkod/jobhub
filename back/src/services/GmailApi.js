import { handleResponse } from "../utils.js";

const GMAIL_BASE = "https://www.googleapis.com/gmail/v1/users/me";

export default class GmailApi {
  constructor(access_token, limit = 100) {
    this.access_token = access_token;
    this.limit = limit;
  }

  getHeaders() {
    return {
      Authorization: `Bearer ${this.access_token}`,
      "Content-Type": "application/json",
    };
  }

  async startWatch(topicName, labelIds = ["INBOX"]) {
    const response = await fetch(`${GMAIL_BASE}/watch`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify({ topicName, labelIds }),
    });

    return handleResponse(response);
  }

  decodePubSubMessage(pubSubBody = {}) {
    const data = pubSubBody?.message?.data;
    if (!data) {
      return null;
    }

    try {
      const decoded = Buffer.from(data, "base64").toString("utf-8");
      return JSON.parse(decoded);
    } catch (error) {
      return null;
    }
  }

  async fetchHistory(startHistoryId, historyTypes = ["messageAdded"]) {
    if (!startHistoryId) {
      return { history: [], historyId: null };
    }

    const params = new URLSearchParams({ startHistoryId: String(startHistoryId) });
    for (const historyType of historyTypes) {
      params.append("historyTypes", historyType);
    }

    let nextPageToken = null;
    let allHistory = [];
    let newestHistoryId = null;

    do {
      if (nextPageToken) {
        params.set("pageToken", nextPageToken);
      }
      const response = await fetch(`${GMAIL_BASE}/history?${params.toString()}`, {
        headers: this.getHeaders(),
      });

      const data = await handleResponse(response);
      allHistory = allHistory.concat(data.history || []);
      newestHistoryId = data.historyId || newestHistoryId;
      nextPageToken = data.nextPageToken || null;
    } while (nextPageToken);

    return { history: allHistory, historyId: newestHistoryId };
  }

  async fetchIndividualEmail(messageId, format = "full") {
    const response = await fetch(
      `${GMAIL_BASE}/messages/${messageId}?format=${format}`,
      {
        headers: this.getHeaders(),
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
    let url = `${GMAIL_BASE}/messages?q=${query}&maxResults=${this.limit}`;

    if (currentPageToken) {
      url += `&pageToken=${currentPageToken}`;
    }

    const response = await fetch(url, {
      headers: this.getHeaders(),
    });

    const data = await handleResponse(response);

    const messages = data.messages || [];
    const resultSizeEstimate = data.resultSizeEstimate || 0;
    const nextPageToken = data.nextPageToken || null;

    totalItems = totalItems + (parseInt(resultSizeEstimate, 10) - 1);
    allMessages = allMessages.concat(messages);

    if (nextPageToken && this.limit > totalItems) {
      return this.fetchListEmails(query, nextPageToken, totalItems, allMessages);
    }

    return allMessages;
  }

  extractMessageIdsFromHistory(history = []) {
    const ids = new Set();

    for (const item of history) {
      const messageAdded = item?.messagesAdded || [];
      for (const entry of messageAdded) {
        if (entry?.message?.id) {
          ids.add(entry.message.id);
        }
      }
    }

    return Array.from(ids);
  }
}
