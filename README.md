# Me Blog: Blogger App for bloggers
A Simple and responsive full stack blog app created using reactjs for frontend and nodejs for backend.

Click this [link](https://youtu.be/v7SdfdaXJYw) to view the quick demo of this project.

# Technologies Used
* **HTML5**
* **CSS3**
* **Javascript**
* **React**
* **TailwindCSS**
* **Mongodb**
* **NodeJS**
* **Clerk**
* **Imagekit.io**
* **React Quill**

# Notes

## Clerk's Webhook
This app uses clerk's webhook in order to save user information to the database
once user's registration is successful. You need [ngrok](https://ngrok.com/) and use its provided
url in your clerk's webhook in clerk's dashboard.

## XSS Attack Mitigation in React Quill's Editor
I think react quill's editor is pretty secure. If you try to manually put an HTML tag in 
the editor, the angled brackets(<>) will be automatically converted to their respective 
HTML symbols (`&lt;` and `&gt;`). However, there are ways to make this project more secure.

First off, use the Quill's [delta](https://quilljs.com/docs/delta) format. Use 
[getContents()](https://quilljs.com/docs/api#getcontents) to get your editor's content in 
delta's format. Use [setContents()](https://quilljs.com/docs/api#setcontents) and put 
your delta's object in the parameter in order to display its HTML format in the editor.

In this project, I used the plain HTML text format and store it in the database. To improve
security, get the delta's format of the HTML in the editor and store it in the database 
instead. Next, use [Quill Delta to HTML Converter](https://www.npmjs.com/package/quill-delta-to-html) 
on your frontend once you send your delta content to your frontend in order to convert it
back to HTML format that you can put in a `<div>` using **dangerouslySetInnerHTML** prop.

To secure this project further, once your delta's object is in the server, convert the
object to string and then replace angled brackets with their equivalent HTML symbols or remove 
them and then store the string on your server. When sending it to client, convert the string
back to object before sending or send the string and convert it back to object on the 
client side. 

# Testing this project
You can clone this project and test it for yourself. However, you need to create .env files
and add these following variables:

## Front-end  
**VITE_IMGKIT_URL_ENDPOINT** -> Get this from Imagekit.io's dashboard.  

**VITE_IMGKIT_PUBLIC_KEY** -> Get this from Imagekit.io's dashboard.

**VITE_CLERK_PUBLISHABLE_KEY** -> Get this from Clerk's dashboard.

**VITE_API_URL** -> Address of your backend server e.g. `http://localhost:3000`


## Back-end  
**MONGODB_CONN_URL** -> If you're using atlas, look at your mongodb dashboard to get this URI.  

**CLERK_WEBHOOK_SECRET** -> Get this from Clerk's dashboard and look for 'Webhooks' text link.

**CLERK_PUBLISHABLE_KEY** -> Get this from Clerk's dashboard.   

**CLERK_SECRET_KEY** -> Get this from Clerk's dashboard.

**IK_URL_ENDPOINT** -> Get this from Imagekit.io's dashboard.

**IK_PUBLIC_KEY** -> Get this from Imagekit.io's dashboard.

**IK_PRIVATE_KEY** -> Get this from Imagekit.io's dashboard.

**CLIENT_URL** -> Address of your frontend server e.g. `http://localhost:5173`
