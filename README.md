# 🐱 Feline Neurological Diagnosis Expert System

An intelligent diagnostic system for feline neurological conditions with integrated AI chat assistant.

## Features

### 🧠 Expert Diagnosis System
- **Priority Waterfall Logic**: Evaluates 30+ diagnostic rules in strict priority order
- **Single Output System**: Returns exactly one diagnosis per evaluation
- **Comprehensive Assessment**: Covers age, mobility, seizures, and clinical signs
- **Educational Interface**: Shows rule explanations and system logic

### 🤖 AI Chat Assistant (NEW!)
- **Gemini AI Integration**: Powered by Google's Gemini AI model
- **Context-Aware**: Understands the current diagnosis and provides relevant information
- **Medical Safety**: Emphasizes veterinary consultation and professional boundaries
- **Educational Focus**: Explains conditions while maintaining appropriate disclaimers

### 🎯 Clinical Categories
- **Tier 1**: Critical/Trauma conditions (Priority 1-5)
- **Tier 2**: Metabolic/Acute conditions (Priority 6-11)
- **Tier 3**: Infectious/Inflammatory conditions (Priority 12-16)
- **Tier 4**: Structural/Tumor conditions (Priority 17-21)
- **Tier 5**: Functional/Degenerative conditions (Priority 22-26)
- **Tier 6**: Exclusion conditions (Priority 27-30)

## Quick Start

1. **Open the system**: Open `index.html` in your web browser
2. **Complete assessment**: Fill out all required clinical fields
3. **Run diagnosis**: Click "Run Enhanced Diagnosis" to get results
4. **Setup AI chat** (optional): Configure your Gemini API key for chat assistance

## AI Chat Setup

To enable the AI chat assistant:

1. Get a free API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Configure API Key" in the chat section
3. Paste your key and save

See [GEMINI_SETUP.md](GEMINI_SETUP.md) for detailed setup instructions.

## Files Structure

- `index.html` - Main application interface
- `script.js` - Application logic and AI integration
- `engine.js` - Diagnostic engine implementation
- `data.js` - Knowledge base and diagnostic rules
- `styles.css` - Medical-themed styling
- `GEMINI_SETUP.md` - AI chat setup guide

## Educational Purpose

This system demonstrates:
- Expert system implementation with rule-based logic
- Priority-based decision making
- Medical interface design principles
- AI integration for educational support
- Responsible AI use in healthcare contexts

## Important Disclaimer

⚠️ **This system is for educational purposes only. Always consult a licensed veterinarian for actual medical diagnosis and treatment of animals.**

## Browser Compatibility

- Modern browsers with JavaScript enabled
- Chrome, Firefox, Safari, Edge (latest versions)
- No server required - runs entirely in the browser

## Privacy & Security

- All processing happens locally in your browser
- API key stored locally (not transmitted to our servers)
- No personal data collection or storage
- Conversations with AI are not permanently stored
