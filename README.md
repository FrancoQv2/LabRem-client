# LabRem

## Aplicación Web Cliente

---

### Orden básico de jerarquía entre componentes de React

```
- App.jsx
--- page.jsx
----- information.jsx
----- video streaming.jsx
----- form.jsx
----- table.jsx
------- hook.js
--------- api.js
----------- peticion al server
```

Esto facilita un poco el trabajo, pero tendría más sentido si los componentes como el `form` y `table` fueran genéricos, de manera que se puedan renderizar solamente con los parámetros que se les pasen como props.
Actualmente tenemos un par de estos componentes para cada laboratorio.

### Inicializar el proyecto

```
npm install
npm start
```

### Build para deployar

Próximamente...
