import React, { useEffect, useRef, useState } from 'react';
import { OggOpusDecoder } from 'ogg-opus-decoder';
import './index.css'; // Import the CSS file

const MultiChannelOpusPlayerPoc = ({ 
  sourceUrl = '', // URL to opus file
  showFileBrowser = true, // Whether to show file input
  onError = (error) => console.error(error), // Error callback
  onLoad = () => {}, // Callback when file is loaded
  onPlay = () => {}, // Callback when playback starts
  onPause = () => {} // Callback when playback pauses
}) => {
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [channels, setChannels] = useState([]);
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const sourceNodeRef = useRef(null);
  const channelNodesRef = useRef([]);
  const analyserNodesRef = useRef([]);
  const animationIdRef = useRef(null);

  // Initialize audio context
  const initAudioContext = () => {
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
      return context;
    }
    return audioContext;
  };

  // Fetch and process remote file
  const loadRemoteFile = async (url) => {
    setIsLoading(true);
    setStatus('Fetching file...');
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const arrayBuffer = await response.arrayBuffer();
      await processAudioData(arrayBuffer);
      onLoad();
    } catch (error) {
      const errorMessage = `Error loading file from ${url}: ${error.message}`;
      setStatus(errorMessage);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Process audio data from either source
  const processAudioData = async (arrayBuffer) => {
    setStatus('Decoding Ogg-Opus file...');
    
    try {
      const context = initAudioContext();
      const decoder = new OggOpusDecoder();
      const decoded = await decoder.decode(new Uint8Array(arrayBuffer));
      const audioData = decoded.channelData;
      const sampleRate = decoded.sampleRate;
      
      setStatus(`Decoded ${audioData.length} channels at ${sampleRate}Hz`);
      
      // Create audio buffer
      const buffer = context.createBuffer(
        audioData.length,
        audioData[0].length,
        sampleRate
      );
      
      // Copy channel data
      for (let i = 0; i < audioData.length; i++) {
        buffer.copyToChannel(audioData[i], i);
      }
      
      setAudioBuffer(buffer);
      
      // Create channel controls data
      const newChannels = Array.from({ length: audioData.length }, (_, i) => ({
        id: i,
        label: `Channel ${i + 1}`,
        pan: 0,
        volume: 1,
      }));
      
      setChannels(newChannels);
      
    } catch (error) {
      const errorMessage = 'Error decoding file: ' + error.message;
      setStatus(errorMessage);
      onError(error);
      throw error;
    }
  };

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    setStatus('Loading file...');
    
    try {
      const arrayBuffer = await file.arrayBuffer();
      await processAudioData(arrayBuffer);
      onLoad();
    } catch (error) {
      setStatus(`Error: ${error.message}`);
      onError(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Setup audio nodes for playback
  const setupAudioNodes = () => {
    if (!audioBuffer || !audioContext) return;
    
    // Create source node
    sourceNodeRef.current = audioContext.createBufferSource();
    sourceNodeRef.current.buffer = audioBuffer;
    
    // Create channel splitter
    const splitter = audioContext.createChannelSplitter(audioBuffer.numberOfChannels);
    sourceNodeRef.current.connect(splitter);
    
    // Setup channel nodes
    channels.forEach((channel, i) => {
      const gainNode = audioContext.createGain();
      gainNode.gain.value = channel.volume;
      
      const pannerNode = audioContext.createStereoPanner();
      pannerNode.pan.value = channel.pan;
      
      const analyserNode = audioContext.createAnalyser();
      analyserNode.fftSize = 256;
      
      splitter.connect(gainNode, i);
      gainNode.connect(pannerNode);
      pannerNode.connect(analyserNode);
      analyserNode.connect(audioContext.destination);
      
      channelNodesRef.current[i] = {
        gain: gainNode.gain,
        pan: pannerNode.pan
      };
      
      analyserNodesRef.current[i] = analyserNode;
    });
  };

  // Handle play/pause
  const togglePlayback = () => {
    if (!audioBuffer) return;
    
    if (!isPlaying) {
      setupAudioNodes();
      sourceNodeRef.current.start(0);
      setIsPlaying(true);
      onPlay();
    } else {
      sourceNodeRef.current?.stop();
      setIsPlaying(false);
      onPause();
    }
  };

  // Handle channel control changes
  const handleChannelControl = (channelId, type, value) => {
    setChannels(prevChannels => 
      prevChannels.map(channel => 
        channel.id === channelId
          ? { ...channel, [type]: value }
          : channel
      )
    );

    if (channelNodesRef.current[channelId]) {
      if (type === 'pan') {
        channelNodesRef.current[channelId].pan.value = value;
      } else if (type === 'volume') {
        channelNodesRef.current[channelId].gain.value = value;
      }
    }
  };

  // Load remote file when sourceUrl changes
  useEffect(() => {
    if (sourceUrl) {
      loadRemoteFile(sourceUrl);
    }
  }, [sourceUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
      }
      if (audioContext) {
        audioContext.close();
      }
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []);

  return (
    <div className="opus-choir-player">
      <div className="controls">
        {showFileBrowser && (
          <input
            type="file"
            accept=".opus"
            onChange={handleFileUpload}
            className="file-input"
            disabled={isLoading}
          />
        )}
        <button
          onClick={togglePlayback}
          disabled={!audioBuffer || isLoading}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>

      <div className="status">
        {status}
      </div>

      <div className="channel-controls">
        {channels.map(channel => (
          <div key={channel.id} className="channel">
            <h3>{channel.label}</h3>
            <div className="slider-container">
              <label>
                Pan:
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={channel.pan}
                  onChange={(e) => handleChannelControl(channel.id, 'pan', parseFloat(e.target.value))}
                />
                <span>{channel.pan.toFixed(1)}</span>
              </label>
            </div>
            <div className="slider-container">
              <label>
                Volume:
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.1"
                  value={channel.volume}
                  onChange={(e) => handleChannelControl(channel.id, 'volume', parseFloat(e.target.value))}
                />
                <span>{channel.volume.toFixed(1)}</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiChannelOpusPlayerPoc;