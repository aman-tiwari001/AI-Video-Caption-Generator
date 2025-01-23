import { VideoCaptionConfig } from '@/types/video';

export const submitVideoToReplicate = async (inputData: VideoCaptionConfig) => {
  const response = await fetch(
    process.env.REPLICATE_API_URL + '/v1/predictions',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
        'Prefer': 'wait',
      },
      body: JSON.stringify({
        version: process.env.REPLICATE_MODEL_VERSION,
        input: inputData,
        webhook: process.env.WEBHOOK_URL,
        webhook_events_filter: ['completed'],
      }),
    },
  );
  const data = await response.json();
  return data;
};
