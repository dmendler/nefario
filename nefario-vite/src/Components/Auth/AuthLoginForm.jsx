/* STATELESS CHILD COMPONENT */
const AuthLoginForm = ({ user, onChange, onSubmit, onBack }) => {
  return (
    <center>
      <div class="card p-2" style={{ width: "300px", marginTop: "30px", border: "2px solid gray" }}>
        <form onSubmit={onSubmit}>
          <div>
            <h2>Login</h2>
            <label>Email</label>
            <br />
            <input
              type="email"
              value={user.email}
              onChange={onChange}
              name="email"
              placeholder="email"
              required
            />
          </div>
          <div>
            <label>Password</label>
            <br />
            <input
              type="password"
              value={user.password}
              onChange={onChange}
              name="password"
              placeholder="password"
              required
            />
          </div>
          <br />
          <div>
            <button type="submit" class="btn btn-primary btn-sm" onSubmit={onSubmit}>
              Submit
            </button>
          </div>
          <div>
            <button type="button" class="btn btn-link" onClick={onBack}>Back</button>
          </div>
        </form>
      </div>
    </center>
  );
};

export default AuthLoginForm;
