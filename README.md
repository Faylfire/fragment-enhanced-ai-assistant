# ContextAlly - Interactive Atlas Entry Enhanced AI Chat Assistant

This is an implementation of a concept for user provided 'fragment' or topical entry to be automatically provided as context to enhance AI interactions.

The Application consists primarily in the desktop version a workspace split into two partially adjustable columned panels. On the left are the listing of the context entries and past chats in a tabbed list. On the right is the chat interface that features an input box that will automatically detect and pull in relevant context (by the naming of the context title and user provided alias/nicknames).

The project is using React with Typescript and Vite along with Shadcn and tailwind css.


Todo:
- UML sequence diagram for the basic use cases: Login/Auth(later), Add/Remove/Update Collection Entries, Update Chat Prompts and Responses.
- Implement backend db connection according to the defined UML sequence diagrams - done
- Input validation


Features:
- Integration with LMStudio API for AI (openai api) -done
- Pull Collection Entries/Fragaments into AI prompt for more detailed and relevant queries -ongoing
- Allow for 'Asides' conversations that deviate from the original purpose but still relevant and pulled 'aside' as not to pollute the main conversation - deferred phase 2
- A catalog of past chats/conversations - done
- Additional features for enhanced workflows such as research and summary and distillation into collection Entries - deferred
- Agentic features: Create a new project, agent creates collection entries, agent formulates story outline, agents create scenes, agents asks and advices on creative elements. - deferred
- Allow for selection of different AI API's currently only Lmstudio local is available
- Allow for multiple projects with their own collections of entries and chats
- Markdown chat display fields for better user experience and also better formatting of the prompt output
- Fine Tuned Models
- RAG implementation for enhanced AI responses


Functionality:
- Rename Chat Tabs
- Redesign Chat LeftPanel display
- Add Hoverable tips and snippets (requires more design)
- Allow modification and saving of the system prompts for different aspects of the project
- Add the ability to select enteries to Always be included in the prompts.


Originally Planned File Structure (Shadcn component files not shown):

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
│   └── data-api.js
├── index.css
├── App.js
└── utils/
    └── helpers.js


Issues and Bugs:
7/30/2024 - Using Tailwind "tw-" prefix introduces issues with shadcn, removal restores expected behavior
8/9/2024 - Scrolling/Panel dynamic length caused visual issues, solved with .no-scroll on the application body, all scrolling will be internal to the elements of the application.
8/28/2024 - Fixed text color for selected text not showing on load by adding text- to the full keyword: color object {"keyword": "text-blue-600"} instead of just "blue" or "blue-600"
8/29/2024 - Fixed issue that on load and newly created entries that highlightKeywords do not appear to function and have to wait for a re-render this has to do with the async nature of useState, using useRef for instant update for this functionality.


Components to be used:
Hover Card
Skeleton
toast
tooltip

Components Added:
Accordion
div contenteditable

## Firebase API Reference

https://firebase.google.com/docs/database/admin/retrieve-data

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



