import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as fs from "fs";
import * as path from "path";
import * as bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting migration...");

  // 1. Create admin user
  console.log("Creating admin user...");
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.user.upsert({
    where: { email: "admin@stimulusgroups.org" },
    update: {},
    create: {
      email: "admin@stimulusgroups.org",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  // 2. Create categories
  console.log("Creating categories...");
  const categoriesData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "pages_and_categories.json"), "utf-8")
  );
  const categoryMap: Record<string, string> = {};
  for (const cat of categoriesData.categories) {
    if (cat.count > 0) {
      const created = await prisma.category.upsert({
        where: { slug: cat.slug },
        update: { name: cat.name },
        create: { name: cat.name, slug: cat.slug },
      });
      categoryMap[cat.name] = created.id;
    }
  }
  console.log(`  ${Object.keys(categoryMap).length} categories created`);

  // 3. Import articles — clear first
  console.log("Clearing old articles...");
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  console.log("Importing articles...");
  const articles = JSON.parse(
    fs.readFileSync(path.join(__dirname, "articles.json"), "utf-8")
  );
  let articleCount = 0;
  const articleIdMap: Record<number, string> = {};
  for (const article of articles) {
    const cats: string[] = article.categories || [];
    const categoryId = (cats.length > 0 && categoryMap[cats[0]]) ? categoryMap[cats[0]] : null;
    const slug = decodeURIComponent(article.slug).substring(0, 200);

    let created;
    try {
      created = await prisma.article.create({
        data: {
          title: article.title,
          slug,
          content: article.content || "",
          excerpt: article.excerpt || null,
          featuredImage: article.featured_image || null,
          authorName: "د. سمير عبد العزيز الوسيمي",
          published: true,
          publishedAt: new Date(article.date),
          categoryId,
          wpId: parseInt(article.id),
        },
      });
    } catch (err: any) {
      if (articleCount === 0) console.error(JSON.stringify(err, null, 2).substring(0, 500));
      created = await prisma.article.findUnique({ where: { slug } });
      if (!created) continue;
    }
    articleIdMap[article.id] = created.id;
    articleCount++;
  }
  console.log(`  ${articleCount} articles imported`);

  // 4. Import comments
  console.log("Importing comments...");
  const comments = JSON.parse(
    fs.readFileSync(path.join(__dirname, "comments.json"), "utf-8")
  );
  let commentCount = 0;
  for (const comment of comments) {
    const articleId = articleIdMap[parseInt(comment.post_id)];
    if (!articleId) continue;
    await prisma.comment.create({
      data: {
        content: comment.content,
        author: comment.author,
        email: comment.email || null,
        approved: comment.approved === "1",
        createdAt: new Date(comment.date),
        articleId,
        wpId: parseInt(comment.id),
      },
    });
    commentCount++;
  }
  console.log(`  ${commentCount} comments imported`);

  // 5. Create team members
  console.log("Creating team members...");
  const team = [
    { name: "د. ياسر فتحي", role: "رئيس المنظمة", imageUrl: "https://stimulusgroups.org/wp-content/uploads/2023/08/st1.png", sortOrder: 1 },
    { name: "خالد فؤاد", role: "عضو مؤسس", imageUrl: "https://stimulusgroups.org/wp-content/uploads/2023/08/st2.png", sortOrder: 2 },
    { name: "أحمد محسن", role: "عضو مؤسس", imageUrl: "https://stimulusgroups.org/wp-content/uploads/2023/08/st3.png", sortOrder: 3 },
    { name: "أ. د. سمير عبد العزيز الوسيمي", role: "استشاري", imageUrl: "https://stimulusgroups.org/wp-content/uploads/2023/08/st4.png", sortOrder: 4 },
  ];
  await prisma.teamMember.deleteMany();
  for (const m of team) {
    await prisma.teamMember.create({ data: m });
  }

  // 6. Create projects
  console.log("Creating projects...");
  const projects = [
    { title: "تعزيز الحوار الديمقراطي في مصر", slug: "democratic-dialogue-egypt", description: "مشروع تعزيز الحوار الوطني الديمقراطي في مصر بالتعاون مع NED", partnerLogos: ["https://stimulusgroups.org/wp-content/uploads/2023/08/ned.jpg"], sortOrder: 1 },
    { title: "مجموعات التحفيز السياسي المصرية", slug: "egyptian-political-stimulus", description: "مشروع مجموعات التحفيز السياسي المصرية", sortOrder: 2 },
    { title: "دور الدين في الحياة العامة والمشاركة الديمقراطية", slug: "religion-public-life", description: "مشروع دور الدين في الحياة العامة والمشاركة الديمقراطية", sortOrder: 3 },
  ];
  for (const p of projects) {
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: { title: p.title, description: p.description },
      create: p,
    });
  }

  // 7. Site settings
  console.log("Creating site settings...");
  const settings = [
    { key: "site_name", value: "منظمة مجموعات التحفيز" },
    { key: "site_email", value: "info@stimulusgroups.org" },
    { key: "site_whatsapp", value: "+447506663561" },
    { key: "site_address", value: "Võru maakond, Võru linn, F. R. Kreutzwaldi tn 43b, 65610, Estonia" },
    { key: "site_hours", value: "الإثنين - الجمعة من 9ص إلى 5م" },
    { key: "donate_content", value: "سيتم إضافة تفاصيل التبرع قريباً" },
  ];
  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: { value: s.value },
      create: s,
    });
  }

  console.log("Migration complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
