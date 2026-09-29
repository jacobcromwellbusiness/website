export type Project = {
  slug: string;
  published: boolean;
  title: string;
  category: string;
  year: string;
  summary: string;
  challenge?: string;
  approach?: string;
  outcome?: string;
  tools: string[];
  cover: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  gallery?: Array<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>;
  externalUrl?: string;
};

export type Capability = {
  id: string;
  title: string;
  topics: string[];
  visual: string; // Describes the visual treatment
};

export type Experiment = {
  id: string;
  published: boolean;
  year: string;
  title: string;
  type: string;
  externalUrl?: string;
};
