import { IVideo } from '@/types';
import { FontEnum, SubtitlePositionEnum } from '@/validators';
import { model, models, Schema } from 'mongoose';

const VideoSchema: Schema<IVideo> = new Schema(
  {
    replicateId: { type: String, required: true, unique: true, trim: true },
    inputVideoUrl: {
      type: String,
      required: true,
      trim: true,
      match: /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/,
    },
    outputVideoUrl: {
      type: String,
      trim: true,
      match: /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/,
    },
    inputTranscriptUrl: {
      type: String,
      trim: true,
      match: /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/,
    },
    outputTranscriptUrl: {
      type: String,
      trim: true,
      match: /https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/,
    },
    captionConfig: {
      font: {
        type: String,
        enum: FontEnum,
        default: 'Poppins/Poppins-ExtraBold.ttf',
      },
      color: { type: String, trim: true, default: 'white' },
      kerning: { type: Number, default: -5 },
      opacity: { type: Number, default: 1 },
      MaxChars: { type: Number, default: 20 },
      fontsize: { type: Number, default: 7 },
      translate: { type: Boolean, default: false },
      output_video: { type: Boolean, default: true },
      stroke_color: { type: String, trim: true, default: 'black' },
      stroke_width: { type: Number, default: 2.6 },
      right_to_left: { type: Boolean, default: false },
      subs_position: {
        type: String,
        enum: SubtitlePositionEnum,
        default: 'bottom75',
      },
      highlight_color: { type: String, trim: true, default: 'yellow' },
      output_transcript: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
);

const VideoModel = models.Video || model<IVideo>('Video', VideoSchema);
export default VideoModel;
