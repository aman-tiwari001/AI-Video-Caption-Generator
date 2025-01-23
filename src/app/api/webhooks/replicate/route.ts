import { uploadToCloudinary } from '@/config/cloudinary';
import { connectToDb } from '@/config/db';
import VideoModel from '@/models/video';

//Webhook endpoint to receive the output video URL from Replicate
export async function POST(req: Request) {
	try {
		console.log('Webhook called');
		await connectToDb();
		const { id, output, input } = await req.json();
		console.log('job id-> ', id);
		console.log('output vid-> ', output);
		if (!id || !output.length) {
			return Response.json(
				{ success: false, error: 'Missing required fields.' },
				{ status: 400 }
			);
		}
		let cloudinaryVidUrl = '';
		let cloudinarySubsUrl = '';
		if (input.output_video)
			cloudinaryVidUrl = await uploadToCloudinary(output[0], 'video');
		if (input.output_transcript)
			cloudinarySubsUrl = await uploadToCloudinary(output[1], 'auto');
		const video = await VideoModel.findOneAndUpdate(
			{ replicateId: id },
			{
				outputVideoUrl: cloudinaryVidUrl,
				outputTranscriptUrl: cloudinarySubsUrl,
			}
		);
		if (!video) {
			return Response.json(
				{ success: false, error: 'Video not found.' },
				{ status: 404 }
			);
		}
		return Response.json({ success: true }, { status: 200 });
	} catch (error) {
		console.log('Error saving video: ', error);
		return Response.json(
			{
				success: false,
				error: 'Error saving video.',
			},
			{
				status: 500,
			}
		);
	}
}
