import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const folders = [
  {
    cloudinaryFolder: "benjamin/illustration",
    category: "illustration",
  },
  {
    cloudinaryFolder: "benjamin/sketches",
    category: "sketches",
  },
  {
    cloudinaryFolder: "benjamin/motion_graphics",
    category: "motion",
  },
  {
    cloudinaryFolder: "benjamin/3d",
    category: "3d",
  },
];

async function generateProjects() {
  let allProjects = [];
  let currentId = 1;

  // Generate projectData.js
  for (const folderData of folders) {
    const result = await cloudinary.search
      .expression(`folder="${folderData.cloudinaryFolder}"`)
      .max_results(500)
      .execute();

    const projects = result.resources
      .sort((a, b) =>
        a.display_name.localeCompare(b.display_name, undefined, {
          numeric: true,
          sensitivity: "base",
        }),
      )
      .map((item) => ({
        id: currentId++,
        src: item.secure_url,
        category: folderData.category,
      }));

    allProjects.push(...projects);
  }

  const projectContent = `
// ============================================================
// AUTO GENERATED PROJECTS
// ============================================================

export const PROJECTS = ${JSON.stringify(allProjects, null, 2)};
`;

  fs.writeFileSync("./src/data/projectData.js", projectContent);

  // Generate featuredProjects.js
  const featuredResult = await cloudinary.search
    .expression('folder="benjamin/All Projects"')
    .max_results(500)
    .execute();

  const featuredProjects = featuredResult.resources
    .sort((a, b) =>
      a.display_name.localeCompare(b.display_name, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .map((item) => ({
      id: currentId++,
      src: item.secure_url,
      category: "all_projects",
    }));

  const featuredContent = `
// ============================================================
// AUTO GENERATED FEATURED PROJECTS
// ============================================================

export const FEATURED_PROJECTS = ${JSON.stringify(featuredProjects, null, 2)};
`;

  fs.writeFileSync("./src/data/featuredProjects.js", featuredContent);

  console.log("projectData.js generated successfully");
  console.log("featuredProjects.js generated successfully");
}

generateProjects().catch(console.error);
