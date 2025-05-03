// Fetches CMS content for your index.html
const fs = require('fs');
const path = require('path');

exports.handler = async (event) => {
  const newsDir = path.join(process.cwd(), '_news');
  
  try {
    const files = fs.readdirSync(newsDir);
    const articles = files.map(file => {
      const rawContent = fs.readFileSync(path.join(newsDir, file), 'utf8');
      const [, frontmatter, body] = rawContent.split('---');
      
      return {
        ...JSON.parse(`{${frontmatter}}`), // Convert YAML to JSON
        body: body.trim(),
        slug: file.replace('.md', '')
      };
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(articles)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};