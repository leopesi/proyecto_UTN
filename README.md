
<h1 align="center"> Proyecto final del curso Programador Web Avanzado da UTN - (Universidad Tecnológica Nacional - Buenos Aires) </h1>



# Empezando 

## Creación de una base de datos de muestra

Como parte de los requisitos previos, instaló y configuró MySQL, lo que incluyó la creación de un usuario. Ahora creará una base de datos vacía.

Para hacer esto, primero debe iniciar sesión en su instancia de MySQL. Si está ejecutando de forma remota, puede utilizar la herramienta de su elección. Si está utilizando una instancia de MySQL que se ejecuta localmente, puede usar el siguiente comando, reemplazando su nombre de usuario con su nombre de usuario de MySQL:
```shell
mysql -u your_username -p
```
-u es el nombre de usuario y -poption se pasa si la cuenta está protegida con una contraseña.

El servidor MySQL le pedirá la contraseña de su base de datos. Escriba su contraseña y presione ENTER.

Una vez que haya iniciado sesión, cree una base de datos llamada hello_world_db usando el siguiente comando:
```shell
CREATE DATABASE hello_world_db
```
Para verificar que ha creado correctamente la base de datos, puede usar este comando:
```shell
SHOW DATABASES
```


## Instalacion
Todo lo que necesitas hacer es clonar este repositorio:

```shell
git clone https://github.com/leopesi/proyecto_UTN.git
```
## Ajustes
Busque el archivo .env en la raíz de /server y complételo con la información de creación de la base de datos (DB_DATABASE, DB_USER y DB_PASS)

## Running
La aplicación tiene muy pocas dependencias, por lo que probablemente sea muy fácil de entender cuando escanea el código, pero hay al menos algunos pasos que debe conocer.

### Start Back-end Node application

Para instalar las dependencias, escriba en el directorio /server:
```shell
npm install
```
Ahora, para iniciar la aplicación, escriba:
```shell
npm start
```
### Pueba de Rutas
[![Ver la documentación](https://run.pstmn.io/button.svg)](https://www.postman.com/restless-water-10959/workspace/df598f0c-36bb-4178-9a08-3c2420741c64/api/d1301b31-098b-4651-8d18-ee78cb941df8)

### Start Front-end React application

Para instalar las dependencias, escriba en el directorio /server:
```shell
npm install
```
Ahora, para iniciar la aplicación, escriba:
```shell
npm start
```
## 
<h2 align="center"> Voilà! </h2>

Acceda a la ruta http://localhost:8082/register en su navegador, regístrese, luego inicie sesión y sea feliz.

![Tela Register](https://user-images.githubusercontent.com/52714788/210097834-441dd9dd-f153-4eb1-b845-22955e547cc7.png)


## 
<h2 align="center"> Diagramas de Flujo </h2>

<img src="https://user-images.githubusercontent.com/52714788/209237944-77d0b851-703a-4ad1-9bbb-73b5d5f59764.JPG">

<img src="https://user-images.githubusercontent.com/52714788/209238105-e32714e7-00bb-457e-a87a-047d14032360.JPG">

<img src="https://user-images.githubusercontent.com/52714788/209238160-819d2da4-beb6-4aaa-822c-1105b62745c0.JPG">

<img src="https://user-images.githubusercontent.com/52714788/209238273-ab115c23-7699-4858-ac18-d2e1ffbf6717.JPG">

<img src="https://user-images.githubusercontent.com/52714788/209238360-e7e9099e-1a32-413a-9f4c-44c3ef04bbb6.JPG">

<img src="https://user-images.githubusercontent.com/52714788/209238424-55aec562-b93e-4e90-9b4b-fd599ce91682.JPG">

<img src="https://user-images.githubusercontent.com/52714788/209238481-db44b031-5a97-4506-873a-10b397e8f7ed.JPG">

<img src="https://user-images.githubusercontent.com/52714788/209238541-1a9c9121-02cb-4a69-9e80-11160d863f61.JPG">

<img src="https://user-images.githubusercontent.com/52714788/209238580-ce868e13-8088-457d-8165-2c5dc781b44b.JPG">

<img src="https://user-images.githubusercontent.com/52714788/209238654-30f8a99f-131f-4eb3-b0d1-f3b4a792c229.JPG">
