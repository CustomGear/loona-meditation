'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  context?: string;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  initialMessage: string;
}

interface Response {
  text: string;
  followUp?: string[];
  context?: string;
}

interface ConversationContext {
  topic?: string;
  emotionalState?: string;
  previousContext?: string;
  meditationLevel?: 'beginner' | 'intermediate' | 'advanced';
  stressLevel?: 'low' | 'medium' | 'high';
  focusAreas?: string[];
}

const TOPICS: Topic[] = [
  {
    id: 'mindfulness',
    title: 'Mindful Growth',
    description: 'Balance success with well-being',
    initialMessage: "Let's explore mindfulness together. What's been on your mind lately?"
  },
  {
    id: 'meditation',
    title: 'Meditation',
    description: 'Find peace and clarity',
    initialMessage: "Ready to start your meditation journey? We can explore different techniques together."
  },
  {
    id: 'general',
    title: 'Open Chat',
    description: 'Explore any topic',
    initialMessage: "I'm here to chat about whatever matters to you. What would you like to discuss?"
  }
];

const MEDITATION_RESPONSES: Response[] = [
  {
    text: "Meditation can be a powerful tool for finding inner peace. Would you like to try a quick breathing exercise or explore different meditation techniques?",
    followUp: ["breathing", "body scan", "mindfulness", "guided"]
  },
  {
    text: "There are many different meditation styles - from mindfulness to transcendental meditation. What aspects of meditation interest you most?",
    followUp: ["stress relief", "focus", "spiritual growth", "sleep"]
  },
  {
    text: "Starting a meditation practice can be transformative. We can begin with a simple 5-minute breathing exercise if you'd like.",
    followUp: ["breathing", "quick start", "guided", "techniques"]
  }
];

const STRESS_RESPONSES: Response[] = [
  {
    text: "I hear you. Stress can be overwhelming, but we'll work through this together. Can you tell me more about what's causing you stress?",
    followUp: ["work", "relationships", "health", "future"]
  },
  {
    text: "It takes courage to acknowledge stress. Let's explore some coping strategies together. What kind of support would be most helpful right now?",
    followUp: ["immediate relief", "long-term strategies", "talking", "exercises"]
  },
  {
    text: "Stress affects us all differently. Would you like to try some immediate stress-relief techniques, or would you prefer to talk through what's on your mind?",
    followUp: ["quick relief", "talk", "breathe", "meditate"]
  }
];

const MINDFULNESS_RESPONSES: Response[] = [
  {
    text: "Mindfulness helps us stay present and find peace in our daily lives. What aspects of mindfulness practice interest you most?",
    followUp: ["daily practice", "meditation", "awareness", "presence"]
  },
  {
    text: "Being mindful can transform how we experience each moment. Would you like to explore some simple mindfulness exercises together?",
    followUp: ["breathing", "observation", "body scan", "walking"]
  },
  {
    text: "Mindfulness is about being present without judgment. Shall we start with a quick mindfulness exercise to center ourselves?",
    followUp: ["quick exercise", "discussion", "techniques", "practice"]
  }
];

const GENERAL_RESPONSES: Response[] = [
  {
    text: "I'm here to support your journey toward greater well-being. What's been on your mind lately?",
    followUp: ["stress", "meditation", "mindfulness", "growth"]
  },
  {
    text: "Sometimes the first step is just talking things through. What would you like to explore today?",
    followUp: ["feelings", "challenges", "goals", "practices"]
  },
  {
    text: "Every conversation is a step toward greater awareness. What area of your life would you like to focus on?",
    followUp: ["personal growth", "relationships", "work", "health"]
  }
];

const BREATHING_EXERCISE = {
  text: "Let's try a simple breathing exercise together. Find a comfortable position and follow along:\n\n1. Take a deep breath in through your nose for 4 counts\n2. Hold for 4 counts\n3. Exhale slowly through your mouth for 6 counts\n4. Repeat this cycle 3 times\n\nWould you like to continue with more breathing exercises?",
  context: "breathing_exercise"
};

const QUICK_RELIEF = {
  text: "Here's a quick grounding technique called 5-4-3-2-1:\n\n• Notice 5 things you can see\n• Notice 4 things you can touch\n• Notice 3 things you can hear\n• Notice 2 things you can smell\n• Notice 1 thing you can taste\n\nHow do you feel after trying this?",
  context: "grounding_exercise"
};

export default function ChatLogic() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([{
    id: Date.now().toString(),
    text: "Hi! I'm Luna, your mindfulness companion. Choose a topic you'd like to explore or just start chatting.",
    sender: 'ai',
    timestamp: new Date()
  }]);
  const [conversationContext, setConversationContext] = useState<ConversationContext>({});
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const analyzeMessage = (text: string): ConversationContext => {
    const lowercaseText = text.toLowerCase();
    const context: ConversationContext = { ...conversationContext };

    // Detect meditation experience level
    if (lowercaseText.includes('never') || lowercaseText.includes('start') || lowercaseText.includes('begin')) {
      context.meditationLevel = 'beginner';
    } else if (lowercaseText.includes('sometimes') || lowercaseText.includes('occasionally')) {
      context.meditationLevel = 'intermediate';
    } else if (lowercaseText.includes('regular') || lowercaseText.includes('daily') || lowercaseText.includes('years')) {
      context.meditationLevel = 'advanced';
    }

    // Detect stress level
    const stressIndicators = {
      high: ['overwhelming', 'terrible', 'severe', 'extreme', 'panic'],
      medium: ['stressed', 'anxious', 'worried', 'nervous'],
      low: ['little', 'mild', 'slight', 'bit']
    };

    for (const [level, words] of Object.entries(stressIndicators)) {
      if (words.some(word => lowercaseText.includes(word))) {
        context.stressLevel = level as 'low' | 'medium' | 'high';
        break;
      }
    }

    // Track focus areas
    const focusAreas = [
      'sleep', 'work', 'relationship', 'anxiety', 'depression',
      'focus', 'energy', 'motivation', 'peace', 'clarity'
    ];

    context.focusAreas = focusAreas.filter(area => lowercaseText.includes(area));

    return context;
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(userMessage.text),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateResponse = (input: string): string => {
    const lowercaseInput = input.toLowerCase();
    const context = analyzeMessage(input);
    setConversationContext(prev => ({ ...prev, ...context }));

    // Check for immediate help requests
    if (lowercaseInput.includes('help') && (lowercaseInput.includes('now') || lowercaseInput.includes('immediate'))) {
      return QUICK_RELIEF.text;
    }

    // Check for breathing exercise requests
    if (lowercaseInput.includes('breathing') || lowercaseInput.includes('breath')) {
      return BREATHING_EXERCISE.text;
    }

    // Handle stress based on detected level
    if (context.stressLevel) {
      switch (context.stressLevel) {
        case 'high':
          return "I can hear that you're going through a really difficult time. Let's focus on immediate relief first. Would you like to try a quick grounding exercise, or would you prefer to talk through what's happening?";
        case 'medium':
          return "It sounds like you're carrying quite a bit of stress. We can work on this together. Would you like to explore some coping strategies or try a calming exercise?";
        case 'low':
          return "Thank you for sharing. Even mild stress is worth addressing. Would you like to learn some preventive techniques to help manage stress levels?";
      }
    }

    // Handle meditation based on experience level
    if (context.meditationLevel && lowercaseInput.includes('meditat')) {
      switch (context.meditationLevel) {
        case 'beginner':
          return "Welcome to meditation! Let's start with something simple. Would you like to try a 2-minute breathing meditation to get a feel for it?";
        case 'intermediate':
          return "Since you have some meditation experience, we could explore different techniques. Are you interested in body scan meditation, loving-kindness practice, or something else?";
        case 'advanced':
          return "With your meditation experience, we could dive deeper. Would you like to explore advanced techniques or discuss specific aspects of your practice?";
      }
    }

    // Handle focus areas
    if (context.focusAreas && context.focusAreas.length > 0) {
      const area = context.focusAreas[0];
      const responses = {
        sleep: "Sleep is crucial for our well-being. Would you like to try a relaxation technique specifically designed to help with sleep?",
        work: "Work-related challenges can be demanding. Shall we explore some mindfulness techniques to enhance focus and reduce work stress?",
        relationship: "Relationships can bring both joy and challenges. Would you like to explore some mindfulness practices for better emotional awareness and communication?",
        focus: "Improving focus is possible with the right techniques. Would you like to try a short concentration exercise?",
        motivation: "Let's explore what motivates you and work on building sustainable energy. What typically helps you feel most motivated?"
      };
      return responses[area as keyof typeof responses] || generateContextualResponse(input);
    }

    return generateContextualResponse(input);
  };

  const generateContextualResponse = (input: string): string => {
    // Emotion words detection
    const emotionWords = {
      positive: ['happy', 'joy', 'excited', 'grateful', 'peaceful'],
      negative: ['sad', 'angry', 'frustrated', 'depressed', 'anxious'],
      neutral: ['okay', 'fine', 'normal', 'unsure', 'wondering']
    };

    // Check for emotional context
    for (const [tone, words] of Object.entries(emotionWords)) {
      if (words.some(word => input.includes(word))) {
        if (tone === 'positive') {
          return "It's wonderful to hear you're feeling that way! Would you like to explore how to maintain and build upon these positive feelings?";
        } else if (tone === 'negative') {
          return "I hear the challenge in what you're sharing. Know that it's okay to feel this way. Would you like to talk more about it or explore some coping strategies?";
        }
      }
    }

    // Question detection
    if (input.includes('?')) {
      if (input.includes('how')) {
        return "That's a great question about process. Let's break this down into manageable steps. Where would you like to begin?";
      } else if (input.includes('why')) {
        return "Understanding the 'why' is important. Let's explore this together. What are your thoughts on this?";
      }
    }

    // Get contextual response
    let responses = GENERAL_RESPONSES;
    if (input.toLowerCase().includes('meditate')) {
      responses = MEDITATION_RESPONSES;
    } else if (input.toLowerCase().includes('stress')) {
      responses = STRESS_RESPONSES;
    } else if (input.toLowerCase().includes('mindful')) {
      responses = MINDFULNESS_RESPONSES;
    }

    const response = responses[Math.floor(Math.random() * responses.length)];
    return response.text;
  };

  const selectTopic = (topic: Topic) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text: topic.title,
      sender: 'user',
      timestamp: new Date()
    }, {
      id: (Date.now() + 1).toString(),
      text: topic.initialMessage,
      sender: 'ai',
      timestamp: new Date()
    }]);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#030303]">
      {/* Header */}
      <div className="bg-[#0F0F24]/50 backdrop-blur-sm px-4 py-3 flex items-center border-b border-white/10 sticky top-0 z-20">
        <button 
          onClick={() => router.back()}
          className="text-white/70 hover:text-white transition-colors p-1.5 hover:bg-white/5 rounded-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-2xl font-light text-white/90 ml-2">Chat with Luna</h1>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 relative scroll-smooth scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {messages.length === 1 && (
          <div className="grid gap-3">
            {TOPICS.map((topic) => (
              <motion.button
                key={topic.id}
                onClick={() => selectTopic(topic)}
                className="w-full group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="bg-gradient-to-br from-[#1a1a3a]/60 to-[#2a2a4a]/60 p-5 rounded-2xl text-left hover:from-[#2a2a4a]/70 hover:to-[#3a3a5a]/70 transition-all duration-500 border border-white/5 hover:border-white/20 shadow-lg hover:shadow-2xl backdrop-blur-sm relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <h2 className="text-lg sm:text-xl font-light text-white/90 mb-1 tracking-wide group-hover:text-white/100 transition-colors duration-500">{topic.title}</h2>
                  <p className="text-sm text-white/50 tracking-wide group-hover:text-white/70 transition-colors duration-500">{topic.description}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} ${index === messages.length - 1 ? 'mb-4' : ''}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message.sender === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mr-2 mt-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400/40 to-purple-400/40 opacity-50" />
              </div>
            )}
            <div
              className={`max-w-[85%] sm:max-w-[75%] relative group ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[20px_4px_20px_20px]'
                  : 'bg-gradient-to-br from-[#1a1a3a]/60 to-[#2a2a4a]/60 rounded-[4px_20px_20px_20px]'
              } p-4 backdrop-blur-sm`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                message.sender === 'user'
                  ? 'rounded-[20px_4px_20px_20px]'
                  : 'rounded-[4px_20px_20px_20px]'
              }`} />
              <p className="text-white/90 relative z-10 text-[15px] leading-relaxed whitespace-pre-line">{message.text}</p>
              <span className="text-white/30 text-[11px] mt-2 block relative z-10">
                {formatTime(message.timestamp)}
              </span>
            </div>
            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center ml-2 mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white/40">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </motion.div>
        ))}
        <div ref={messagesEndRef} className="h-4" />
      </div>

      {/* Input Form */}
      <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-[#030303] to-transparent pt-4">
        <form onSubmit={handleSendMessage} className="px-3 pb-4 relative z-10">
          <div className="relative group">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="w-full bg-[#1a1a3a]/40 text-white/90 placeholder-white/50 px-4 py-3.5 rounded-2xl border border-white/10 focus:border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 pr-12 backdrop-blur-sm text-[15px]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-xl bg-gradient-to-br from-blue-500/80 to-purple-500/80 text-white/90 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
              disabled={!inputValue.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 transform -rotate-45"
              >
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 