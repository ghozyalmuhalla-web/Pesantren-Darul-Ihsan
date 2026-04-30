const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "../prisma/dev.db");
const db = new Database(dbPath);

async function main() {
    const email = "admin@darulihsan.sch.id";
    const password = "admin123";
    const hash = await bcrypt.hash(password, 10);
    const id = require("crypto").randomUUID();

    const existing = db.prepare("SELECT id FROM User WHERE email = ?").get(email);
    if (!existing) {
        db.prepare("INSERT INTO User (id, email, password, createdAt) VALUES (?, ?, ?, ?)").run(
            id, email, hash, new Date().toISOString()
        );
        console.log(`\u2714 Admin seeded: ${email} / ${password}`);
    } else {
        console.log(`\u2714 Admin already exists: ${email}`);
    }

    db.close();
}

main().catch(console.error);
