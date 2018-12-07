<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clés secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur
 * {@link http://codex.wordpress.org/fr:Modifier_wp-config.php Modifier
 * wp-config.php}. C’est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d’installation. Vous n’avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'db701348448');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'dbo701348448');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', 'Justaniceberg1');

/** Adresse de l’hébergement MySQL. */
define('DB_HOST', 'db701348448.db.1and1.com');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8mb4');

/** Type de collation de la base de données.
  * N’y touchez que si vous savez ce que vous faites.
  */
define('DB_COLLATE', '');

/**#@+
 * Clés uniques d’authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n’importe quel moment, afin d’invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '_ [|wl,<%=GhR1={ZqbCI0pe^<QT4PXAN7DBJ|slhlZeM8|C_/8_(NrE&oJ`T/5S');
define('SECURE_AUTH_KEY',  ')%8-V#CSxKs2R{$VUjt`obQ|EVSCKzF$[! P.8#-b+OXk9#B&{auxsJl5 VC_0:J');
define('LOGGED_IN_KEY',    '$j,^3b%)^bt.`n!FaslI.raRCjz>N-VYD^10J6<;Y&DupLW5P0TP,Y+IcU;:hVUQ');
define('NONCE_KEY',        '[lE,9r_2rlpjCs2&UhtlFQ3!f8}>^Z<))3/q,%/p336 o=}p|5$^L7O~2(!`)-=>');
define('AUTH_SALT',        'i);r!.mOi2,N^|T/]{nH6L6WygmdJL0Ex5/.DxX7b[YE:E|$y4T@1j]UVq5$1Yk_');
define('SECURE_AUTH_SALT', '0]nfiY0P)|L 3g|~?=WWMJWy ~K5re+f q-r#bp5*%i*RAup.S-^S8<d5gS}aB}1');
define('LOGGED_IN_SALT',   'H.YU(e#I`TsfL9Uc>6ggR2Ln33+S9a:=WH.C;Q%j@M5s$5%$&G^rj6](b3DfVsLB');
define('NONCE_SALT',       '[g-sr@C:j2euUh7YU0;c&XfZt!ci!:F6&>r.J(EvsmAO|{*r_4DqwI2~Jka.&rqO');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique.
 * N’utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés !
 */
$table_prefix  = 'wp_';

/**
 * Pour les développeurs : le mode déboguage de WordPress.
 *
 * En passant la valeur suivante à "true", vous activez l’affichage des
 * notifications d’erreurs pendant vos essais.
 * Il est fortemment recommandé que les développeurs d’extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de
 * développement.
 *
 * Pour plus d'information sur les autres constantes qui peuvent être utilisées
 * pour le déboguage, rendez-vous sur le Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* C’est tout, ne touchez pas à ce qui suit ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');