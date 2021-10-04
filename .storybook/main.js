module.exports = {
  stories: ["../src/**/*.stories.tsx"],
  addons: [
    "@storybook/addon-actions/register",
    "@storybook/addon-links/register",
    "@storybook/addon-controls/register",
    "@storybook/addon-viewport/register",
  ],
  presets: ["@storybook/preset-create-react-app"],
}