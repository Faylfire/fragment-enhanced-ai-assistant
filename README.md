# Fragment Enhanced Chat with History

This is a simple implementation of a concept for 'fragment' or topical entry enhanced chat with history.

The project is using React with Typescript and Vite along with Shadcn and tailwind.


Todo:
- UML sequence diagram for the basic use cases: Login/Auth(later), Add/Remove/Update Collection Entries, Update Chat Prompts and Responses.
- Implement backend db connection according to the defined UML sequence diagrams
- 

Features:
- Integration with LMStudio API for AI (openai api)
- Pull Collection Entries/Fragaments into AI prompt for more detailed and relevant queries
- Allow for 'Asides' conversations that deviate from the original purpose but still relevant and pulled 'aside' as not to pollute the main conversation
- A catalog of past chats/conversations
- Additional features for enhanced workflows such as research and summary and distillation into collection Entries

Initial File Structure:

src/
├── components/
│   ├── LeftPanel/
│   │   ├── Logo.js
│   │   ├── NavBar.js
│   │   ├── TopicList.js
│   │   ├── TopicEntry.js
│   │   └── LeftPanel.js
│   ├── ChatArea/
│   │   ├── ChatTabs.js        // New component
│   │   ├── ChatInput.js
│   │   ├── ChatMessages.js
│   │   └── ChatArea.js
│   └── lib/
├── contexts/
│   ├── TopicContext.js
│   └── ChatContext.js         // New context for managing chat tabs
├── hooks/
│   ├── useTopics.js
│   └── useChats.js            // New hook for managing chats
├── services/
│   └── api.js
├── index.css
├── App.js
└── utils/
    └── helpers.js


Issues and Bugs:
7/30/2024 - Using Tailwind "tw-" prefix introduces issues with shadcn, removal restores expected behavior

## React + TypeScript + Vite

The section below are details in regards to the templates used to provide a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

-----------------------------------------------------------------



