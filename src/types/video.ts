export enum Font {
	PoppinsBold = 'Poppins/Poppins-Bold.ttf',
	PoppinsBoldItalic = 'Poppins/Poppins-BoldItalic.ttf',
	PoppinsExtraBold = 'Poppins/Poppins-ExtraBold.ttf',
	PoppinsExtraBoldItalic = 'Poppins/Poppins-ExtraBoldItalic.ttf',
	PoppinsBlack = 'Poppins/Poppins-Black.ttf',
	PoppinsBlackItalic = 'Poppins/Poppins-BlackItalic.ttf',
	AtkinsonBold = 'Atkinson_Hyperlegible/AtkinsonHyperlegible-Bold.ttf',
	AtkinsonBoldItalic = 'Atkinson_Hyperlegible/AtkinsonHyperlegible-BoldItalic.ttf',
	MPlusRounded = 'M_PLUS_Rounded_1c/MPLUSRounded1c-ExtraBold.ttf',
	ArialBold = 'Arial/Arial_Bold.ttf',
	ArialBoldItalic = 'Arial/Arial_BoldItalic.ttf',
	TajawalBold = 'Tajawal/Tajawal-Bold.ttf',
	TajawalExtraBold = 'Tajawal/Tajawal-ExtraBold.ttf',
	TajawalBlack = 'Tajawal/Tajawal-Black.ttf',
}

export enum SubtitlesPosition {
	Bottom75 = 'bottom75',
	Center = 'center',
	Top = 'top',
	Bottom = 'bottom',
	Left = 'left',
	Right = 'right',
}

export interface VideoCaptionConfig {
	font?: Font;
	color?: string;
	kerning?: number;
	opacity?: number;
	MaxChars?: number;
	fontsize?: number;
	translate?: boolean;
	output_video?: boolean;
	stroke_color?: string;
	stroke_width?: number;
	right_to_left?: boolean;
	subs_position?: SubtitlesPosition;
	highlight_color?: string;
	video_file_input: string;
	output_transcript?: boolean;
	transcript_file_input?: string;
}
