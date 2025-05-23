'use client';

import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { DownloadIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';
import '@uploadcare/react-uploader/core.css';
import { FontEnum, SubtitlePositionEnum } from '@/validators';
import { FileUploaderMinimal } from '@uploadcare/react-uploader/next';
import { Font, SubtitlesPosition, VideoCaptionConfig } from '@/types/video';

const GenerateCaptionPage = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [transcriptUrl, setTranscriptUrl] = useState<string>('');
  const [outputVideo, setOutputVideo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [processingVideo, setProcessingVideo] = useState<boolean>(false);
  const [outputTranscript, setOutputTranscript] = useState<string>('');
  const [formData, setFormData] = useState({
    font: Font.PoppinsBold,
    color: 'white',
    kerning: 0,
    opacity: 0,
    MaxChars: 20,
    fontsize: 7,
    translate: false,
    output_video: true,
    stroke_color: 'black',
    stroke_width: 2.6,
    right_to_left: false,
    subs_position: SubtitlesPosition.Bottom75,
    highlight_color: 'yellow',
    output_transcript: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        type === 'checkbox'
          ? checked
          : type === 'number'
            ? Number(value)
            : value,
    }));
  };

  const fetchVideoStatus = async (replicateId: string, cleanUp: () => void) => {
    try {
      const response = await fetch('/api/polling?replicateId=' + replicateId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.result.outputVideoUrl || data.result.outputTranscriptUrl) {
        cleanUp();
        toast.success('Video processed successfully!');
        setProcessingVideo(false);
        setOutputVideo(data.result.outputVideoUrl);
        setOutputTranscript(data.result.outputTranscriptUrl);
      }
    } catch (error) {
      console.log('Error fetching video status: ', error);
    }
  };

  const handlePolling = async (replicateId: string) => {
    setProcessingVideo(true);
    const intervalId = setInterval(() => {
      fetchVideoStatus(replicateId, () => clearInterval(intervalId));
    }, 5000);
  };

  const handleProcessVideo = async (e: FormEvent) => {
    e.preventDefault();
    if (!videoUrl) {
      toast.error('Please upload a video!');
      return;
    }

    try {
      setLoading(true);
      let bodyData: VideoCaptionConfig = {
        ...formData,
        video_file_input: videoUrl,
      };

      if (transcriptUrl) {
        bodyData = { ...bodyData, transcript_file_input: transcriptUrl };
      }

      const response = await fetch('/api/generate-caption', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
      const data = await response.json();
      toast.success('Request queued!');
      handlePolling(data.result.replicateId);
    } catch (error) {
      console.log('Error processing video: ', error);
      toast.error('Error processing video');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-wrap h-[calc(100vh-100px)] w-full justify-center gap-x-16 items-start mt-[100px] max-md:overflow-auto overflow-y-hidden">
      <div className="rounded-xl px-5 py-7 max-md:w-[90%] w-[40%] bg-white shadow-md border">
        <h1 className="text-3xl text-grad mb-10 text-center">
          Generate Caption
        </h1>
        <form
          className="flex flex-col gap-5 overflow-y-auto max-h-[65vh] scroll-m-4 px-3"
          onSubmit={handleProcessVideo}
        >
          <label>
            Upload Video: <span className="text-red-600">*</span>
            <FileUploaderMinimal
              useCloudImageEditor={false}
              sourceList="local, url, camera, gdrive"
              classNameUploader="uc-light uc-red"
              pubkey="302cebe52af5d96538c7"
              accept=".mp4, .mov"
              multiple={false}
              maxLocalFileSizeBytes={100000000}
              onFileUploadSuccess={(vid) => setVideoUrl(vid.cdnUrl)}
            />
          </label>

          <label>
            Transcript File Input:
            <FileUploaderMinimal
              useCloudImageEditor={false}
              sourceList="local, url, camera, gdrive"
              classNameUploader="uc-light uc-red"
              pubkey="302cebe52af5d96538c7"
              accept=".txt"
              multiple={false}
              maxLocalFileSizeBytes={100000000}
              onFileUploadSuccess={(file) => setTranscriptUrl(file.cdnUrl)}
            />
          </label>

          <label className="flex flex-col">
            Font:
            <select name="font" value={formData.font} onChange={handleChange}>
              {FontEnum.map((font) => {
                return (
                  <option key={font} value={font}>
                    {font}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="flex flex-col">
            Font Size:
            <input
              type="number"
              name="fontsize"
              value={formData.fontsize}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500">
              Note: Size 7 is good for videos, 4 is good for reels
            </p>
          </label>

          <label className="flex flex-col">
            Font Color:
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col">
            Stroke Color:
            <input
              type="text"
              name="stroke_color"
              value={formData.stroke_color}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col">
            Stroke Width:
            <input
              type="number"
              name="stroke_width"
              value={formData.stroke_width}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col">
            Subtitles Position:
            <select
              name="subs_position"
              value={formData.subs_position}
              onChange={handleChange}
            >
              {SubtitlePositionEnum.map((position) => {
                return (
                  <option key={position} value={position}>
                    {position}
                  </option>
                );
              })}
            </select>
          </label>

          <label className="flex flex-col">
            Highlight Color:
            <input
              type="text"
              name="highlight_color"
              value={formData.highlight_color}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col">
            Kerning:
            <input
              type="number"
              name="kerning"
              value={formData.kerning}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col">
            Subtitle Background Opacity:
            <input
              type="number"
              step="0.1"
              name="opacity"
              value={formData.opacity}
              onChange={handleChange}
            />
          </label>

          <label className="flex flex-col">
            Max Characters:
            <input
              type="number"
              name="MaxChars"
              value={formData.MaxChars}
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500">
              Note: Max characters space for subtitles. 20 is good for videos,
              10 is good for reels
            </p>
          </label>
          <div className="flex flex-col gap-4">
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="translate"
                checked={formData.translate}
                onChange={handleChange}
                className="w-5 h-5 mt-1"
              />
              <div>
                <label htmlFor="translate" className="font-medium">
                  Translate
                </label>
                <p className="text-sm text-gray-500">
                  Translate the subtitles to English.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="output_video"
                checked={formData.output_video}
                onChange={handleChange}
                className="w-5 h-5 mt-1"
              />
              <div>
                <label htmlFor="output_video" className="font-medium">
                  Output Video
                </label>
                <p className="text-sm text-gray-500">
                  If selected, the video will include subtitles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="output_transcript"
                checked={formData.output_transcript}
                onChange={handleChange}
                className="w-5 h-5 mt-1"
              />
              <div>
                <label htmlFor="output_transcript" className="font-medium">
                  Output Transcript
                </label>
                <p className="text-sm text-gray-500">
                  If selected, a transcript file will be generated.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                name="right_to_left"
                checked={formData.right_to_left}
                onChange={handleChange}
                className="w-5 h-5 mt-1"
              />
              <div>
                <label htmlFor="right_to_left" className="font-medium">
                  Right to Left Subtitles
                </label>
                <p className="text-sm text-gray-500">
                  For right-to-left languages (only Arial fonts supported).
                </p>
              </div>
            </div>
          </div>

          <button disabled={loading} className="btn-primary mt-4 text-center">
            {loading ? (
              <Image
                className="animate-spin mx-auto"
                src="/loader.svg"
                width={36}
                height={36}
                alt="loader"
              />
            ) : (
              'Process Video'
            )}
          </button>
        </form>
      </div>
      {processingVideo ? (
        <div className="h-[75vh] flex items-center justify-center">
          <div>
            <Image
              className="mx-auto mb-3 text-center animate-spin"
              src={'/loader.png'}
              alt="loader"
              height={64}
              width={64}
            />
            <p className="text-xl">Processing</p>
          </div>
        </div>
      ) : (
        (outputTranscript || outputVideo) && (
          <div>
            {outputVideo && (
              <div className="mb-5 relative">
                <Link
                  href={outputVideo.replace(
                    '/upload/',
                    '/upload/fl_attachment/',
                  )}
                  className="absolute top-0 right-0 text-white rounded-lg cursor-pointer z-40"
                >
                  <DownloadIcon
                    className="bg-blue-500 p-1 text-white rounded-xl"
                    size={40}
                  />
                </Link>
                <h2 className="text-xl font-bold">Output Video:</h2>
                <video src={outputVideo} controls className="my-4 rounded-xl" />
              </div>
            )}
            {outputTranscript && (
              <div className="my-2">
                <h2 className="text-xl font-bold mb-3">Output Transcript:</h2>
                <a
                  href={outputTranscript.replace(
                    '/upload/',
                    '/upload/fl_attachment/',
                  )}
                  download="download"
                  className="btn-primary"
                >
                  Download Transcript
                </a>
              </div>
            )}
          </div>
        )
      )}
    </div>
  );
};

export default GenerateCaptionPage;
