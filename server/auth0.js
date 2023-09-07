import request from "superagent";

export async function updateUserRoles(accessToken, userId, roleIdToDelete) {
  const url = `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`;
  await request
    .delete(url)
    .set("authorization", `Bearer ${accessToken}`)
    .set("content-type", "application/json")
    .send({
      roles: [roleIdToDelete],
    });
}

export async function getUserRoles(accessToken, userId) {
  const url = `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}/roles`;
  const roles = await request
    .get(url)
    .set("authorization", `Bearer ${accessToken}`)
    .set("content-type", "application/json");

  return roles.body;
}

export async function getUser(accessToken, userId) {
  const url = `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`;
  const res = await request
    .get(url)
    .set("authorization", `Bearer ${accessToken}`)
    .set("content-type", "application/json");

  const roles = await getUserRoles(accessToken, userId);
  const user = {
    ...res.body,
    roles,
  };

  return user;
}

export async function getUsers(accessToken) {
  const url = `https://${process.env.AUTH0_DOMAIN}/api/v2/users`;
  const users = await request
    .get(url)
    .set("authorization", `Bearer ${accessToken}`)
    .set("content-type", "application/json");

  return users.body;
}

export async function getAccessToken(domain, clientId, clientSecret) {
  const url = `https://${domain}/oauth/token`;
  // aquire token
  const token = await request
    .post(url)
    .set("content-type", "application/json")
    .send({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
      audience: `https://${domain}/api/v2/`,
    });

  return token.body.access_token;
}
