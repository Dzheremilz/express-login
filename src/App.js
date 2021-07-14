import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    fetch("http://172.31.103.30:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(`Error ${response.statusText}`);
        }
        return response.text();
      })
      .then((result) => {
        setLogin(result);
        setError(false);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <section>
      <h2 className="text-center">Log in</h2>
      {login ? (
        <p className="text-center">{login}</p>
      ) : (
        <>
          <form className="row g-3 mt-3" onSubmit={handleFormSubmit}>
            <div className="col-auto">
              <label htmlFor="username" className="visually-hidden">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="username"
                required
              />
            </div>
            <div className="col-auto">
              <label htmlFor="password" className="visually-hidden">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">
                Log in
              </button>
            </div>
          </form>
        </>
      )}
      {error && <p className="alert alert-danger">{error}</p>}
    </section>
  );
}

export default App;
