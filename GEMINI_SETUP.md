# Gemini AI Chat Setup Guide

This guide will help you set up the Google Gemini AI integration for the chat assistant in your Feline Neurological Diagnosis Expert System.

## Quick Setup

1. **Get your API key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Sign in with your Google account
   - Click "Create API Key"
   - Copy the generated key

2. **Configure in the app:**
   - Run your diagnosis system
   - Click the "Configure API Key" button in the chat section
   - Paste your API key and save

That's it! The chat assistant will now be powered by Google's Gemini AI.

## Features

- **Context-aware responses**: The AI knows about the current diagnosis
- **Medical safety**: Configured to emphasize veterinary consultation
- **Educational focus**: Provides explanations while maintaining professional boundaries
- **Secure storage**: API key is stored locally in your browser

## API Key Security

- Your API key is stored locally in your browser's localStorage
- It's never sent to any servers except Google's Gemini API
- You can clear it anytime by clearing your browser data

## Troubleshooting

### "API key not configured" error
- Make sure you've entered a valid Gemini API key
- Check that the key hasn't expired in Google AI Studio

### "Quota exceeded" error
- You've reached your free tier limit
- Check your usage in Google Cloud Console
- Consider upgrading your plan if needed

### "Safety filter" warnings
- Gemini has safety filters that may block certain content
- Try rephrasing your question in a more general way

## Cost Information

- Google Gemini has a generous free tier
- Typical usage for this chat assistant should stay within free limits
- Monitor your usage at [Google AI Studio](https://makersuite.google.com/)

## Privacy

- Conversations are not stored permanently
- Only the current diagnosis context is shared with the AI
- No personal information is transmitted beyond what you type

## Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key is valid
3. Ensure you have internet connectivity
4. Try refreshing the page

For more information about Gemini API, visit the [official documentation](https://ai.google.dev/).