import { LucideIcon } from 'lucide-react';

export enum Brand {
  PERSONAL = 'itskiranbabu',
  PRODUCT = 'itskeyrun.ai',
  COMMUNITY = 'itscontentspark',
}

export enum ProductType {
  NOTION_TEMPLATE = 'Notion Template',
  PROMPT_PACK = 'Prompt Pack',
  BUNDLE = 'Bundle',
  MINI_TOOL = 'Mini Tool',
}

export interface Service {
  id: string;
  title: string;
  description: string;
  priceStart: string;
  features: string[];
  icon: LucideIcon;
  category: 'Development' | 'Systems' | 'Content' | 'Strategy';
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  type: ProductType;
  image: string;
  url: string;
  featured?: boolean;
}

export interface CaseStudy {
  id: string;
  client: string;
  title: string;
  category: string;
  result: string;
  image: string;
}

export interface NavItem {
  label: string;
  path: string;
  external?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  value: string;
  source: string;
  createdAt: number;
}
