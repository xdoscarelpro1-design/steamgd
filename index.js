const SteamUser = require('steam-user');
const http = require('http');
const client = new SteamUser();

// Configuración de credenciales seguras mediante Render
const logOnOptions = {
    accountName: process.env.STEAM_USERNAME,
    password: process.env.STEAM_PASSWORD
};

if (process.env.STEAM_GUARD_CODE) {
    logOnOptions.twoFactorCode = process.env.STEAM_GUARD_CODE;
}

client.logOn(logOnOptions);

client.on('loggedOn', () => {
    console.log('CONECTADO: El bot se ha logueado correctamente en Steam.');
    
    // REEMPLAZA ESTOS NÚMEROS: Pon aquí las IDs de tus juegos entre los corchetes
    // Ejemplo: [322170] boosteará CS2 y Team Fortress 2 a la vez. Max 30 juegos.
client.gamesPlayed([322170]); 
    console.log('ÉXITO: Boosteo de horas iniciado para los juegos seleccionados.');
});

client.on('error', (err) => {
    console.error('ERROR DE CONEXIÓN EN STEAM:', err.message);
});

// Servidor web falso para mantener Render activo 24/7
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Bot de Steam activo y funcionando 24/7\n');
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Servidor de mantenimiento activo en el puerto ${PORT}`);
});

// Auto-ping cada 10 minutos para evitar la suspensión de la cuenta Free
setInterval(() => {
    if (process.env.RENDER_EXTERNAL_URL) {
        http.get(process.env.RENDER_EXTERNAL_URL, (res) => {
            console.log('Auto-ping enviado con éxito.');
        });
    }
}, 10 * 60 * 1000);
