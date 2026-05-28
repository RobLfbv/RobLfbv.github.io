const fs = require('fs');
const path = require('path');

// Chemin vers ton fichier (à adapter si besoin)
const inputPath = path.join(__dirname, '_data', 'projects.json');
const outputPath = path.join(__dirname, '_data', 'projects_loc.json');

// 1. Charger le JSON actuel
const projects = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// Liste des champs racines à traduire
const rootFields = ['name', 'date', 'period', 'team', 'type', 'smalldesc', 'description', 'context'];

const migrated = projects.map(project => {
    let newProject = { ...project };

    // Traduction des champs racines
    rootFields.forEach(field => {
        if (project[field] && typeof project[field] === 'string') {
            newProject[field] = {
                "fr": project[field],
                "en": "" // Prêt pour ta future trad
            };
        }
    });

    // Traduction des légendes dans le tableau "images"
    if (project.images && Array.isArray(project.images)) {
        newProject.images = project.images.map(img => ({
            ...img,
            legende: typeof img.legende === 'string' 
                ? { "fr": img.legende, "en": "" } 
                : img.legende
        }));
    }

    // Traduction des noms de boutons
    if (project.buttons && Array.isArray(project.buttons)) {
        newProject.buttons = project.buttons.map(btn => ({
            ...btn,
            name: typeof btn.name === 'string' 
                ? { "fr": btn.name, "en": "" } 
                : btn.name
        }));
    }

    return newProject;
});

// 3. Sauvegarder le nouveau fichier
fs.writeFileSync(outputPath, JSON.stringify(migrated, null, 4), 'utf8');

console.log("✅ Migration terminée ! Nouveau fichier créé : _data/projects_loc.json");