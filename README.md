# CodeLeap Test Application

## 📖 Overview

The CodeLeap Test Application is a React-based web application constructed with Vite. The application allows users to create, read, edit, and delete post cards, leveraging a seamless user experience.

## 🌟 Features

- **Post Card Management**: Users can view, create, edit, and delete post cards with an intuitive UI.
- **Modal Windows**: Interactive modals for editing and deleting posts, ensuring a cohesive user experience without page reloads.
- **Redux Integration**: Utilizes Redux for efficient state management, such as retrieving the current user's ID.
- **Axios Integration**: Employs Axios to handle asynchronous HTTP requests and communicate with backend services.
- **Bootstrap Styling**: Aesthetically pleasing interface designed with Bootstrap components and icons.

## 🚀 Quickstart

To get the development server up and running:

# yarn run dev

# 🏗️ Application Structure

- **Card Component**: Represents individual post entries displaying title, username, and content. Editing and deleting options become available when the user ID matches the card's ID.
- **ModalDelete Component**: Interactive modal prompting users to confirm before deleting a post.
- **ModalPath Component**: Enables users to edit post details, such as title and content.
- **Redux State Management**: Employs Redux to manage application state. Current user's ID is fetched from the Redux store to ascertain permissions for post modifications.
- **Styling**: Incorporates Bootstrap for consistent and responsive design. Custom styles are available in `card.css` for further customization.

# 📦 Dependencies & Tools 

- **Core**: React and ReactDOM for crafting the user interface.
- **State Management**: Redux toolkit, React-Redux, and Redux Persist handle state across components.
- **HTTP Requests**: Axios ensures efficient and seamless HTTP communication.
- **UI & Styling**: Bootstrap and React-Bootstrap for design, with Bootstrap-icons to embellish interface with icons.
- **Development**: Vite offers a lightning-fast development experience, coupled with TypeScript for type safety.

# 🛠️ Scripts Development

**bash**

yarn run dev

Boots up the development server.

## Production bash

yarn run build

Builds the application for production deployment.

## Preview bash

yarn run preview

Previews the production-ready build of the application.

# 📝 Conclusion

The CodeLeap Test Application is a testament to the effective integration of several cutting-edge libraries and tools. Its modularity and component-based architecture guarantee easy scalability and maintainability. Whether you're looking to expand upon its features or use it as a foundation for a more complex project, it offers a solid starting point.
