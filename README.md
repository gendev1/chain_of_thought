# 🧠 Chain of Thought AI Chat

## 🌟 Overview

Chain of Thought AI Chat is an advanced conversational AI application that provides users with insight into the AI's reasoning process. Built with Next.js and powered by the Anthropic Claude API, this application not only generates responses to user queries but also displays the step-by-step reasoning behind each answer.

## 🚀 Features

-   💬 **Interactive Chat Interface**: Engage in conversations with an AI assistant.
-   🔍 **Reasoning Steps Visualization**: View the AI's thought process broken down into steps.
-   🖥️ **Code Syntax Highlighting**: Automatic syntax highlighting for code snippets in responses.
-   🌙 **Dark Mode UI**: A sleek, dark-themed interface for comfortable viewing.
-   📱 **Responsive Design**: Works on desktop and mobile devices.
-   🔑 **Secure API Key Input**: Users can securely input their Anthropic API key directly in the application.
-   📊 **Collapsible Sidebar**: Toggle sidebar visibility for a cleaner interface on smaller screens.

## 🛠️ Technologies Used

-   🖥️ **Frontend**: Next.js, React, TypeScript
-   🧩 **UI Components**: Shadcn UI
-   🎨 **Styling**: Tailwind CSS
-   🌈 **Code Highlighting**: react-syntax-highlighter
-   🤖 **AI Integration**: Anthropic Claude API

## 🏁 Getting Started

### 📋 Prerequisites

-   Node.js (v14 or later)
-   npm or yarn
-   An Anthropic API key (users will input this in the application)

### 📦 Installation

1. Clone the repository:

    ```
    git clone https://github.com/gendev1/chain_of_thought.git
    cd chain_of_thought
    ```

2. Install dependencies:

    ```
    npm install
    ```

    or

    ```
    yarn install
    ```

3. Run the development server:

    ```
    npm run dev
    ```

    or

    ```
    yarn dev
    ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📘 Usage

1. 🔑 When you first open the application, you'll see a sidebar with an input field for your Anthropic API key. Enter your API key here.

2. 🔒 The API key is securely stored in the application's state and is not persisted between sessions for security reasons.

3. 💬 In the main chat area, type your question or prompt into the input field at the bottom and press 'Send' or hit Enter.

4. 🤔 The AI will process your input and provide a response. Below the response, you'll see the "Reasoning Steps" section, which breaks down the AI's thought process.

5. 🔄 Continue the conversation by sending more messages. You can scroll up to view the chat history.

6. 📊 Use the sidebar toggle button in the top left to show or hide the sidebar as needed.

## 👨‍💻 Development

### 📁 Project Structure

-   `app/`: Contains the Next.js application files
    -   `page.tsx`: The main chat interface component
    -   `api/query/route.ts`: API route for handling chat requests
-   `components/`: Reusable UI components
-   `styles/`: Global styles and Tailwind CSS configuration

### 🛠️ Customization

-   To modify the UI components, refer to the Shadcn UI documentation and edit the components in the `components/ui/` directory.
-   To adjust the chat logic or API integration, edit the `app/api/query/route.ts` file.
-   To change the overall layout or add new features, modify the `app/page.tsx` file.

### 🔐 Security Considerations

-   The application does not store the API key permanently. It is kept in the application's state only for the duration of the user's session.
-   Ensure that proper security measures are implemented when deploying this application, especially regarding the handling of API keys.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgements

-   [Anthropic](https://www.anthropic.com/) for providing the Claude AI API
-   [Vercel](https://vercel.com/) for Next.js and hosting solutions
-   [Shadcn](https://ui.shadcn.com/) for the excellent UI component library
