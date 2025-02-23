import React from 'react';
import ReactPlayer from 'react-player/youtube';

const YouTubeEmbed = ({ id }) => (
  <ReactPlayer url={`https://www.youtube.com/watch?v=${id}`} controls />
);

export default YouTubeEmbed;
