import React from "react";
import styled from "styled-components";
import debounce from "lodash.debounce";
import axios from "axios";
import { ButtonStyles } from "../styled/ButtonStyles";
import { InputStyles, VideoStyles } from "../styled/InputStyles";
import { DropDown, DropDownItem } from "../styled/DropDownStyles";
import Downshift from "downshift";

const SearchStyles = styled.div`
  min-width: 500px;
`;

const {
  REACT_APP_TWITCH_CLIENTID,
  REACT_APP_TWITCH_CLIENTSECRET,
} = process.env;

class Search extends React.Component {
  twitchClient;
  accessToken;

  componentDidMount() {
    console.log("Initializing twitch client");
    axios
      .post(
        "https://id.twitch.tv/oauth2/token?client_id=" +
          REACT_APP_TWITCH_CLIENTID +
          "&client_secret=" +
          REACT_APP_TWITCH_CLIENTSECRET +
          "&grant_type=client_credentials"
      )
      .then((res) => {
        this.accessToken = res.data.access_token;
        console.log("Client init successful");
      })
      .catch((err) => {
        console.error("Error during authentication", err);
      });
  }

  state = {
    items: [],
    imageUrl: "",
    streamerId: null,
    loading: true,
  };

  onChange = debounce(async (e) => {
    console.log("Searching users");
    this.setState({ loading: true });
    let config = {
      headers: {
        Authorization: "Bearer " + this.accessToken,
        "Client-ID": REACT_APP_TWITCH_CLIENTID,
      },
    };
    axios
      .get("https://api.twitch.tv/helix/users?login=" + e.target.value, config)
      .then((res) => {
        // Set streamer data
        const found = res.data.data[0];
        if (found && found.id) {
          this.setState({
            imageUrl: found.profile_image_url,
            streamerId: found.id,
          });
        }

        // if data get vidss
        if (this.state.streamerId) {
          axios
            .get(
              "https://api.twitch.tv/helix/clips?broadcaster_id=" +
                this.state.streamerId,
              config
            )
            .then((res) => {
              this.setState({
                items: res.data.data,
                loading: false,
              });
            })
            .catch((err) => {
              console.error("Error occured while searching clips", err);
              this.setState({ loading: false });
            });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }, 600);

  onThumbnailClick = (e) => {
    window.location = e.target.londesc;
  };

  getVideoThumbnail = (vid) => {
    return (
      <VideoStyles>
        <div className="frame"></div>
        <img
          src={vid.thumbnail_url}
          longdesc={vid.url}
          alt={vid.title}
          className="popout"
          onClick={this.onThumbnailClick}
        />
      </VideoStyles>
    );
  };

  render() {
    const items = this.state.items;
    return (
      <div className="container">
        <Downshift
          itemToString={(item) => (item === null ? "" : item.title)}
          onChange={(selection) => (window.location = selection.url)}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            highlightedIndex,
          }) => (
            <span>
              <SearchStyles>
                <InputStyles collapsed={!(isOpen && !this.state.loading)}>
                  <input
                    {...getInputProps({
                      type: "search",
                      name: "search",
                      placeholder: "Search for your fav streamer...",
                      id: "search",
                      className: this.state.loading ? "loading" : "",
                      onChange: (e) => {
                        e.persist();
                        this.onChange(e);
                      },
                    })}
                  />
                  <ButtonStyles disabled>
                    <svg
                      version="1.1"
                      viewBox="0 0 20 20"
                      x="0px"
                      y="0px"
                      className="svg"
                    >
                      <g>
                        <path
                          fillRule="evenodd"
                          d="M13.192 14.606a7 7 0 111.414-1.414l3.101 3.1-1.414 1.415-3.1-3.1zM14 9A5 5 0 114 9a5 5 0 0110 0z"
                          clipRule="evenodd"
                        ></path>
                      </g>
                    </svg>
                  </ButtonStyles>
                </InputStyles>
              </SearchStyles>

              {isOpen && (
                <DropDown>
                  {items.map((item, ind) => (
                    <DropDownItem
                      {...getItemProps({ item })}
                      key={ind}
                      last={ind === items.length - 1}
                      highlighted={ind === highlightedIndex}
                    >
                      {this.getVideoThumbnail(item)}
                      <div className="info">
                        <h4>{item.title}</h4>
                        <small>{item.creator_name}</small>
                      </div>
                    </DropDownItem>
                  ))}
                  {!this.state.items.length && !this.state.loading && (
                    <DropDownItem>
                      {" "}
                      No clips found for {inputValue}...
                    </DropDownItem>
                  )}
                </DropDown>
              )}
            </span>
          )}
        </Downshift>
      </div>
    );
  }
}

export default Search;
