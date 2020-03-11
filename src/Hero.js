import React, { Component } from "react";
import "./App.css";
import {
  Container,
  Dropdown,
  Image,
  GridRow,
  Grid,
  GridColumn
} from "semantic-ui-react";

class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heroes: [],
      heroImage: [],
      result: "",
      singleHero: {
        name: "",
        image: "",
        description: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const timeStamp = "1583460885";
    const apiKey = "246e196d508fa427176b7bc94ae03637";
    const md5 = "9905624fce162ae6ce4177dda41c0302";

    let initialHeroes = [];
    let arrImage = [];

    fetch(
      `https://gateway.marvel.com/v1/public/characters?ts=${timeStamp}&apikey=${apiKey}&hash=${md5}&limit=30`
    )
      .then(response => {
        return response.json();
      })
      .then(jsonParsed => {
        arrImage = jsonParsed.data.results.map(hero => {
          return `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
        });
        initialHeroes = jsonParsed.data.results.map(hero => {
          return hero;
        });
        this.setState({
          heroes: initialHeroes
        });
        this.setState({
          heroImage: arrImage
        });
      });
  }

  handleChange(event) {
    this.setState({
      result: event.target.innerText
    });
    for (let i = 0; i < this.state.heroes.length; i++) {
      let nameHero = this.state.heroes.map(name => {
        return name.name;
      });
      if (event.target.innerText === nameHero[i]) {
        return this.setState({
          singleHero: {
            name: this.state.heroes[i].name,
            image: `${this.state.heroes[i].thumbnail.path}.${this.state.heroes[i].thumbnail.extension}`,
            description: this.state.heroes[i].description
          }
        });
      }
    }
  }
  render() {
    //console.log(this.state.heroes);
    const optionsSelect = this.state.heroes.map(hero => {
      return { key: hero.id, value: hero.id, text: hero.name };
    });

    let imageHero;

    if (this.state.singleHero.image === "") {
      imageHero = <h1 className="choose-text">Choose a hero</h1>;
    } else {
      imageHero = (
        <Image src={this.state.singleHero.image} centered size="large" />
      );
      //   imageHero = <img src={this.state.singleHero.image} alt="ae"/>
    }

    return (
      <div>
        <header>
          <Container>
            <Grid
              centered
              verticalAlign="middle"
              columns={1}
              className="header"
            >
              <GridRow>
                <GridColumn>
                  <Dropdown
                    className="dropdown"
                    placeholder="Choose your hero"
                    fluid
                    selection
                    options={optionsSelect}
                    onChange={this.handleChange}
                  />
                </GridColumn>
              </GridRow>
            </Grid>
          </Container>
        </header>

        <Container>
          <main>
            <h1 className="title-hero">{this.state.singleHero.name}</h1>
            <p className="description-hero">
              {this.state.singleHero.description}
            </p>
            <br />

            {imageHero}
          </main>
        </Container>

        <Container className="text-center">
          <h6>
            Note: Some heroes have no image and some heroes have no description
          </h6>
        </Container>
      </div>
    );
  }
}
export default Hero;

// 9905624fce162ae6ce4177dda41c0302 md5

// 246e196d508fa427176b7bc94ae03637 public

// d06ddd840dadeb41e3bdd4e16de61848cafaad64 private
