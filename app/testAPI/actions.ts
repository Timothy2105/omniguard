'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
if (!GOOGLE_API_KEY) {
  throw new Error('GOOGLE_API_KEY is not set');
}

const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

export async function generateGeminiResponse(formData: FormData) {
  try {
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      throw new Error('Image is required');
    }

    const imageBytes = await imageFile.arrayBuffer();

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const imagePart = {
      inlineData: {
        data: Buffer.from(imageBytes).toString('base64'),
        mimeType: imageFile.type,
      },
    };

    const result = await model.generateContent([
      'What do you see in this image? Please describe it in detail.',
      imagePart,
    ]);

    const response = await result.response;
    return response.text();
  } catch (error: any) {
    console.error('Error processing image:', error);
    throw new Error(`Failed to process image: ${error.message}`);
  }
}
