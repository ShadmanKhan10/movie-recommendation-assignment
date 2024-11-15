import axios from "axios";
import React, { useState } from "react";
import ReactPlayer from "react-player";

export default function SignIn() {
  const [videoKey, setVideoKey] = useState("");

  const getMoviesVideo = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/297762?api_key=df6870b28b8bac6570172e8933e51d7e&append_to_response=videos`
    );
    try {
      console.log(response.data.videos.results[8]);
      setVideoKey(response.data.videos.results[8].key);
    } catch (error) {
      console.log("Error getting movie", error);
    }
  };
  return (
    <>
      <div style={{ marginTop: "3rem" }}>
        <button onClick={getMoviesVideo}>Get Videos</button>
      </div>
      {videoKey && (
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoKey}`}
            controls
            width="100%"
            height="100%"
            style={{ objectFit: "cover" }}
            loop={true}
            playing={true}
          />
        </div>
      )}
    </>
  );
}
