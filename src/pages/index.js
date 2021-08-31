import React from "react";
import { Helmet } from "react-helmet";

import "nes.css/css/nes.min.css";
import "../styles/main.css";

export default function App() {
  const [state, setState] = React.useState({ celsius: "", farenheit: "" });
  
  function handleChange(event) {
    const { name, value } = event.target;

    handleReset();    

    setState(prevState => ({
      ...prevState,
      [name]: value
    }));

  }

  function handleReset() {
    setState({ celsius: "", farenheit: "" });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const requestOptions = {
      method: `POST`,
      body: JSON.stringify(state),
      headers: {
        "content-type": `application/json`,
      },
    };

    const response = await fetch(`/api/temperature`, requestOptions);
    const json = await response.json();

    setState({ celsius: "", farenheit: "" });
    setState(json);
  }

  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Temperature Converter</title>
      </Helmet>
      <header>
        <h1>Temperature Converter</h1>
      </header>
      <main>
        <h2>Insert temperature in <strong>ONE</strong> of the boxes to <span>convert</span> to celsius or farenheit</h2>
        <form onSubmit={handleSubmit}>
          <section>
            <input name="celsius" type="number" onChange={handleChange} value={state.celsius} placeholder="Celsius" />
          </section>
          
          <section>
            <input name="farenheit" type="number" onChange={handleChange} value={state.farenheit} placeholder="Farenheit" />
          </section>

          <section>
            <input type="submit" value="Convert" />
            <input type="button" value="Clear" onClick={handleReset} />
          </section>
        </form>
      </main>
      <footer>
        <p>CSS by <br /><a href="https://github.com/nostalgic-css">https://github.com/nostalgic-css</a></p>
        <p>Design and code by <br /><a href="https://github.com/haugseth">https://github.com/haugseth</a></p>
      </footer>
    </>
  )
}
