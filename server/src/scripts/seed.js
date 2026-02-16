const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { DATA_PATH } = require('../db/tasksRepo');

function seed() {
  const now = new Date();
  const tasks = [
    {
      title: 'Chapitre 3: Algebre lineaire',
      description: 'Exercices 1-10 du polycopie',
      subject: 'Mathematiques',
      type: 'DEVOIR',
      status: 'EN_COURS',
      priority: 'MOYENNE',
      due_date: new Date(now.getTime() + 3 * 24 * 3600 * 1000).toISOString()
    },
    {
      title: 'TP Reseaux - Routage',
      description: 'Configurer OSPF sur le lab virtuel',
      subject: 'Reseaux',
      type: 'TP',
      status: 'EN_COURS',
      priority: 'HAUTE',
      due_date: new Date(now.getTime() + 1 * 24 * 3600 * 1000).toISOString()
    },
    {
      title: 'Projet React - Dashboard',
      description: 'Premiere iteration du tableau de bord',
      subject: 'Developpement Web',
      type: 'PROJET',
      status: 'TERMINEE',
      priority: 'MOYENNE',
      due_date: new Date(now.getTime() + 10 * 24 * 3600 * 1000).toISOString()
    },
    {
      title: 'Lecture article IA',
      description: 'Synthese de l article sur les transformers',
      subject: 'Intelligence Artificielle',
      type: 'DEVOIR',
      status: 'EN_COURS',
      priority: 'BASSE',
      due_date: new Date(now.getTime() + 7 * 24 * 3600 * 1000).toISOString()
    }
  ].map((t) => ({
    id: uuidv4(),
    ...t,
    created_at: now.toISOString(),
    updated_at: now.toISOString()
  }));

  fs.mkdirSync(path.dirname(DATA_PATH), { recursive: true });
  fs.writeFileSync(DATA_PATH, JSON.stringify(tasks, null, 2));
  console.log(`Seeded ${tasks.length} tasks to ${DATA_PATH}`);
}

seed();
