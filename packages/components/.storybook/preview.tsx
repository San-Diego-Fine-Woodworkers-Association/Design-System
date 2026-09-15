import type { Preview } from "@storybook/react-vite";
import "@sdwa/tokens/theme.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  globalTypes: {
    theme: {
      description: "Color scheme (data-theme)",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    context: {
      description: "Design system context (data-context)",
      toolbar: {
        title: "Context",
        icon: "component",
        items: [
          { value: "app", title: "App" },
          { value: "content", title: "Content" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
    context: "app",
  },
  decorators: [
    (Story, context) => {
      const { theme, context: dsContext } = context.globals;
      return (
        <div
          data-theme={theme}
          data-context={dsContext}
          className="bg-background text-foreground"
          style={{ padding: "1rem", minHeight: "100vh" }}
        >
          <Story />
        </div>
      );
    },
  ],
};

export default preview;
