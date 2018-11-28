import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import App from "../App";
import * as api from "../api";

jest.mock("../api");

afterAll(() => {
  jest.restoreAllMocks();
});

describe("initial render <App />", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("matches snapshot", () => {
    // https://jestjs.io/docs/en/tutorial-react#snapshot-testing
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("gets character's films", () => {
  it("has results for valid api call", async () => {
    // Arrange
    const characterName = 'Luke Skywalker'
    const characterUrl = 'https://character-api'
    const characterApiMockResponse = { films: ["https://fakeurl1", "https://fakeurl2"]};
    api.characterAPIcall.mockResolvedValue(characterApiMockResponse);

    const filmDataAPIMockResponse = [
      { title: 'the first movie', release_date: '1977-05-25'},
      { title: 'the second movie', release_date: '1979-05-25'},
      { title: 'the third movie', release_date: '1980-05-25'}
    ];
    api.filmDataAPIcall.mockResolvedValue(filmDataAPIMockResponse);

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    };

    const formattedResponse = filmDataAPIMockResponse.map(res => {
      let date = new Date(res.release_date);
      return {
        title: res.title,
        date: date.toLocaleDateString("en-US", options)
      };
    });

    // Act
    const wrapper = shallow(<App />);
    await wrapper
        .find("Character")
        .first()
        .prop('getCharacterInfo')(characterUrl, characterName)

    // Wait for state to update
    await wrapper.update();

    // Assert
    expect(api.characterAPIcall).toBeCalledWith(characterUrl)
    expect(api.filmDataAPIcall).toBeCalledWith(characterApiMockResponse.films)
    expect(wrapper.find('Films').prop('filmData')).toEqual(formattedResponse)
    expect(wrapper.find('Films').prop('character')).toEqual(characterName)
  })

  it("displays error for invalid api call", async () => {
    const characterUrl = 'https://unknown-character'
    const characterName = 'Obi-wan Kenobi'
    const mockError = new Error();
    api.characterAPIcall.mockRejectedValue(mockError);

    const wrapper = shallow(<App />);
    await wrapper
        .find("Character")
        .at(2)
        .prop('getCharacterInfo')(characterUrl, characterName)

    await wrapper.update();

    expect(api.characterAPIcall).toBeCalledWith(characterUrl)
    expect(wrapper.find('.error-msg').text()).toEqual(`No data found for ${characterName}`)
  })
})
