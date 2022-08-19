import React, { Fragment, useEffect, useState } from "react";
import Highlight from "react-highlighter";

/**
 *
 * @param {{emails: Array<{id: String, threadId: String, lables: Array<String>, snippet: String, headers: Object, body: String}>, loading: Boolean, search: String}} props
 */
const EmailTable = (props) => {
  const [body, setBody] = useState("");
  useEffect(() => {
    window.onclick = (event) => {
      if (event.target == document.getElementById("detailsModal")) {
        document.body.style.overflow = "auto";
        var modal = document.getElementById("detailsModal");
        modal.style.display = "none";
      }
    };
  }, []);

  if (props.loading)
    return (
      <table className="email-table">
        <thead>
          <tr>
            <th>From</th>
            <th>Subject</th>
            <th>Body Snippet</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Loading...</td>
            <td>Loading...</td>
            <td className="email-content">Loading...</td>
          </tr>
          <tr>
            <td>Loading...</td>
            <td>Loading...</td>
            <td className="email-content">Loading...</td>
          </tr>
          <tr>
            <td>Loading...</td>
            <td>Loading...</td>
            <td className="email-content">Loading...</td>
          </tr>
        </tbody>
      </table>
    );

  const openModal = (bdy) => {
    setBody(bdy);
    document.body.style.overflow = "hidden";
    var modal = document.getElementById("detailsModal");
    modal.style.display = "block";
  };

  const closeModal = () => {
    document.body.style.overflow = "auto";
    var modal = document.getElementById("detailsModal");
    modal.style.display = "none";
  };

  return (
    <Fragment>
      <table className="email-table" id="email-tbl">
        <thead>
          <tr>
            <th>From</th>
            <th>Subject</th>
            <th>Body Snippet</th>
          </tr>
        </thead>
        <tbody>
          {props.emails.map((email) => (
            <tr key={email.id} onClick={() => openModal(email.body)}>
              <td>
                <Highlight search={props.search}>
                  {email.headers.from}
                </Highlight>
              </td>
              <td>
                <Highlight search={props.search}>
                  {email.headers.subject}
                </Highlight>
              </td>
              <td className="email-content">
                <Highlight search={props.search}>{email.snippet}</Highlight>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="detailsModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <Highlight search={props.search}>
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </Highlight>
        </div>
      </div>
    </Fragment>
  );
};

export default EmailTable;
