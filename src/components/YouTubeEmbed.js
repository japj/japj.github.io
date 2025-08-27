import React from 'react';
import ReactPlayer from 'react-player';

const YouTubeEmbed = ({ id }) => (
  <ReactPlayer src={`https://www.youtube.com/watch?v=${id}`} controls />
);

export default YouTubeEmbed;
