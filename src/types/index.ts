export interface Project {
  id: string;
  title: string;
  category: 'majlis' | 'tv-units' | 'bedrooms' | 'storage';
  categoryLabel: string;
  district: string;
  image: string;
  description: string;
  tags: string[];
  specs: {
    paintType?: string;
    materials?: string;
    lighting?: string;
    duration?: string;
    colorCode?: string;
  };
  featured?: boolean;
  span?: string;
  viewsCount?: number;
}

export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDesc: string;
  fullDesc: string;
  badge: string;
  features: string[];
  materialsUsed: string[];
}

export interface PackagePlan {
  id: string;
  title: string;
  tagline: string;
  pricingBadge?: string;
  badge?: string;
  recommendedFor: string;
  features: string[];
  includes: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  district: string;
  propertyType: string;
  rating: number;
  comment: string;
  date: string;
}
