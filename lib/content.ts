import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface AutopsyMetadata {
  title: string;
  subtitle: string;
  author: string;
  date: string;
  lossTotal: string;
  timeframe: string;
}

export interface AutopsyContent {
  metadata: AutopsyMetadata;
  content: string;
}

export async function getAutopsyContent(): Promise<AutopsyContent> {
  const filePath = path.join(CONTENT_DIR, "autopsy.mdx");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    metadata: data as AutopsyMetadata,
    content,
  };
}
