'use client';

import type React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Camera, StopCircle, PlayCircle } from 'lucide-react';
import TimestampList from '@/components/website/timestamp-list';
import type { Timestamp } from '@/app/types';
import { detectEvents, type VideoEvent } from './actions';

export default function Page() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [timestamps, setTimestamps] = useState<Timestamp[]>([]);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isTranscribing, setIsTranscribing] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const analysisIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isRecordingRef = useRef(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const initSpeechRecognition = () => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript((prev) => prev + ' ' + finalTranscript);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setError('Speech recognition error: ' + event.error);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('Speech recognition not supported');
    }
  };

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        mediaStreamRef.current = stream;
      }
    } catch (error) {
      console.error('Error accessing webcam:', error);
      setError('Failed to access webcam. Please make sure you have granted camera permissions.');
    }
  };

  const stopWebcam = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const captureFrame = async (): Promise<string | null> => {
    if (!videoRef.current || !canvasRef.current) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!context) {
      console.error('Failed to get canvas context');
      return null;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const analyzeFrame = async () => {
    const currentTranscript = transcript.trim();
    console.log('Analyzing frame...');
    if (!isRecordingRef.current) {
      console.log('Not recording, skipping analysis');
      return;
    }

    try {
      const frame = await captureFrame();
      if (frame) {
        console.log('Frame captured, sending to API...');
        // Include transcript in the analysis
        const result = await detectEvents(frame, currentTranscript);
        console.log('API response:', result);

        if (result.events && result.events.length > 0) {
          console.log('Events detected:', result.events);
          const currentTime = new Date();
          const minutes = currentTime.getMinutes();
          const seconds = currentTime.getSeconds();

          result.events.forEach((event: VideoEvent) => {
            const newTimestamp = {
              timestamp: `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`,
              description: event.description,
            };
            console.log('Adding new timestamp:', newTimestamp);
            setTimestamps((prev) => {
              const updated = [...prev, newTimestamp];
              console.log('Updated timestamps:', updated);
              return updated;
            });
          });
        } else {
          console.log('No events detected in this frame');
        }
      } else {
        console.log('Failed to capture frame');
      }
    } catch (error) {
      console.error('Error analyzing frame:', error);
      setError('Error analyzing frame. Please try again.');
      stopRecording();
    }
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setIsTranscribing(true);
      recognitionRef.current.start();
    }
    console.log('Starting recording...');
    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
    }

    setTimestamps([]);
    setError(null);
    setAnalysisProgress(0);

    isRecordingRef.current = true;
    setIsRecording(true);

    console.log('Setting up analysis interval...');
    analyzeFrame();
    analysisIntervalRef.current = setInterval(analyzeFrame, 3000);
    console.log('Recording started');
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsTranscribing(false);
    }
    console.log('Stopping recording...');
    isRecordingRef.current = false;
    setIsRecording(false);

    if (analysisIntervalRef.current) {
      clearInterval(analysisIntervalRef.current);
      analysisIntervalRef.current = null;
    }
    console.log('Recording stopped');
  };

  useEffect(() => {
    initSpeechRecognition();
    const initWebcam = async () => {
      await startWebcam();
      canvasRef.current = document.createElement('canvas');
    };

    initWebcam();

    return () => {
      stopWebcam();
      if (analysisIntervalRef.current) {
        clearInterval(analysisIntervalRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl relative">
        <div className="absolute inset-0 bg-purple-900/5 blur-3xl rounded-full"></div>

        <div className="relative z-10 p-8">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
                Real-time Video Analyzer
              </h1>
              <p className="text-zinc-400">Analyze your webcam feed in real-time and detect key moments</p>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform scale-x-[-1]"
                />{' '}
              </div>

              {error && <div className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">{error}</div>}

              <div className="flex justify-center gap-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  >
                    <PlayCircle className="w-5 h-5" />
                    Start Analysis
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    <StopCircle className="w-5 h-5" />
                    Stop Analysis
                  </button>
                )}
              </div>

              {isRecording && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-sm text-zinc-400">Recording and analyzing...</span>
                  </div>
                </div>
              )}

              <div className="mt-4 space-y-2">
                <h2 className="text-xl font-semibold text-white">Detected Events</h2>
                {timestamps.length > 0 ? (
                  <TimestampList timestamps={timestamps} onTimestampClick={() => {}} />
                ) : (
                  <p className="text-zinc-400 text-sm">
                    {isRecording ? 'Waiting for events...' : 'Start analysis to detect events'}
                  </p>
                )}
              </div>

              <div className="mt-8 space-y-2">
                <h2 className="text-xl font-semibold text-white">Audio Transcript</h2>
                <div className="p-4 bg-zinc-900/50 rounded-lg">
                  {isTranscribing && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-sm text-zinc-400">Transcribing audio...</span>
                    </div>
                  )}
                  {transcript ? (
                    <p className="text-zinc-300 whitespace-pre-wrap">{transcript}</p>
                  ) : (
                    <p className="text-zinc-500 italic">
                      {isRecording ? 'Waiting for speech...' : 'Start recording to capture audio'}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
