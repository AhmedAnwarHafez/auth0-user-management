function Layout({ children, title }) {
  return (
    <html>
      <head>
        <title>{title || "Auth0 user Management"}</title>
        <script
          src="https://unpkg.com/htmx.org@1.9.5"
          integrity="sha384-xcuj3WpfgjlKF+FXhSQFQ0ZNr39ln+hwjN3npfM9VBnUskLolQAcN80McRIVOPuO"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body hx-boost="true">{children}</body>
    </html>
  );
}

export default Layout;
