export interface ProjectProps {
  id: string;
  title: string;
  content: string;
  date: string;
  description: string;
  image_link: string;
  button_link?: string;
  tags?: string[];
}
