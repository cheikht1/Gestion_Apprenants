// Déclaration des apprenants en mémoire
let apprenants = [];

// Fonction pour créer une ligne d'apprenant dans le tableau
function creerApprenant(id, prenom, nom) {
    const tbody = document.querySelector('tbody'); // Sélectionner le corps du tableau 
    const tr = document.createElement('tr'); // Créer une nouvelle ligne
    tr.dataset.id = id;
    tr.innerHTML = ` 
        <td>${prenom}</td> 
        <td>${nom}</td>
        <td>
            <a href="detail.html?id=${id}" class="btn btn-info btn-sm">Détails</a> 
            <button class="btn btn-danger btn-sm" onclick="supprimerApprenant(${id})">Supprimer</button>
        </td>
    `;
    tbody.appendChild(tr);
}

// Fonction pour ajouter un nouvel apprenant
function ajouterApprenant(prenom, nom) {
    const apprenant = { prenom, nom };
    fetch('http://localhost:3000/apprenants', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(apprenant)
    })
    .then(response => response.json())
    .then(data => {
        apprenants.push(data);
        creerApprenant(data.id, data.prenom, data.nom);
    });
}

// Fonction pour afficher les détails d'un apprenant
function detaillerApprenant(id) {
    fetch(`http://localhost:3000/apprenants/${id}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                document.getElementById('photo').src = data.photo || 'static/avatar.png';
                document.getElementById('prenom-nom').textContent = `${data.prenom} ${data.nom}`;
                document.getElementById('profession').textContent = data.profession || 'Développeur FullStack';
                document.getElementById('pays').textContent = data.pays || 'Sénégal';
                document.getElementById('biographie').textContent = data.biographie || 'Très motivée pour apprendre de nouvelles choses et développer mes compétences sur Cloud/AWS.';
                
                const modulesList = document.getElementById('modules');
                modulesList.innerHTML = '';
                (data.modules || []).forEach(module => {
                    const li = document.createElement('li');
                    li.className = 'list-group-item';
                    li.textContent = module;
                    modulesList.appendChild(li);
                });

                const competences = data.competences || [];
                competences.forEach((competence, index) => {
                    const progress = document.getElementById(`competence${index + 1}`);
                    if (progress) {
                        const progressBar = progress.querySelector('.progress-bar');
                        progressBar.style.width = `${competence.percentage}%`;
                        progressBar.textContent = `${competence.name} ${competence.percentage}%`;
                    }
                });
            }
        });
}

// Fonction pour supprimer un apprenant
function supprimerApprenant(id) {
    fetch(`http://localhost:3000/apprenants/${id}`, {
        method: 'DELETE'
    })
    .then(() => {
        apprenants = apprenants.filter(a => a.id !== id);
        const tbody = document.querySelector('tbody');
        const tr = tbody.querySelector(`tr[data-id="${id}"]`);
        if (tr) {
            tbody.removeChild(tr);
        }
    });
}

// Fetch the list of apprenants from the server
document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost:3000/apprenants')
        .then(response => response.json())
        .then(data => {
            apprenants = data;
            apprenants.forEach(apprenant => creerApprenant(apprenant.id, apprenant.prenom, apprenant.nom));
        });

    // Gestion de l'affichage des détails si la page est 'detail.html'
    if (window.location.pathname.endsWith('detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            detaillerApprenant(id);
        }
    }
});




























































// // Déclaration des apprenants en mémoire
// let apprenants = [];

// // Fonction pour créer une ligne d'apprenant dans le tableau
// function creerApprenant(id, prenom, nom) {
//     const tbody = document.querySelector('tbody'); // Sélectionner le corps du tableau 
//     const tr = document.createElement('tr'); // Créer une nouvelle ligne
//     tr.dataset.id = id;
//     tr.innerHTML = ` 
//         <td>${prenom}</td> 
//         <td>${nom}</td>
//         <td>
//             <a href="detail.html?id=${id}" class="btn btn-info btn-sm">Détails</a> 
//             <button class="btn btn-danger btn-sm" onclick="supprimerApprenant(${id})">Supprimer</button>
//         </td>
//     `;
//     tbody.appendChild(tr);
// }

// // Fonction pour ajouter un nouvel apprenant
// function ajouterApprenant(prenom, nom) {
//     const apprenant = { prenom, nom };
//     fetch('http://localhost:3000/apprenants', { 
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(apprenant)
//     })
//     .then(response => response.json())
//     .then(data => {
//         apprenants.push(data);
//         creerApprenant(data.id, data.prenom, data.nom);
//         console.log('Apprenant ajouté :', data);
//     })
//     .catch(error => {
//         console.error('Erreur lors de l\'ajout de l\'apprenant:', error);
//     });
// }


// // Fonction pour afficher les détails d'un apprenant
// function detaillerApprenant(id) {
//     fetch(`http://localhost:3000/apprenants/${id}`)
//         .then(response => response.json())
//         .then(data => {
//             if (data) {
//                 document.getElementById('photo').src = data.photo || 'static/avatar.png';
//                 document.getElementById('prenom-nom').textContent = `${data.prenom} ${data.nom}`;
//                 document.getElementById('profession').textContent = data.profession || 'Développeur FullStack';
//                 document.getElementById('pays').textContent = data.pays || 'Sénégal';
//                 document.getElementById('biographie').textContent = data.biographie || 'Très motivée pour apprendre de nouvelles choses et développer mes compétences sur Cloud/AWS.';
                
//                 const modulesList = document.getElementById('modules');
//                 modulesList.innerHTML = '';
//                 (data.modules || []).forEach(module => {
//                     const li = document.createElement('li');
//                     li.className = 'list-group-item';
//                     li.textContent = module;
//                     modulesList.appendChild(li);
//                 });

//                 const competences = data.competences || [];
//                 competences.forEach((competence, index) => {
//                     const progress = document.getElementById(`competence${index + 1}`);
//                     if (progress) {
//                         const progressBar = progress.querySelector('.progress-bar');
//                         progressBar.style.width = `${competence.percentage}%`;
//                         progressBar.textContent = `${competence.name} ${competence.percentage}%`;
//                     }
//                 });
//             }
//         });
// }

// // Fonction pour supprimer un apprenant
// function supprimerApprenant(id) {
//     fetch(`http://localhost:3000/apprenants/${id}`, {
//         method: 'DELETE'
//     })
//     .then(() => {
//         apprenants = apprenants.filter(a => a.id !== id);
//         const tbody = document.querySelector('tbody');
//         const tr = tbody.querySelector(`tr[data-id="${id}"]`);
//         if (tr) {
//             tbody.removeChild(tr);
//         }
//     });
// }

// // Fetch the list of apprenants from the server
// document.addEventListener('DOMContentLoaded', () => {
//     fetch('http://localhost:3000/apprenants')
//         .then(response => response.json())
//         .then(data => {
//             apprenants = data;
//             apprenants.forEach(apprenant => creerApprenant(apprenant.id, apprenant.prenom, apprenant.nom));
//         });

//     // Gestion de l'affichage des détails si la page est 'detail.html'
//     if (window.location.pathname.endsWith('detail.html')) {
//         const urlParams = new URLSearchParams(window.location.search);
//         const id = urlParams.get('id');
//         if (id) {
//             detaillerApprenant(id);
//         }
//     }
// });
