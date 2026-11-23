import fs from "fs";
import path from "path";
import matter from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "content");
const CURRICULUM_DIR = path.join(CONTENT_DIR, "curriculum");

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

export interface CurriculumMetadata {
  index: string;
  slug: string;
  title: string;
  outcome: string;
  duration: string;
  failureCorrects: string;
}

export interface CurriculumModuleDetail {
  metadata: CurriculumMetadata;
  content: string;
  prevModule: { slug: string; title: string; index: string } | null;
  nextModule: { slug: string; title: string; index: string } | null;
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

export async function getAllCurriculumModules(): Promise<CurriculumMetadata[]> {
  const files = fs.readdirSync(CURRICULUM_DIR).filter((f) => f.endsWith(".mdx"));
  
  const modules = files.map((fileName) => {
    const filePath = path.join(CURRICULUM_DIR, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return data as CurriculumMetadata;
  });

  // Sort by index ascending (01 to 10)
  return modules.sort((a, b) => parseInt(a.index, 10) - parseInt(b.index, 10));
}

export async function getCurriculumModuleBySlug(
  slug: string
): Promise<CurriculumModuleDetail | null> {
  const allModules = await getAllCurriculumModules();
  const currentIndex = allModules.findIndex((m) => m.slug === slug);

  if (currentIndex === -1) return null;

  const currentMeta = allModules[currentIndex];
  const filePath = path.join(CURRICULUM_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content } = matter(fileContents);

  const prevMeta = currentIndex > 0 ? allModules[currentIndex - 1] : null;
  const nextMeta = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;

  return {
    metadata: currentMeta,
    content,
    prevModule: prevMeta ? { slug: prevMeta.slug, title: prevMeta.title, index: prevMeta.index } : null,
    nextModule: nextMeta ? { slug: nextMeta.slug, title: nextMeta.title, index: nextMeta.index } : null,
  };
}
