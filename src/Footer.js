import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import { FaGithub } from "react-icons/fa";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer>
          <Container className="text-center">
            <a className="github" href="https://github.com/jgalmeida93">
              <FaGithub className="icon-github" />
            </a>
          </Container>
        </footer>
      </div>
    );
  }
}

export default Footer;
