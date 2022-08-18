import { Buffer } from "buffer";

export default class Email {
  /**
   * Parse the email from the Google Gmail API into something useful in this app
   * @param {Object} mail
   * @returns {{id: String, threadId: String, lables: Array<String>, snippet: String, headers: Object, body: String}}
   */
  static parse(mail) {
    const plainBodyParts = mail.payload.parts
      ? mail.payload.parts.find((x) => x.mimeType === "text/plain") || {}
      : { body: { data: mail.payload.body.data } };
    return {
      id: mail.id,
      threadId: mail.threadId,
      lables: mail.labelIds,
      snippet: mail.snippet,
      headers: mail.payload.headers
        .map((h) => ({
          [h["name"].toLowerCase()]: h["value"],
        }))
        .reduce((acc, item) => {
          const key = Object.keys(item)[0];
          acc[key] = item[key];
          return acc;
        }, {}),
      body: Buffer.from(plainBodyParts?.body?.data || "", "base64").toString(
        "utf-8"
      ),
    };
  }
}
