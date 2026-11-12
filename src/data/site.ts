export const profile = {
  name: 'Tarun Vadapalli',
  email: 'tarun.vadapalli.1@gmail.com',
  github: 'https://github.com/TeleVision05',
  linkedin: 'https://www.linkedin.com/in/tarun-vadapalli',
};

export type Category = 'robotics' | 'simulation' | 'apps';

// Colors follow the robotics axis convention: X red, Y green, Z blue.
export const categories: Record<Category, { name: string; axis: 'x' | 'y' | 'z'; blurb: string }> =
  {
    robotics: {
      name: 'Robotics and vision',
      axis: 'z',
      blurb:
        'Cameras, calibration, 3D reconstruction and the math that turns pixels into positions.',
    },
    simulation: {
      name: 'Simulation and games',
      axis: 'x',
      blurb: 'Physics, procedural worlds and real-time 3D, several of them playable right here.',
    },
    apps: {
      name: 'Apps and tools',
      axis: 'y',
      blurb: 'Full-stack products and local AI tools that people can actually use.',
    },
  };

export const categoryOrder: Category[] = ['robotics', 'simulation', 'apps'];

export const experience = [
  {
    role: 'Software Engineer Intern',
    org: 'Hemut (YC X25)',
    detail: 'AI-powered trucking operations platform',
    when: 'Jan 2026 to now',
    points: [
      'Shipped 55+ merged pull requests across a Next.js and FastAPI backend and a React Native driver app.',
      'Built real-time driver and dispatcher messaging over WebSockets, and secure mobile sign-in.',
    ],
  },
  {
    role: 'Full-stack Developer',
    org: 'Atri Tech',
    detail: 'Dirtview, construction management software',
    when: 'Oct 2025 to now',
    points: [
      'Employee and certification tracking with automated compliance reminders, in React Native and Firebase.',
    ],
  },
  {
    role: 'AR/VR Developer',
    org: 'XCITE IDEA Lab, UC Riverside',
    detail: 'Immersive teaching experiences',
    when: 'Jun 2025 to now',
    points: [
      'Unity experiences for Meta Quest 2 that hold 90 FPS on standalone hardware.',
      'Research into Gaussian Splatting and 3D reconstruction for education.',
    ],
  },
  {
    role: 'Software Engineering Intern',
    org: 'Hindu YUVA USA',
    detail: 'Nonprofit platform',
    when: 'Jun 2025 to Oct 2025',
    points: ['Migrated a legacy PHP backend to Node.js and managed AWS deployments.'],
  },
];

export const education = {
  school: 'University of California, Riverside',
  degree: 'B.S. Robotics Engineering',
  when: '2024 to 2028',
};
