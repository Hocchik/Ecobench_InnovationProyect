# Modo Sin Backend - Frontend Ryeld

Este proyecto ha sido configurado para funcionar sin necesidad de un backend activo. Esto permite trabajar en el frontend, hacer modificaciones visuales y probar la interfaz de usuario sin depender del servidor backend.

## 🚀 Inicio Rápido

### Instalación
```bash
pnpm install
```

### Ejecutar el proyecto
```bash
pnpm dev
```

## 🔐 Credenciales de Prueba

Todos los usuarios tienen la misma contraseña: **123456**

### Usuarios disponibles:

| Código | Rol | Dashboard |
|--------|-----|-----------|
| `SUP001` | Supervisor | /supervisor/dashboard |
| `TECH001` | Técnico | /tecnico/dashboard |
| `AUX001` | Auxiliar | /auxiliar/dashboard |
| `HR001` | Recursos Humanos | /recursos-humanos/dashboard |
| `MGR001` | Gerente | /manager/dashboard |

## 📝 Cambios Realizados

### 1. AuthService.ts
- Se comentaron las llamadas a axios
- Se implementó autenticación con datos mock
- La contraseña por defecto es "123456" para todos los usuarios
- Se simula un delay de 500ms para imitar comportamiento de red

### 2. DataApi.ts
- Se comentaron las llamadas al backend
- Se implementaron respuestas con datos mock
- Se simula un delay de 300ms en cada request

### 3. GETData.ts
- Se agregó `mockUsers` con 5 usuarios de prueba (uno por rol)
- Se agregó `testElevators` para datos de ascensores
- Todos los datos de prueba están disponibles

## 🔄 Cómo volver al modo con Backend

Cuando necesites volver a conectar con el backend:

### En AuthService.ts
1. Descomentar: `import axios from "axios";`
2. Descomentar: `const BASE_URL = "http://localhost:8080/api/auth";`
3. Comentar la sección "MODO SIN BACKEND" en el método `login()`
4. Descomentar la sección "MODO CON BACKEND" en el método `login()`
5. Hacer lo mismo en el método `logout()`

### En DataApi.ts
1. Descomentar: `import axios from "axios";`
2. Descomentar: `const BASE_URL = "http://localhost:8080/api/data";`
3. En cada método (`getTechs`, `getSupervisors`, etc.):
   - Comentar la sección "MODO SIN BACKEND"
   - Descomentar la sección "MODO CON BACKEND"

## 📦 Datos Mock Disponibles

- **Técnicos**: 6 técnicos de prueba
- **Supervisores**: 3 supervisores de prueba
- **Tipos de Mantenimiento**: 5 tipos
- **Tipos de Ascensores**: 10 tipos
- **Ascensores**: 3 ascensores de prueba
- **Clientes**: 4 clientes de prueba

## 🎨 Desarrollo Frontend

Con este modo puedes:
- ✅ Probar todas las rutas y navegación
- ✅ Modificar estilos y componentes visuales
- ✅ Testear formularios y validaciones
- ✅ Desarrollar nuevas páginas y componentes
- ✅ Probar diferentes roles de usuario
- ✅ Trabajar sin conexión a internet

## ⚠️ Limitaciones

- Los datos no persisten entre recargas (excepto el login que usa localStorage)
- No se pueden hacer operaciones CRUD reales
- Las búsquedas y filtros trabajan solo con los datos mock

## 📞 Soporte

Si tienes problemas o necesitas agregar más datos mock, edita el archivo:
`src/api/data/GETData.ts`
