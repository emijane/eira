export type LibraryTool = {
    id: string | number;
    name: string;
    description: string | null;
    category: string | null;
    subcategory: string | null;
    tags: string[] | null;
    image_file_name: string | null;
};
