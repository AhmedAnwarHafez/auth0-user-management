import express from "express";
import { renderToString } from "react-dom/server";
import { getAccessToken, getUsers } from "./auth0";

import Layout from "./components/Layout.jsx";

import users from "./routes/users.jsx";

const server = express();
server.use(express.urlencoded({ extended: true }));

server.use("/users", users);

server.get("/", async (_, res) => {
  const domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_CLIENT_ID;
  const clientSecret = process.env.AUTH0_CLIENT_SECRET;

  const token = await getAccessToken(domain, clientId, clientSecret);
  const users = await getUsers(token);

  res.send(
    renderToString(
      <Layout title="All users">
        <ul>
          {users.map((user) => (
            <li key={user.user_id}>
              <a href={`/users/${user.user_id}`}>
                <p>{user.email}</p>
              </a>
            </li>
          ))}
        </ul>
      </Layout>,
    ),
  );
});

export default server;
