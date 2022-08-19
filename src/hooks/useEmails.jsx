import { useState } from "react";
import Email from "../helpers/email-parser";

/**
 * Queries the Gmail API with an authed user.
 * @param {Object} g_user The user object returned from logging in
 * @param {Object} g_auth The auth object retuned from loggingin in
 * @returns {{loading: Boolean, list: Array<{id: String, threadId: String, lables: Array<String>, snippet: String, headers: Object, body: String}>, nextPageId: String, requestAll: Function, search: Function, count, Number, loaded: Number}}
 */
const useEmails = (g_user, g_auth) => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState("");
  const [count, setEmailCount] = useState(0);
  const [parsedCount, setParsedCount] = useState(0);

  /**
   * Request all of the emials from the inbox
   * @param {String || null} page next page id
   */
  const requestAll = async (page) => {
    setLoading(true);
    setNextPage("");
    setEmailCount(0);
    setParsedCount(0);
    const messages_raw = await (
      await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${
          g_user.id
        }/messages?maxResults=20${page ? `&pageToken=${page}` : ""}`,
        {
          headers: { Authorization: `Bearer ${g_auth.access_token}` },
        }
      )
    ).json();
    const messages = [];
    var countCompleted = 0;
    if (messages_raw.messages) {
      setEmailCount(messages_raw.messages.length || 0);
      setNextPage(messages_raw.nextPageToken || "");
      for await (var msg of messages_raw.messages) {
        const m = await (
          await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/${g_user.id}/messages/${msg.id}`,
            {
              headers: { Authorization: `Bearer ${g_auth.access_token}` },
            }
          )
        ).json();
        messages.push(Email.parse(m));
        countCompleted++;
        setParsedCount(countCompleted);
      }
      setEmails(messages);
    }
    setLoading(false);
  };

  /**
   * Search inbox for matching emails from query
   * @param {String} query
   */
  const search = async (query = "") => {
    setNextPage("");
    setEmailCount(0);
    setParsedCount(0);
    setLoading(true);
    const messages_raw = await (
      await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${g_user.id}/messages?q=${query}&maxResults=20`,
        {
          headers: { Authorization: `Bearer ${g_auth.access_token}` },
        }
      )
    ).json();
    const messages = [];
    var countCompleted = 0;
    if (messages_raw.messages) {
      setEmailCount(messages_raw.messages.length || 0);
      setNextPage(messages_raw.nextPageToken || "");
      for await (var msg of messages_raw.messages) {
        const m = await (
          await fetch(
            `https://gmail.googleapis.com/gmail/v1/users/${g_user.id}/messages/${msg.id}`,
            {
              headers: { Authorization: `Bearer ${g_auth.access_token}` },
            }
          )
        ).json();
        messages.push(Email.parse(m));
        countCompleted++;
        setParsedCount(countCompleted);
      }
      setEmails(messages);
    }
    setLoading(false);
  };

  return {
    loading,
    list: emails,
    nextPageId: nextPage,
    count,
    loaded: parsedCount,
    requestAll,
    search,
  };
};

export default useEmails;
