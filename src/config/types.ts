import { z } from 'astro:content';
// export interface ProjectProps {
//     id: string;
//     title: string;
//     content: string;
//     date_range: string;
//     description: string;
//     image_links: string[];
//     image_captions: string[];
//     button_link?: string;
//     priority?: number;
//     tags?: string[];
// }

// export interface BlogLinkProps {
//     id: string;
//     title: string;
//     content: string;
//     date_range: string;
//     description: string;
//     image_link: string;
//     button_link?: string;
//     priority?: number;
//     tags?: string[];
// }

export const ProjectSchema = z.object({
        id: z.string(),
        title: z.string(),
        date_range: z.string(),
        description: z.string(),
        image_links: z.array(z.string()),
        image_captions: z.array(z.string()).optional(),
        button_link: z.string().optional(),
        priority: z.number().optional(),
        tags: z.array(z.string()).optional(),
    })

export type ProjectProps = z.infer<typeof ProjectSchema>;