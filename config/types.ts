export interface ProjectProps {
  id: string;
  title: string;
  content: string;
  date: string;
  description: string;
  image_link: string;
  button_link?: string;
  priority?: number;
  tags?: string[];
}

export interface BlogLinkProps {
  id: string;
  title: string;
  content: string;
  date: string;
  description: string;
  image_link: string;
  button_link?: string;
  priority?: number;
  tags?: string[];
}
