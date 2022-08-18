import React, { useEffect, useState } from "react";
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
      <Logout />
      <pre>{JSON.stringify(g_user, null, 2)}</pre>
      <pre>{JSON.stringify(g_auth, null, 2)}</pre>
      <form onSubmit={onSearch}>
        <input
          value={search}
          onChange={({ target: { value } }) => setSearch(value)}
          placeholder="Search"
        />
        <input type="submit" value="Search" />
      </form>
      <p>Next Page ID: {emails.nextPageId}</p>
      {emails.loading ? (
        <h1>Loading Emails...</h1>
      ) : (
        <pre>{JSON.stringify(emails.list, null, 2)}</pre>
      )}
    </div>
  );
};

export default SearchPage;
