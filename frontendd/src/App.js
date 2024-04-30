import * as React from "react";
import { Map, NavigationControl, Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import StarIcon from "@mui/icons-material/Star";
import { format } from "timeago.js";
import "./App.css";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const pinAddSuccess = () => {
  toast.success("Added pin!");
};

const userNotLoggedIn = () => {
  toast.warning("Log into account to make pins");
};

const userLoggedOut = (userS) => {
  toast.warning("Logout from " + userS);
};

const pinAddFailure = () => {
  toast.error("Couldnt add pin. Please fill all data fields");
};

function App() {
  const [pins, setPins] = React.useState([]);
  const [viewPort, setViewPort] = React.useState({
    longitude: 12.4,
    latitude: 37.8,
    zoom: 14,
  });

  const [currentPlaceId, setCurrentPlaceId] = React.useState(null);
  const [newPlace, setNewPlace] = React.useState(null);
  const [title, setTitle] = React.useState(null);
  const [descr, setDescr] = React.useState(null);
  const [rating, setRating] = React.useState(1);
  const [currentUser, setCurrentUser] = React.useState(null);

  const [showRegister, setShowRegister] = React.useState(false);
  const [showLogin, setShowLogin] = React.useState(false);

  const handleMarkerClicked = (id, lat, lon) => {
    setCurrentPlaceId(id);
  };

  const handleLogout = () => {
    userLoggedOut(currentUser);
    setCurrentUser(null);
  };

  React.useEffect(() => {
    const getPins = async () => {
      try {
        const res = await axios.get("/pins");
        console.log(res);
        setPins(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);
  const handleAddClick = (e) => {
    console.log(e);
    let lat = e.lngLat.lat;
    let long = e.lngLat.lng;
    setNewPlace({
      lat: lat,
      lng: long,
    });
  };
  const handlePinSubmit = async (e) => {
    e.preventDefault();

    const newPin = {
      userName: currentUser,
      title: title,
      rating: rating,
      descr: descr,
      lat: newPlace.lat,
      lon: newPlace.lng,
    };

    try {
      if (!currentUser) {
        userNotLoggedIn();
      } else {
        const res = await axios.post("/pins", newPin);
        setPins([...pins, res.data]);
        setNewPlace(null);

        pinAddSuccess();

        setRating(1);
        setDescr(null);
        setTitle(null);
      }
    } catch (err) {
      pinAddFailure();
      console.log(err);
    }
  };

  return (
    <div>
      <Map
        initialViewState={{ viewPort }}
        container={"map"}
        projection={"globe"}
        mapboxAccessToken="pk.eyJ1IjoidGhhbmFmZW4iLCJhIjoiY2x2aDV6cmkyMTIydjJrbzQ3aWRpbTgxbSJ9.0ZZ7j8k9n7M5s0ppQB7-Ow"
        style={{ width: "100vw", height: "100vh" }}
        mapStyle="mapbox://styles/thanafen/clvh6ht4m018h01qr01sl64a8"
        onDblClick={handleAddClick}
      >
        <ToastContainer position="top-left" theme="dark" />
        <NavigationControl></NavigationControl>

        {pins.map((p) => (
          <>
            <Marker
              key={p._id}
              longitude={p.lon}
              latitude={p.lat}
              anchor="center"
              data-id={p._id} // Add a data attribute with the _id of the pin
            >
              <LocationOnIcon
                className="icon"
                onClick={() => handleMarkerClicked(p._id, p.lat, p.lon)}
                style={{
                  fontSize: viewPort.zoom * 2,
                  color: p.userName === currentUser ? "tomato" : "slateblue",
                }}
              />
            </Marker>
            {p._id === currentPlaceId && (
              <Popup
                longitude={p.lon}
                latitude={p.lat}
                closeOnClick={false}
                closeOnMove={false}
                anchor="left"
              >
                <div className="card">
                  <label>Place</label>
                  <h4 className="place">{p.title}</h4>
                  <label>Review</label>
                  <p className="descr">{p.descr}</p>
                  <label>Rating</label>
                  <div className="stars">
                    {Array(p.rating).fill(<StarIcon className="star" />)}
                  </div>
                  <label>Information</label>
                  <div className="info">
                    <span className="username">
                      Created by <b>{p.userName}</b>
                    </span>
                    <span className="date">{format(p.CreatedAt)}</span>
                  </div>
                </div>
              </Popup>
            )}
          </>
        ))}
        {newPlace && (
          <Popup
            longitude={newPlace.lng}
            latitude={newPlace.lat}
            closeOnClick={false}
            closeOnMove={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
          >
            <div>
              <form onSubmit={handlePinSubmit}>
                <label>Title</label>
                <input
                  placeholder="Enter a title..."
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label>Review</label>
                <textarea
                  placeholder="Say something about this place..."
                  onChange={(e) => setDescr(e.target.value)}
                />
                <label>Rating</label>
                <select onChange={(e) => setRating(e.target.value)}>
                  <option value="1">1 </option>
                  <option value="2">2 </option>
                  <option value="3">3 </option>
                  <option value="4">4 </option>
                  <option value="5">5 </option>
                </select>
                <button className="submitButton" type="submit">
                  Add Pin
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>

      <div className="footer">
        <div className="footer_down">
          {currentUser ? (
            <button className="button logout" onClick={handleLogout}>
              Log out
            </button>
          ) : (
            <div>
              <button
                className="button login"
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Login
              </button>

              <button
                className="button register"
                onClick={() => {
                  setShowRegister(true);
                }}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </div>
      {showRegister && <Register setShowRegister={setShowRegister} />}
      {showLogin && (
        <Login setShowLogin={setShowLogin} setCurrentUser={setCurrentUser} />
      )}
    </div>
  );
}

export default App;
