let apprenants = []; // Initialise un tableau vide pour stocker les apprenants

// Fonction pour créer une ligne d'apprenant dans le tableau
function creerApprenant({ id, prenom, nom }) {
    const tbody = document.querySelector('tbody'); // Sélectionne le corps du tableau
    const tr = document.createElement('tr'); // Crée une nouvelle ligne de tableau
    tr.dataset.id = id; // Ajoute un attribut de données pour identifier la ligne
    tr.innerHTML = `
        <td>${prenom}</td> <!-- Affiche le prénom de l'apprenant -->
        <td>${nom}</td> <!-- Affiche le nom de l'apprenant -->
        <td>
            <a href="detail.html?id=${id}" class="btn btn-info btn-sm">Détails</a> <!-- Lien vers les détails de l'apprenant -->
            <button class="btn btn-danger btn-sm" onclick="supprimerApprenant('${id}')">Supprimer</button> <!-- Bouton pour supprimer l'apprenant -->
        </td>
    `;
    tbody.appendChild(tr); // Ajoute la nouvelle ligne au corps du tableau
}

// Fonction pour ajouter un nouvel apprenant
async function ajouterApprenant(prenom, nom, sexe, pays, modules, motivation) {
    const apprenant = { prenom, nom, sexe, pays, modules, motivation }; // Crée un objet apprenant avec les données fournies
    try {
        const response = await fetch('http://localhost:3000/apprenants', { // Envoie une requête POST pour ajouter un apprenant
            method: 'POST', // Méthode de la requête
            headers: {
                'Content-Type': 'application/json' // Spécifie le type de contenu
            },
            body: JSON.stringify(apprenant) // Convertit l'objet apprenant en JSON pour l'envoi
        });
        if (!response.ok) throw new Error('Erreur de réseau : ' + response.statusText); // Vérifie si la réponse est correcte, sinon lance une erreur
        const data = await response.json(); // Convertit la réponse en JSON
        console.log('Nouvel apprenant ajouté :', data); // Affiche les données de l'apprenant ajouté dans la console
        apprenants.push(data); // Ajoute l'apprenant à la liste locale
        creerApprenant(data); // Crée une nouvelle ligne dans le tableau pour le nouvel apprenant
        
        // Utilisation de location.replace() pour rediriger vers la page de liste des apprenants
        setTimeout(() => {
            console.log('Redirection vers la liste des apprenants'); // Affiche un message de redirection dans la console
            window.location.replace('list.html'); // Redirige vers la liste des apprenants sans garder l'historique
        }, 1000); // Délai de 1 seconde
    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'apprenant :', error); // Affiche l'erreur dans la console en cas d'échec
    }
}

// Fonction pour supprimer un apprenant
async function supprimerApprenant(id) {
    console.log(`Tentative de suppression de l'apprenant avec l'id: ${id}`); // Affiche un message de tentative de suppression dans la console
    try {
        const response = await fetch(`http://localhost:3000/apprenants/${id}`, { // Envoie une requête DELETE pour supprimer un apprenant
            method: 'DELETE' // Méthode de la requête
        });
        if (!response.ok) throw new Error(`Erreur lors de la suppression : ${response.statusText}`); // Vérifie si la réponse est correcte, sinon lance une erreur
        console.log(`Suppression réussie pour l'apprenant avec l'id: ${id}`); // Affiche un message de réussite dans la console
        apprenants = apprenants.filter(a => a.id !== id); // Met à jour la liste des apprenants en excluant l'apprenant supprimé
        const tbody = document.querySelector('tbody'); // Sélectionne le corps du tableau
        const tr = tbody.querySelector(`tr[data-id="${id}"]`); // Trouve la ligne de tableau correspondant à l'apprenant supprimé
        if (tr) {
            tbody.removeChild(tr); // Retire la ligne du tableau
            console.log(`Ligne pour l'apprenant avec l'id: ${id} supprimée du DOM`); // Affiche un message de réussite de suppression dans la console
        } else {
            console.error(`Ligne pour l'apprenant avec l'id: ${id} non trouvée dans le DOM`); // Affiche un message d'erreur si la ligne n'est pas trouvée
        }
    } catch (error) {
        console.error('Erreur lors de la suppression :', error); // Affiche l'erreur dans la console en cas d'échec
    }
}

// Événement déclenché lorsque le contenu du DOM est entièrement chargé
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('http://localhost:3000/apprenants'); // Envoie une requête GET pour récupérer la liste des apprenants
        const data = await response.json(); // Convertit la réponse en JSON
        apprenants = data; // Stocke les apprenants récupérés dans la variable apprenants
        apprenants.forEach(creerApprenant); // Crée une ligne de tableau pour chaque apprenant
    } catch (error) {
        console.error('Erreur lors du chargement des apprenants :', error); // Affiche l'erreur dans la console en cas d'échec
    }
});

// Événement déclenché lors de la soumission du formulaire d'ajout
document.getElementById('ajoutForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Empêche l'envoi du formulaire de recharger la page
    const prenom = document.getElementById('prenom').value; // Récupère la valeur du champ prénom
    const nom = document.getElementById('nom').value; // Récupère la valeur du champ nom
    const sexe = document.getElementById('sexe').value; // Récupère la valeur du champ sexe
    const pays = document.getElementById('pays').value; // Récupère la valeur du champ pays
    const modules = document.getElementById('modules').value; // Récupère la valeur du champ modules
    const motivation = document.getElementById('motivation').value; // Récupère la valeur du champ motivation

    if (prenom && nom) { // Vérifie que les champs requis ne sont pas vides
        ajouterApprenant(prenom, nom, sexe, pays, modules, motivation); // Appelle la fonction pour ajouter un apprenant
    } else {
        console.error('Le prénom et le nom sont requis.'); // Affiche un message d'erreur si les champs requis sont vides
    }
});

