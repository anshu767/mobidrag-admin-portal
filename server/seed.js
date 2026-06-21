/**
 * Database Seed Script
 * Creates admin user, test partners, applications, deals, and commissions
 * 
 * Usage: node seed.js
 */

import dotenv from 'dotenv';
import connectDB from './src/config/database.js';
import User from './src/models/User.js';
import Application from './src/models/Application.js';
import Deal from './src/models/Deal.js';
import Commission from './src/models/Commission.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Promise.all([
      User.deleteMany(),
      Application.deleteMany(),
      Deal.deleteMany(),
      Commission.deleteMany(),
    ]);

    console.log('✓ Cleared existing data');

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@mobidrag.com',
      password: 'admin123',
      role: 'admin',
      tier: 'platinum',
      status: 'active',
    });

    console.log('✓ Created admin user');

    // Create sample partners (role: partner)
    const partners = await User.insertMany([
      {
        name: 'Tech Innovations Ltd',
        email: 'contact@techinnovations.com',
        password: 'partner123',
        role: 'partner',
        tier: 'gold',
        status: 'active',
      },
      {
        name: 'Digital Solutions Inc',
        email: 'info@digitalsolutions.com',
        password: 'partner123',
        role: 'partner',
        tier: 'silver',
        status: 'active',
      },
      {
        name: 'Global Partners LLC',
        email: 'hello@globalpartners.com',
        password: 'partner123',
        role: 'partner',
        tier: 'platinum',
        status: 'active',
      },
    ]);

    console.log(`✓ Created ${partners.length} partners`);

    // Create pending applications
    const applications = await Application.insertMany([
      {
        name: 'Startup Ventures',
        email: 'apply@startupventures.com',
        status: 'pending',
      },
      {
        name: 'Cloud Services Co',
        email: 'hello@cloudservices.com',
        status: 'pending',
      },
    ]);

    console.log(`✓ Created ${applications.length} applications (pending)`);

    // Create sample deals with different stages
    const deals = await Deal.insertMany([
      {
        brandName: 'Nike Partnership',
        partnerId: partners[0]._id,
        stage: 'won',
        amount: 50000,
      },
      {
        brandName: 'Apple Collaboration',
        partnerId: partners[1]._id,
        stage: 'negotiating',
        amount: 75000,
      },
      {
        brandName: 'Microsoft Deal',
        partnerId: partners[2]._id,
        stage: 'lost',
        amount: 100000,
        lossReason: 'Budget constraints from client side',
      },
      {
        brandName: 'Google Initiative',
        partnerId: partners[0]._id,
        stage: 'demo',
        amount: 120000,
      },
      {
        brandName: 'Adidas Rollout',
        partnerId: partners[2]._id,
        stage: 'won',
        amount: 30000,
      },
    ]);

    console.log(`✓ Created ${deals.length} deals`);

    // Create commissions (auto-created from won deals)
    // Commission = 10% of deal amount, one per won deal
    const commissions = await Commission.insertMany([
      {
        dealId: deals[0]._id, // Nike (won) — still pending
        partnerId: partners[0]._id,
        amount: 5000, // 10% of 50000
        status: 'pending',
      },
      {
        dealId: deals[4]._id, // Adidas (won) — already paid
        partnerId: partners[2]._id,
        amount: 3000, // 10% of 30000
        status: 'paid',
        paidAt: new Date(),
      },
    ]);

    console.log(`✓ Created ${commissions.length} commissions`);

    console.log(`
    ╔════════════════════════════════════════╗
    ║     Database Seeded Successfully!      ║
    ╠════════════════════════════════════════╣
    ║  ADMIN CREDENTIALS:                    ║
    ║  Email: admin@mobidrag.com            ║
    ║  Password: admin123                   ║
    ║                                        ║
    ║  CREATED DATA:                         ║
    ║  • Partners: 3 (role: partner)        ║
    ║  • Applications: 2 (pending)          ║
    ║  • Deals: 4 (various stages)          ║
    ║  • Commissions: 2 (from won deals)    ║
    ╚════════════════════════════════════════╝
    `);

    process.exit(0);
  } catch (error) {
    console.error('✗ Error seeding database:', error.message);
    process.exit(1);
  }
};

seedDatabase();