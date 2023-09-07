import express from "express";
import { renderToStaticMarkup } from "react-dom/server";

import Layout from "../components/Layout";
import UserRoles from "../components/UserRoles.jsx";
import {
  getAccessToken,
  getUser,
  getUserRoles,
  updateUserRoles,
} from "../auth0";

const router = express.Router();

router.post("/:id/roles/:roleId", async (req, res) => {
  try {
    const { id, roleId } = req.params;
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;

    const token = await getAccessToken(domain, clientId, clientSecret);

    await updateUserRoles(token, id, roleId);
    console.log(`Deleted role ${roleId} for user ${id}`);
    res.redirect(`/`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;

    const token = await getAccessToken(domain, clientId, clientSecret);
    const user = await getUser(token, id);
    res.send(
      renderToStaticMarkup(
        <Layout title={`${id}`}>
          <UserRoles userId={id} roles={user.roles} />
        </Layout>,
      ),
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
