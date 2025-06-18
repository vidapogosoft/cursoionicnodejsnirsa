// middleware

const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // console.error("Error al verificar token:", err); // Para depuración
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
    req.user = user; // Adjunta la información del usuario al objeto de solicitud
    next();
  });
};

module.exports = authenticateToken;