# OmniGuard - AI-Powered Security Surveillance

## Try It Out!

[omniguard.vercel.app](https://omniguard.vercel.app/)

## Overview

OmniGuard is an intelligent video surveillance platform that detects crime, suspicious activities and life threatening events such as fainting and choking and sends phone alerts to alert security of the issue. The model generates time-stamped incident reports with video evidence. It has 3 main features:

1. Real-time analysis of video streams using Google's Gemini Visual Language Model
2. An upload feature that uploads an existing mp4 file for crime analysis
3. A library of saved livestream footage and mp4 uploads, with detailed security analysis complete with timeline and information which is saved with each entry

### Additional features

- Sends instant alerts to security through email/phone notifications
- Provides an intuitive dashboard for monitoring multiple cameras
- Offers an OpenAI powered assistant that provides contextual support. The bot is fed real-time information about the ongoing event and can respond to user queries, such as "What should I do in this situation" if someone has passed out, helping with quick context-aware advice
- Offers both real-time streaming and uploaded video analysis
- Statistics page which offers an AI summary, chart analysis, and the option to export to CSV.

## Tech Stack

- **Frontend**: The UI is built with Next.js 13+ and TypeScript, paired with Tailwind CSS for a sleek, responsive design. This ensures a seamless experience for users across different devices.
- **Backend**: We use Supabase for secure user authentication and database management, allowing for easy access control and efficient data handling.
- **AI Processing**: HawkWatch uses Google's Gemini Visual Language Model (VLM) for real-time video analysis and TensorFlow.js for processing video streams on the client side. These models enable accurate event detection, ranging from criminal activity to health-related emergencies.
- **Email/Phone Service**: Resend API powers our email and phone notification system, ensuring that alerts are sent in real-time with minimal delays.
- **Real-time Updates**: We leverage the Canvas API for live updates, ensuring that HawkWatch’s real-time analysis is fast and accurate, even as it processes multiple video streams.
- **Contextual Assistance**: OpenAI’s language models are integrated to power our assistant bot, which helps security teams with situational guidance. The bot uses context from the most recent events to offer real-time advice, improving the decision-making process during critical moments.
