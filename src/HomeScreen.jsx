import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { rest, result } from "lodash";
import React, { useEffect, useState } from "react";
import { paginate } from "./components/paginate";
import Pagination from "./components/Pagination";

const HomeScreen = () => {
  //   const restaurants = restaurantsjson.data;
  const pageSize = 10;
  const [restaurants, setrestaurants] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [serchResult, setserchResult] = useState([]);
  const [searchPressed, setsearchPressed] = useState(false);
  const [searchLength, setsearchLength] = useState(0);
  const [filterBySearch, setfilterBySearch] = useState();
  const [model, setmodel] = useState(null);
  const s_restaurants = paginate(
    serchResult.length > 0 ? serchResult : restaurants,
    currentPage,
    pageSize
  );
  const handlePageChange = (page) => {
    setcurrentPage(page);
  };

  const filterBy = (e) => {  
    setfilterBySearch(e);
  };

  useEffect(() => {
    const getData = async () => {
      const { data: restaurants } = await axios.get(
        "/rest/all"
      );
      setrestaurants(restaurants);
    };

    getData();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    let searchInput = e.currentTarget.value.replace(
      /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/,
      ""
    );
    setsearchLength(e.currentTarget.value.length);

    let reg = new RegExp("^" + searchInput, "i"); //i for caseinsensitive look regx at test/resx
    //^mathces the start
    setsearchPressed(true);
    if (filterBySearch == "Genre") {
      let searchReasultsx = restaurants.filter((r) => reg.test(r.genre)).sort();
      setserchResult(
        searchReasultsx.sort((a, b) => a.name.localeCompare(b.name))
      );
    }
    if (filterBySearch == "State") {
      let searchReasultsx = restaurants.filter((r) => reg.test(r.state));
      setserchResult(
        searchReasultsx.sort((a, b) => a.name.localeCompare(b.name))
      );
    }
  };

  return (
    <React.Fragment>
      <div className="jumbotron m-5">
        <div
          className="row"
          style={{ alignItems: "center", justifyContent: "center" }}
        >
          <div className="col-3">
            <h6 className="m-2">Filter By: </h6>
            <div>
              <select
                id="inputState"
                className="form-control"
                onChange={({ currentTarget }) => filterBy(currentTarget.value)}
              >
                <option defaultValue="" selected disabled>
                  select a filter method
                </option>

                <option key={2}>Genre</option>
                <option key={3}>State</option>
              </select>
            </div>
          </div>
          <div className="col-9">
            {" "}
            <h6 className="m-2">Search Hotels </h6>
            <input
              className="form-control form-control"
              type="text"
              placeholder="Search Hotels"
              onChange={(e) => handleSearch(e)}
            />
          </div>
        </div>
        <div>
          {searchPressed && searchLength > 0 ? (
            <h3>{serchResult.length} results found</h3>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {/********************************************* model************************************ */}

      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {model != null ? model.name : ""}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Address</td>{" "}
                    <td>{model != null ? model.address1 : ""}</td>
                  </tr>
                  <tr>
                    <td>Tel</td> <td>{model != null ? model.telephone : ""}</td>
                  </tr>
                  <tr>
                    <td>Tags</td> <td>{model != null ? model.tags : ""}</td>
                  </tr>
                  <tr>
                    <td>WebSite</td>{" "}
                    <td>{model != null ? model.website : ""}</td>
                  </tr>
                  <tr>
                    <td>hours</td> <td>{model != null ? model.hours : ""}</td>
                  </tr>
                  <tr>
                    <td>Attire</td> <td>{model != null ? model.attire : ""}</td>
                  </tr>
                  <tr>
                    <td>Zip</td> <td>{model != null ? model.zip : ""}</td>
                  </tr>
                  <tr>
                    <td>Lat</td> <td>{model != null ? model.lat : ""}</td>
                  </tr>
                  <tr>
                    <td>Long</td> <td>{model != null ? model.long : ""}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/********************************************* model************************************ */}
      <div className="jumbotron m-5">
        {/* <FontAwesomeIcon icon={faHome} /> */}

        {restaurants.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                {/* {Object.keys(restaurants[0]).map((head) => (
                <th key={head}>{head}</th>
              ))} */}
                <th>#</th>
                <th>Name</th>
                <th>City</th>
                <th>State</th>
                <th>Genre</th>
                <th>Phone</th>
                <th>info</th>
              </tr>
            </thead>
            <tbody>
              {s_restaurants.map((rest, index) => (
                <tr key={rest + 2}>
                  <td>{index + 1}</td>
                  <td>{rest.name}</td>
                  <td>{rest.city}</td>
                  <td>{rest.state}</td>
                  <td>{rest.genre}</td>
                  <td>{rest.telephone}</td>
                  <td>
                    <button
                      className="btn btn-info btn-sm"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => setmodel(rest)}
                    >
                      info
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div style={{ alignSelf: "center" }}>
          <Pagination
            itemCount={restaurants.length}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomeScreen;
