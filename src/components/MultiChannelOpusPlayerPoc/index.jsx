import React, { useEffect, useRef, useState } from 'react';
import { OggOpusDecoder } from 'ogg-opus-decoder';

const MultiChannelOpusPlayerPoc = () => {
  const [audioContext, setAudioContext] = useState(null);
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [channels, setChannels] = useState([]);
  const [status, setStatus] = useState('');
  
  const sourceNodeRef = useRef(null);
  const visualizerRef = useRef(null);
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

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setStatus('Loading file...');
    
    try {
      const context = initAudioContext();
      const arrayBuffer = await file.arrayBuffer();
      
      // Extract metadata (simplified version)
      const decoder = new OggOpusDecoder();
      setStatus('Decoding Ogg-Opus file...');
      
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
      console.error('Error decoding file:', error);
      setStatus(`Error: ${error.message}`);
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
    } else {
      sourceNodeRef.current?.stop();
      setIsPlaying(false);
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
        <input
          type="file"
          accept=".opus"
          onChange={handleFileUpload}
          className="file-input"
        />
        <button
          onClick={togglePlayback}
          disabled={!audioBuffer}
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