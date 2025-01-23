'use client';

import Link from 'next/link';
import { DownloadIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { VideoCaptionConfig } from '@/types/video';

interface Video {
  replicateId: string;
  inputVideoUrl: string;
  outputVideoUrl?: string;
  outputTranscriptUrl?: string;
  captionConfig: VideoCaptionConfig;
}

const HistoryPage = () => {
  const [history, setHistory] = useState<Video[]>([]);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/get-user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.result) {
        setHistory(data.result.videos);
      }
    } catch (error) {
      console.log('Error fetching user: ', error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="min-h-screen pt-[80px] px-5">
      <h1 className="text-grad text-3xl my-3 text-center">History</h1>
      {history.length === 0 ? (
        <p className="text-xl my-5">No videos</p>
      ) : (
        (history as Video[]).reverse().map((video) => {
          return (
            <div key={video.replicateId} className="my-5">
              <div className="flex flex-wrap max-md:flex-col items-center justify-center gap-10 py-4 w-full">
                <div className="w-[40%] max-md:w-full h-[570px] overflow-auto rounded-xl bg-white border-[#ED4678] border-4 px-4">
                  <h2 className="text-center text-2xl my-5">
                    Subtitle Settings
                  </h2>
                  <div className="text-lg">
                    <p>
                      <b>Font: </b> {video.captionConfig.font}
                    </p>
                    <p>
                      <b>Color: </b> {video.captionConfig.color}
                    </p>
                    <p>
                      <b>Kerning: </b> {video.captionConfig.kerning}
                    </p>
                    <p>
                      <b>Opacity: </b> {video.captionConfig.opacity}
                    </p>
                    <p>
                      <b>Max Chars: </b>
                      {video.captionConfig.MaxChars}
                    </p>
                    <p>
                      <b>Font Size: </b>
                      {video.captionConfig.fontsize}
                    </p>
                    <p>
                      <b>Translate: </b>
                      {video.captionConfig.translate}
                    </p>
                    <p>
                      <b>Stroke Color: </b>
                      {video.captionConfig.stroke_color}
                    </p>
                    <p>
                      <b>Stroke Width: </b>
                      {video.captionConfig.stroke_width}
                    </p>
                    <p>
                      <b>Right to Left: </b>
                      {video.captionConfig.right_to_left}
                    </p>
                    <p>
                      <b>Subtitles Position: </b>
                      {video.captionConfig.subs_position}
                    </p>
                    <p>
                      <b>Highlight Color: </b>
                      {video.captionConfig.highlight_color}
                    </p>
                    <p>
                      <b>Output Transcript: </b>
                      {video.captionConfig.output_transcript}
                    </p>
                  </div>
                  {video?.inputVideoUrl && (
                    <Link
                      href={video?.inputVideoUrl.replace(
                        '/upload/',
                        '/upload/fl_attachment/',
                      )}
                      download="output.mp4"
                      className="bg-blue-500 flex gap-2 justify-center my-2 items-center p-2 text-white rounded-lg cursor-pointer z-40"
                    >
                      <DownloadIcon
                        className="p-1 text-white rounded-lg"
                        size={30}
                      />
                      Input Video
                    </Link>
                  )}
                  {video?.outputTranscriptUrl && (
                    <Link
                      href={video?.outputTranscriptUrl.replace(
                        '/upload/',
                        '/upload/fl_attachment/',
                      )}
                      download="output.mp4"
                      className="bg-blue-500 flex gap-2 justify-center my-2 items-center p-2 text-white rounded-lg cursor-pointer z-40"
                    >
                      <DownloadIcon
                        className="p-1 text-white rounded-lg"
                        size={30}
                      />
                      Output Transcript
                    </Link>
                  )}
                </div>
                <div className="w-[40%] h-[570px] max-md:w-full relative rounded-xl z-10 bg-white border-4 border-[#ED4678]">
                  <h2 className="text-center text-2xl my-5">Output Video</h2>
                  {video.outputVideoUrl && (
                    <Link
                      href={video?.outputVideoUrl.replace(
                        '/upload/',
                        '/upload/fl_attachment/',
                      )}
                      download="output.mp4"
                      className="absolute top-1 right-1 text-white rounded-lg cursor-pointer z-40"
                    >
                      <DownloadIcon
                        className="bg-blue-500 p-1 text-white rounded-xl"
                        size={40}
                      />
                    </Link>
                  )}
                  <video
                    className="rounded-lg h-[490px] object-center w-full"
                    src={video?.outputVideoUrl}
                    controls
                  />
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default HistoryPage;
