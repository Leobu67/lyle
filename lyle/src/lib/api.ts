import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const transcriptsDirectory = path.join(process.cwd(), "data", "transcripts");

export type TranscriptMetadata = {
  videoId: string;
  title: string;
  date: string;
  thumbnailUrl: string;
};

export function getAllTranscripts(): TranscriptMetadata[] {
  if (!fs.existsSync(transcriptsDirectory)) return [];
  const fileNames = fs.readdirSync(transcriptsDirectory);
  const allTranscripts = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(transcriptsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const matterResult = matter(fileContents);
      return {
        videoId: fileName.replace(/\.md$/, ""),
        ...(matterResult.data as Omit<TranscriptMetadata, "videoId">),
      };
    });
  // Sort transcripts by date
  return allTranscripts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getTranscriptData(videoId: string) {
  const fullPath = path.join(transcriptsDirectory, `${videoId}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    videoId,
    contentHtml,
    ...(matterResult.data as Omit<TranscriptMetadata, "videoId">),
  };
}
