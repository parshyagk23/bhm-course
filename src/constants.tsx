
import { Course, Professional } from './types';

export const COLORS = {
  primary: '#0D2A4A', // Dark Navy
  secondary: '#2D61A1', // Royal Blue
  accent: '#F9A825', // Gold/Yellow
  muted: '#64748B',
  bg: '#F8FAFC'
};

export const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'AUTOCAD ARCHITECTURAL',
    category: 'B.Tech',
    subCategory: 'Structural',
    videos: 51,
    freeContent: 5,
    tests: 5,
    files: 5,
    originalPrice: 4000,
    discountPrice: 1499,
    discountPercentage: 63,
    image: 'https://placehold.co/600x400/0D2A4A/white?text=AutoCAD+Architectural',
    validity: '3 Years',
    instructor: {
      name: 'Mr. SRINIVASAREDDY',
      experience: '5+ Years',
      designation: 'Structural Engineer (USA) Msc, Structural Engineering',
      skills: ['Planning', 'Vastu', '2D Design', 'Regulatory Compliance'],
      image: 'https://placehold.co/100x100/2D61A1/white?text=SR'
    }
  },
  {
    id: '2',
    title: 'ARCHITECTURAL MEGA COMBO (4 IN 1)',
    category: 'B.Tech',
    subCategory: 'Structural',
    videos: 51,
    freeContent: 5,
    tests: 5,
    files: 5,
    originalPrice: 12000,
    discountPrice: 6999,
    discountPercentage: 63,
    image: 'https://placehold.co/600x400/0D2A4A/white?text=Architectural+Mega+Combo',
    validity: '3 Years',
    instructor: {
      name: 'Mr. SRINIVASAREDDY',
      experience: '5+ Years',
      designation: 'Structural Engineer (USA) Msc, Structural Engineering',
      skills: ['Planning', 'Vastu', '2D Design', 'Regulatory Compliance'],
      image: 'https://placehold.co/100x100/2D61A1/white?text=SR'
    }
  }
];

export const PROFESSIONALS: Professional[] = [
  {
    id: 'p1',
    name: 'Mr. Ravi Charan',
    location: 'Toronto, Canada',
    rating: 5.0,
    designation: 'Structural Project Engineer',
    experience: '5+ yrs',
    skills: ['Estimation', 'BlueBeam', 'Procore'],
    company: 'Armour Heights and developments',
    image: 'https://placehold.co/100x100/2D61A1/white?text=RC'
  },
  {
    id: 'p2',
    name: 'Mr. Vinod Kumar',
    location: 'Connecticut, USA',
    rating: 5.0,
    designation: 'Construction Inspector',
    experience: '8+ yrs',
    skills: ['Highway Paving', 'Bridges', 'Site Management'],
    company: 'GM2 Associates Inc | Ex TATA Projects Limited',
    image: 'https://placehold.co/100x100/2D61A1/white?text=VK'
  }
];
