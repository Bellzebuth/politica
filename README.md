# Politica

Réseau social pour échanger sur la politique française.

# Lancer l'application

Pour lancer le projet dans un docker, lancer la commande:

docker-compose up -d

Puis rendez-vous à l'adresse:

http://localhost:4200/

# Technologie utilisée

Pour le front j'ai utilisé Angular, le back est lui codé en NodeJS / Express,
la base de données est quant à elle une base de données MongoDB.

# Choix de programmation

Pour gérer les connexion des utilisateurs, j'ai utilisé le 'jsonwebtoken'.

Afin de garder une expérience utilisateur des plus agréable, j'ai décidé que pour chaque action de l'utilisateur
J'allai changer en l'affichage, et la base de données en parallèle, sans que les deux soit réellement connecté.
Cela permet d'opérer les changements dû aux actions de l'utilsateur sans avoir à recharger la page.

Pour assurer le design de mon site, j'ai choisi le framework Prime NG. Plusieurs thèmes sont disponible et permette ainsi
de changer facilement de style en fonction des envies.

# Répartition des tâches

J'ai tout fait tout seul, vu que je suis seul.

# Difficultés rencontrées

Ne connaissant que peu angular, j'ai malheureusement commencé le projet avec l'idée fausse qu'un composant était égale
à une page. Cela a été assez problématique, lorsque les copier/coller ont était répétifs.

N'ayant pas trouvé l'ensemble des composants exact que je voulais dans primeNG, la réécriture de certain de leur aspect
a été assez compliqué.
