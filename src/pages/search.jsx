import React, { useEffect, useState } from "react";
import EmailTable from "../components/email-table";
import Logout from "../components/logout";
import useEmails from "../hooks/useEmails";

const SearchPage = ({ g_user, g_auth }) => {
  const [search, setSearch] = useState("");
  const emails = useEmails(g_user, g_auth);

  useEffect(() => {
    emails.requestAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSearch = (e) => {
    e.preventDefault();
    emails.search(search);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "black",
        }}
      >
        <h1 style={{ color: "black", padding: 20, fontSize: 30 }}>
          Welcome {g_user.name}!
        </h1>
        <img src={g_user.image} alt="account" />
        <p style={{ color: "black", padding: 15, fontSize: 18 }}>
          Inbox for: {g_user.email}
        </p>
      </div>
      <Logout />
      <div
        style={{
          float: "left",
          display: "flex",
          padding: 20,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "row",
        }}
      >
        <form onSubmit={onSearch}>
          <input
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
            placeholder="Search"
            className="search-bar"
          />
          <input type="submit" value="Search" className="page-btn" />
          {emails.nextPageId && (
            <input
              type="button"
              className="page-btn"
              onClick={() => emails.requestAll(emails.nextPageId)}
              value="Next Page"
            />
          )}
        </form>
        <span>
          Loaded: {emails.loaded}/{emails.count} (
          {(emails.loaded / emails.count) * 100}%)
        </span>
      </div>
      <EmailTable
        emails={emails.list}
        loading={emails.loading}
        search={search}
      />
    </div>
  );
};

export default SearchPage;
