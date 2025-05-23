import { uploadToCloudinary } from '@/config/cloudinary';
import { connectToDb } from '@/config/db';
import { submitVideoToReplicate } from '@/config/replicate';
import UserModel from '@/models/user';
import VideoModel from '@/models/video';
import { VideoCaptionConfig } from '@/types/video';
import { VideoCaptionConfigSchema } from '@/validators';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    await connectToDb();

    const inputData = await req.json();
    // Validating the input data using zod
    const validatedInput = VideoCaptionConfigSchema.safeParse(inputData);

    if (!validatedInput.success) {
      return Response.json(
        { success: false, error: validatedInput.error },
        { status: 400 },
      );
    }

    // Upload the input video to Cloudinary
    const cloudinaryUrl = await uploadToCloudinary(
      validatedInput.data.video_file_input,
      'video',
    );

    // Request Replicate API to generate captions
    const output = await submitVideoToReplicate({
      ...validatedInput.data,
      video_file_input: cloudinaryUrl,
    } as VideoCaptionConfig);

    // Create a document in Videos collection
    const { userId } = await auth();
    const video = await VideoModel.create({
      replicateId: output.id,
      inputVideoUrl: cloudinaryUrl,
      inputTranscriptUrl: validatedInput.data.transcript_file_input,
      captionConfig: {
        font: validatedInput.data.font,
        color: validatedInput.data.color,
        kerning: validatedInput.data.kerning,
        opacity: validatedInput.data.opacity,
        MaxChars: validatedInput.data.MaxChars,
        fontsize: validatedInput.data.fontsize,
        translate: validatedInput.data.translate,
        output_video: validatedInput.data.output_video,
        stroke_color: validatedInput.data.stroke_color,
        stroke_width: validatedInput.data.stroke_width,
        right_to_left: validatedInput.data.right_to_left,
        subs_position: validatedInput.data.subs_position,
        highlight_color: validatedInput.data.highlight_color,
        output_transcript: validatedInput.data.output_transcript,
      },
    });

    // Update the videos reference in the User document
    const user = await UserModel.findOneAndUpdate(
      { clerkId: userId },
      { $push: { videos: video._id } },
    );

    if (!user) {
      return Response.json(
        { success: false, error: 'User not found.' },
        { status: 404 },
      );
    }

    return Response.json({ success: true, result: video }, { status: 200 });
  } catch (error) {
    console.log('Error generating captions: ', error);

    return Response.json(
      { success: false, error: 'Error generating captions.' },
      { status: 500 },
    );
  }
}
