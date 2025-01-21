import { z } from 'zod';

export const SubtitlePositionEnum = [
	'bottom75',
	'center',
	'top',
	'bottom',
	'left',
	'right',
] as const;

export const FontEnum = [
	'Poppins/Poppins-Bold.ttf',
	'Poppins/Poppins-BoldItalic.ttf',
	'Poppins/Poppins-ExtraBold.ttf',
	'Poppins/Poppins-ExtraBoldItalic.ttf',
	'Poppins/Poppins-Black.ttf',
	'Poppins/Poppins-BlackItalic.ttf',
	'Atkinson_Hyperlegible/AtkinsonHyperlegible-Bold.ttf',
	'Atkinson_Hyperlegible/AtkinsonHyperlegible-BoldItalic.ttf',
	'M_PLUS_Rounded_1c/MPLUSRounded1c-ExtraBold.ttf',
	'Arial/Arial_Bold.ttf',
	'Arial/Arial_BoldItalic.ttf',
	'Tajawal/Tajawal-Bold.ttf',
	'Tajawal/Tajawal-ExtraBold.ttf',
	'Tajawal/Tajawal-Black.ttf',
] as const;

export const VideoCaptionConfigSchema = z
	.object({
		font: z.enum(FontEnum).optional(),
		color: z.string().optional(),
		kerning: z.number().optional(),
		opacity: z.number().optional(),
		MaxChars: z.number().optional(),
		fontsize: z.number().optional(),
		translate: z.boolean().optional(),
		output_video: z.boolean().optional(),
		stroke_color: z.string().optional(),
		stroke_width: z.number().optional(),
		right_to_left: z.boolean().optional(),
		subs_position: z.enum(SubtitlePositionEnum),
		highlight_color: z.string().optional(),
		video_file_input: z.string().min(1, 'Input video file is required'),
		output_transcript: z.boolean().optional(),
		transcript_file_input: z.string().optional(),
	})
	.strict();
