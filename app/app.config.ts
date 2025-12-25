export default defineAppConfig({
  ui: {
    colors: {
      primary: "cyan",
      neutral: "slate",
    },
    button: {
      slots: {
        base: [
          "cursor-pointer rounded-xl font-medium shadow inline-flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75",
          "transition-colors",
          "active:scale-95 active:transition-transform",
        ],
      },
    },
  },
});
