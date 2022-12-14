import React, { useContext, useState } from "react";
import { GlobalStoreContext } from "../store";
import Grid from "@mui/material/Grid";

function SongCard(props) {
  const { store } = useContext(GlobalStoreContext);
  const [draggedTo, setDraggedTo] = useState(0);
  const { song, index } = props;

  function handleDragStart(event) {
    event.dataTransfer.setData("song", index);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDragEnter(event) {
    event.preventDefault();
    setDraggedTo(true);
  }

  function handleDragLeave(event) {
    event.preventDefault();
    setDraggedTo(false);
  }

  async function handleDrop(event) {
    event.preventDefault();
    let target = event.target;
    let targetId = target.id;
    targetId = targetId.substring(target.id.indexOf("-") + 1);
    let sourceId = event.dataTransfer.getData("song");
    sourceId = sourceId.substring(sourceId.indexOf("-") + 1);

    setDraggedTo(false);

    // ASK THE MODEL TO MOVE THE DATA
    let index1 = parseInt(targetId.substring(0, 1));
    let index2 = parseInt(sourceId.substring(0, 1));

    // UPDATE THE LIST
    await store.addMoveSongTransaction(index2, index1);
  }
  function handleRemoveSong(event) {
    console.log("remove song?");
    store.showRemoveSongModal(index, song);
  }
  function handleClick(event) {
    console.log(event.target);
    if (event.detail === 2) {
      console.log("double click");
      store.showEditSongModal(index, song);
    } else {
      store.updatePlaySong(index);
    }
  }

  let cardClass = "list-card unselected-list-card";
  if (index === store.currentPlayIndex)
    cardClass = "list-card selected-list-card";
  return (
    <Grid container>
      <Grid xs={10}>
        <div
          key={index}
          id={"song-" + index + "-card"}
          className={cardClass}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          draggable="true"
          onClick={handleClick}
        >
          {index + 1}.{song.title} by {song.artist}
        </div>
      </Grid>
      <Grid xs={2}>
        <input
          type="button"
          id={"remove-song-" + index}
          className="list-card-button"
          value={"\u2715"}
          onClick={handleRemoveSong}
        />
      </Grid>
    </Grid>
  );
}

export default SongCard;
