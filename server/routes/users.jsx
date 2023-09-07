import express from "express";
import { renderToStaticMarkup } from "react-dom/server";

import Layout from "../components/Layout";
import Roles from "../components/Roles";
import UserRoles from "../components/UserRoles.jsx";
import {
  getAccessToken,
  getAllRoles,
  getUser,
  addRoleToUser,
  deleteUserRole,
} from "../auth0";

const router = express.Router();

router.post("/:id/roles/:roleId/add", async (req, res) => {
  try {
    const { id, roleId } = req.params;
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;

    const token = await getAccessToken(domain, clientId, clientSecret);

    await addRoleToUser(token, id, roleId);

    res.redirect(`/users/${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});
router.post("/:id/roles/:roleId/delete", async (req, res) => {
  try {
    const { id, roleId } = req.params;
    const domain = process.env.AUTH0_DOMAIN;
    const clientId = process.env.AUTH0_CLIENT_ID;
    const clientSecret = process.env.AUTH0_CLIENT_SECRET;

    const token = await getAccessToken(domain, clientId, clientSecret);

    await deleteUserRole(token, id, roleId);

    res.redirect(`/users/${id}`);
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

    const allRoles = await getAllRoles(token);
    const filteredRoles = allRoles.filter(
      (role) => !user.roles.includes(role.id),
    );
    res.send(
      renderToStaticMarkup(
        <Layout title={`${id}`}>
          <UserRoles userId={id} roles={user.roles} />
          <Roles userId={id} roles={filteredRoles} />
        </Layout>,
      ),
    );
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
