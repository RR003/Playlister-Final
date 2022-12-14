import { useContext, useState, useEffect } from "react";
import AuthContext from "../auth";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { GlobalStoreContext } from "../store";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextField from "@mui/material/TextField";
import SortIcon from "@mui/icons-material/Sort";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, InputLabel, Select, Grid } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import FormHelperText from "@mui/material/FormHelperText";

export default function MenuBar() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [menu, setMenu] = useState(auth.user === null ? 1 : 0);
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");

  const handleHome = () => {
    if (auth.user !== null) {
      auth.goHome();
      setSort("");
      store.updateQueries(-1, "");
      setMenu(0);
      setSearch("");
    }
  };
  const handleAllLists = () => {
    auth.goAllLists();
    setSort("");
    store.updateQueries(-1, "");
    setMenu(1);
    setSearch("");
  };
  const handleUsers = () => {
    auth.goAllLists();
    setSort("");
    store.updateQueries(-1, "");
    setMenu(2);
    setSearch("");
  };

  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      let arr = [
        "Name (A-Z)",
        "Publish Date (Newest)",
        "Listens (High - Low)",
        "Likes (High - Low)",
        "Dislikes (High - Low)",
      ];
      let index = arr.indexOf(sort);
      // console.log(e.target.value);
      setSearch(e.target.value);
      store.updateQueries(index, e.target.value).then((event) => {
        store.loadIdNamePairs2(index, e.target.value, menu == 2);
      });
    }
  };

  const handleChange = async (event) => {
    setSort(event.target.value);
    let arr = [
      "Name (A-Z)",
      "Publish Date (Newest)",
      "Listens (High - Low)",
      "Likes (High - Low)",
      "Dislikes (High - Low)",
    ];
    let index = arr.indexOf(event.target.value);
    store.updateQueries(index, search).then((e) => {
      store.loadIdNamePairs2(index, search);
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#75816b" }}>
        <Toolbar>
          <Grid container>
            <Grid xs={1}>
              {auth.user !== null && menu === 0 && (
                <HomeIcon
                  onClick={handleHome}
                  style={{ border: "1px solid" }}
                />
              )}
              {auth.user !== null && menu !== 0 && (
                <HomeIcon onClick={handleHome} />
              )}
            </Grid>
            <Grid xs={1}>
              {menu === 1 && (
                <GroupsIcon
                  onClick={handleAllLists}
                  style={{ border: "1px solid" }}
                />
              )}
              {menu !== 1 && <GroupsIcon onClick={handleAllLists} />}
            </Grid>
            <Grid xs={1}>
              {menu === 2 && (
                <AccountCircleIcon
                  onClick={handleUsers}
                  style={{ border: "1px solid" }}
                />
              )}
              {menu !== 2 && <AccountCircleIcon onClick={handleUsers} />}
            </Grid>
            <Grid xs={6}>
              <TextField
                id="search-bar"
                className="text"
                label="Search"
                variant="outlined"
                placeholder="Search..."
                size="small"
                onKeyDown={handleSearch}
                style={{ width: "90%", fill: "blue", background: "white" }}
              />
              <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ fill: "blue" }} />
              </IconButton>
            </Grid>
            <Grid xs={3}>
              {/*<FormControl>
                <InputLabel>Sort by</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Sort by"
                  value={sort}
                  onChange={handleChange}
                  defaultValue="default"
                >
                  <MenuItem value="Name (A-Z)" id={0}>
                    Name (A-Z)
                  </MenuItem>
                  <MenuItem value="Publish Date (Newest)" id={1}>
                    Publish Date (Newest)
                  </MenuItem>
                  <MenuItem value="Listens (High - Low)" id={2}>
                    Listens (High - Low)
                  </MenuItem>
                  <MenuItem value="Likes (High - Low)" id={3}>
                    Likes (High - Low)
                  </MenuItem>
                  <MenuItem value="Dislikes (High - Low)" id={4}>
                    Dislikes (High - Low)
                  </MenuItem>
                </Select>
              </FormControl>*/}
              <FormControl style={{ background: "white", width: "90%" }}>
                <InputLabel>Sort By...</InputLabel>
                <Select value={sort} onChange={handleChange}>
                  <MenuItem value="Name (A-Z)" id={0}>
                    Name (A-Z)
                  </MenuItem>
                  <MenuItem value="Publish Date (Newest)" id={1}>
                    Publish Date (Newest)
                  </MenuItem>
                  <MenuItem value="Listens (High - Low)" id={2}>
                    Listens (High - Low)
                  </MenuItem>
                  <MenuItem value="Likes (High - Low)" id={3}>
                    Likes (High - Low)
                  </MenuItem>
                  <MenuItem value="Dislikes (High - Low)" id={4}>
                    Dislikes (High - Low)
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
