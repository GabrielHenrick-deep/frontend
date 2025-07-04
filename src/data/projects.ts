import { Project } from '../types/projects';

export const projects: Project[] = [
  {
    id: '1',
    title: 'EcoTracker Mobile App',
    description: 'A comprehensive mobile application for tracking personal carbon footprint and promoting sustainable living habits.',
    longDescription: 'EcoTracker is a revolutionary mobile application designed to help individuals understand and reduce their environmental impact. Through intuitive tracking mechanisms and gamification elements, users can monitor their daily activities, set sustainability goals, and connect with like-minded individuals in their community.',
    category: 'Mobile Development',
    tags: ['React Native', 'TypeScript', 'Firebase', 'Sustainability'],
    imageUrl: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: 'https://demo.ecotracker.app',
    githubUrl: 'https://github.com/ecotracker/mobile',
    status: 'in-progress',
    startDate: '2024-01-15',
    completionDate: '2024-08-30',
    team: ['Alex Johnson', 'Maria Rodriguez', 'Chen Wei'],
    technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux Toolkit', 'React Navigation', 'Expo'],
    features: [
      'Real-time carbon footprint tracking',
      'Interactive sustainability challenges',
      'Community leaderboards and social features',
      'Personalized recommendations for eco-friendly alternatives',
      'Integration with smart home devices',
      'Offline data synchronization'
    ],
    challenges: [
      'Implementing accurate carbon calculation algorithms',
      'Designing an intuitive user experience for complex data',
      'Ensuring data privacy and security',
      'Optimizing app performance for older devices'
    ],
    outcomes: [
      '50,000+ downloads in the first month',
      '4.8/5 App Store rating',
      '30% average reduction in user carbon footprint',
      'Featured in Apple App Store "Apps We Love" section'
    ]
  },
  {
    id: '2',
    title: 'SmartFinance Dashboard',
    description: 'An intelligent financial management platform with AI-powered insights and automated investment recommendations.',
    longDescription: 'SmartFinance revolutionizes personal finance management by combining traditional budgeting tools with cutting-edge AI technology. The platform provides users with intelligent insights, automated categorization, and personalized investment strategies tailored to their financial goals and risk tolerance.',
    category: 'Web Development',
    tags: ['React', 'Node.js', 'AI/ML', 'Finance'],
    imageUrl: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: 'https://demo.smartfinance.io',
    githubUrl: 'https://github.com/smartfinance/dashboard',
    status: 'completed',
    startDate: '2023-09-01',
    completionDate: '2024-03-15',
    team: ['Sarah Kim', 'David Thompson', 'Raj Patel', 'Lisa Chen'],
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TensorFlow.js', 'D3.js', 'Stripe API'],
    features: [
      'AI-powered expense categorization',
      'Automated investment portfolio optimization',
      'Real-time market data integration',
      'Predictive financial modeling',
      'Multi-currency support',
      'Advanced data visualization and reporting'
    ],
    challenges: [
      'Integrating multiple financial data sources',
      'Implementing robust security measures for sensitive financial data',
      'Developing accurate AI models for financial predictions',
      'Creating intuitive visualizations for complex financial data'
    ],
    outcomes: [
      '10,000+ active users within 6 months',
      '$2.5M in managed investments',
      '95% user satisfaction rating',
      'Winner of FinTech Innovation Award 2024'
    ]
  },
  {
    id: '3',
    title: 'Virtual Reality Training Platform',
    description: 'An immersive VR platform for corporate training and skill development across various industries.',
    longDescription: 'Our VR Training Platform transforms traditional corporate training by creating immersive, interactive experiences that accelerate learning and retention. From safety training in hazardous environments to soft skills development, the platform offers scalable solutions for organizations of all sizes.',
    category: 'VR/AR Development',
    tags: ['Unity', 'C#', 'VR', 'Training'],
    imageUrl: 'https://images.pexels.com/photos/3761015/pexels-photo-3761015.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'in-progress',
    startDate: '2024-06-01',
    team: ['Michael Foster', 'Emma Williams', 'James Park'],
    technologies: ['Unity 3D', 'C#', 'Oculus SDK', 'SteamVR', 'Photon Networking', 'Blender'],
    features: [
      'Multi-user collaborative VR environments',
      'Realistic physics simulations',
      'Progress tracking and analytics',
      'Customizable training scenarios',
      'Voice recognition and spatial audio',
      'Cross-platform VR headset support'
    ],
    challenges: [
      'Optimizing VR performance across different hardware',
      'Creating realistic and engaging training scenarios',
      'Implementing seamless multiplayer functionality',
      'Ensuring accessibility for users with different abilities'
    ],
    outcomes: [
      'Pilot program with 5 Fortune 500 companies',
      '40% improvement in training retention rates',
      '60% reduction in training time compared to traditional methods'
    ]
  },
  {
    id: '4',
    title: 'Blockchain Supply Chain',
    description: 'A transparent and secure blockchain-based system for tracking products throughout the supply chain.',
    longDescription: 'This innovative blockchain solution provides end-to-end visibility and traceability in complex supply chains. By leveraging distributed ledger technology, we ensure transparency, authenticity, and accountability from manufacturer to consumer, revolutionizing how businesses manage their supply networks.',
    category: 'Blockchain',
    tags: ['Solidity', 'Web3', 'Supply Chain', 'Transparency'],
    imageUrl: 'https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: 'https://demo.supplychaintracker.io',
    githubUrl: 'https://github.com/blockchain-supply/tracker',
    status: 'completed',
    startDate: '2023-11-01',
    completionDate: '2024-07-20',
    team: ['Anna Kowalski', 'Roberto Silva', 'Yuki Tanaka', 'Omar Hassan'],
    technologies: ['Solidity', 'Web3.js', 'Ethereum', 'IPFS', 'React', 'Node.js', 'MongoDB'],
    features: [
      'Immutable product tracking records',
      'Smart contract automation for compliance',
      'Real-time supply chain visibility',
      'QR code integration for consumer verification',
      'Automated alerts for supply chain disruptions',
      'Multi-party collaboration tools'
    ],
    challenges: [
      'Scalability issues with blockchain transactions',
      'Integration with existing ERP systems',
      'Ensuring data privacy while maintaining transparency',
      'Managing gas fees and transaction costs'
    ],
    outcomes: [
      'Deployed across 3 major retail chains',
      '99.9% product traceability accuracy',
      '25% reduction in supply chain fraud',
      'ISO 27001 security certification achieved'
    ]
  },
  {
    id: '5',
    title: 'AI-Powered Healthcare Assistant',
    description: 'An intelligent healthcare platform that assists medical professionals with diagnosis and treatment recommendations.',
    longDescription: 'Our AI Healthcare Assistant empowers medical professionals with advanced diagnostic capabilities and evidence-based treatment recommendations. By analyzing patient data, medical literature, and clinical guidelines, the platform supports healthcare providers in making informed decisions and improving patient outcomes.',
    category: 'AI/Healthcare',
    tags: ['Python', 'TensorFlow', 'Healthcare', 'AI'],
    imageUrl: 'https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800',
    status: 'planning',
    startDate: '2024-10-01',
    team: ['Dr. Jennifer Martinez', 'Kevin Wu', 'Priya Sharma'],
    technologies: ['Python', 'TensorFlow', 'PyTorch', 'FastAPI', 'PostgreSQL', 'Docker', 'Kubernetes'],
    features: [
      'Medical image analysis and diagnosis',
      'Natural language processing for clinical notes',
      'Drug interaction and allergy checking',
      'Treatment protocol recommendations',
      'Patient risk assessment algorithms',
      'Integration with Electronic Health Records (EHR)'
    ],
    challenges: [
      'Ensuring AI model accuracy and reliability',
      'Compliance with healthcare regulations (HIPAA, GDPR)',
      'Managing sensitive patient data securely',
      'Gaining acceptance from medical professionals'
    ],
    outcomes: [
      'Research partnership with 3 major hospitals',
      'FDA approval process initiated',
      'Preliminary studies show 15% improvement in diagnostic accuracy'
    ]
  },
  {
    id: '6',
    title: 'Smart City IoT Platform',
    description: 'A comprehensive IoT platform for smart city infrastructure management and citizen engagement.',
    longDescription: 'The Smart City IoT Platform creates a connected urban ecosystem that optimizes city services, reduces environmental impact, and enhances citizen quality of life. Through a network of sensors and intelligent systems, cities can monitor everything from traffic patterns to air quality in real-time.',
    category: 'IoT',
    tags: ['IoT', 'Python', 'Smart City', 'Data Analytics'],
    imageUrl: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800',
    demoUrl: 'https://demo.smartcityiot.com',
    status: 'in-progress',
    startDate: '2024-03-01',
    team: ['Carlos Mendez', 'Fatima Al-Rashid', 'Tom Anderson', 'Ling Zhang'],
    technologies: ['Python', 'Django', 'PostgreSQL', 'InfluxDB', 'Grafana', 'MQTT', 'Docker', 'AWS IoT'],
    features: [
      'Real-time environmental monitoring',
      'Intelligent traffic management system',
      'Smart waste collection optimization',
      'Public safety incident detection',
      'Energy consumption optimization',
      'Citizen engagement mobile app'
    ],
    challenges: [
      'Managing massive amounts of sensor data',
      'Ensuring system reliability and uptime',
      'Integrating with legacy city infrastructure',
      'Balancing privacy concerns with data collection'
    ],
    outcomes: [
      'Pilot deployment in 2 cities',
      '20% reduction in traffic congestion',
      '15% improvement in emergency response times',
      'Citizens report 85% satisfaction with smart city services'
    ]
  }
];