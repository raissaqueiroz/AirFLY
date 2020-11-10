<?php
/**
 * As configurações básicas do WordPress
 *
 * O script de criação wp-config.php usa esse arquivo durante a instalação.
 * Você não precisa usar o site, você pode copiar este arquivo
 * para "wp-config.php" e preencher os valores.
 *
 * Este arquivo contém as seguintes configurações:
 *
 * * Configurações do MySQL
 * * Chaves secretas
 * * Prefixo do banco de dados
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Configurações do MySQL - Você pode pegar estas informações com o serviço de hospedagem ** //
/** O nome do banco de dados do WordPress */
define( 'DB_NAME', 'wordpress_airfly' );

/** Usuário do banco de dados MySQL */
define( 'DB_USER', 'root' );

/** Senha do banco de dados MySQL */
define( 'DB_PASSWORD', '' );

/** Nome do host do MySQL */
define( 'DB_HOST', 'localhost' );

/** Charset do banco de dados a ser usado na criação das tabelas. */
define( 'DB_CHARSET', 'utf8mb4' );

/** O tipo de Collate do banco de dados. Não altere isso se tiver dúvidas. */
define( 'DB_COLLATE', '' );

/**#@+
 * Chaves únicas de autenticação e salts.
 *
 * Altere cada chave para um frase única!
 * Você pode gerá-las
 * usando o {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org
 * secret-key service}
 * Você pode alterá-las a qualquer momento para invalidar quaisquer
 * cookies existentes. Isto irá forçar todos os
 * usuários a fazerem login novamente.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'U4Ox_@D777,XFa-(-,Xe1zH+;]CTDi%s! Q+?2]jJ;;!D!N;Q-BEUYW5y7P~yQ]Z' );
define( 'SECURE_AUTH_KEY',  'nk?CsbKshLE7~jb!=*)Vw,Y+UGf]6A7fgD4YK5ksRV~=x7%c r2w[(;Ut8Zzpx=p' );
define( 'LOGGED_IN_KEY',    '6(&O~.VwaC|B*Nr73`2Df^=:B]jM9{SYfCC!TO>Ho_O)jbx;Q7:yGKw}[|xuSDR?' );
define( 'NONCE_KEY',        'C^.Iy r2C4ykmu-=}ECxx4T-c*H5G*Lqy&b*F|^eJu,(QGqoL1k}-Ba{Y4|1:#on' );
define( 'AUTH_SALT',        'NbgcMdErm/csqdY*tcMjdv,HJV7@It)&U7*8(`4=:IOQ%9t4W<`RxlBq$Nj8$4Gf' );
define( 'SECURE_AUTH_SALT', 'f99.|Oo}w3/);lPG<<#&tS{_>7gwwe&CQ`c^HTuLLg@ee:|d_y1w^ WdccMTDcGG' );
define( 'LOGGED_IN_SALT',   'dra~YCWa43~s4#?bG{apv2%reUQLkH08JAbR15+O.I@*!9^%*{SeF{Jjpk+p }RM' );
define( 'NONCE_SALT',       'b@ub!8LcdF2Md.aX_O?QM]F~1`#JLY.emkJq^k^wc(ph6/eD@f HvMEpd<|!IP&a' );

/**#@-*/

/**
 * Prefixo da tabela do banco de dados do WordPress.
 *
 * Você pode ter várias instalações em um único banco de dados se você der
 * um prefixo único para cada um. Somente números, letras e sublinhados!
 */
$table_prefix = 'wp_';

/**
 * Para desenvolvedores: Modo de debug do WordPress.
 *
 * Altere isto para true para ativar a exibição de avisos
 * durante o desenvolvimento. É altamente recomendável que os
 * desenvolvedores de plugins e temas usem o WP_DEBUG
 * em seus ambientes de desenvolvimento.
 *
 * Para informações sobre outras constantes que podem ser utilizadas
 * para depuração, visite o Codex.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Isto é tudo, pode parar de editar! :) */

/** Caminho absoluto para o diretório WordPress. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Configura as variáveis e arquivos do WordPress. */
require_once ABSPATH . 'wp-settings.php';
