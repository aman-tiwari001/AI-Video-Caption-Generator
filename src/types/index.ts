import { Document } from 'mongoose';
import { VideoCaptionConfig } from './video';

export interface IUser extends Document {
	clerkId: string;
	firstName: string;
	lastName: string;
	email: string;
	photoUrl: string;
	videos: IVideo[];
}

export interface IVideo extends Document {
	replicateId: string;
	inputVideoUrl: string;
	outputVideoUrl: string;
	inputTranscriptUrl: string;
	outputTranscriptUrl: string;
	captionConfig: VideoCaptionConfig;
}
