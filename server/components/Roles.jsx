function Roles({ userId, roles }) {
  return (
    <>
      <h2>Available</h2>
      <ul>
        {roles.map((role) => (
          <li key={role.id} style={{ display: "flex" }}>
            <p>
              {role.name} ({role.description})
            </p>
            <form
              action={`/users/${userId}/roles/${role.id}/add`}
              method="post"
            >
              <button type="submit">Add</button>
            </form>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Roles;
