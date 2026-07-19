##  Localization Contributions via JSON

We want to make it as easy as possible for everyone to bring Frapp to more languages! If you are not comfortable modifying the TypeScript source code directly, or if you simply want to get your translations reviewed before opening a formal Pull Request, you can submit your work in **JSON format**.

### How to Submit via JSON:

1. **Get the Template:** Copy the structure of our base English file, stripping away the TypeScript code wrapper so that it is a standard, valid JSON object (`{ "header": { ... } }`).
2. **Translate the Values:** Translate the string values while keeping all object keys, nesting, and interpolation variables (like `{{version}}` or `{{count}}`) exactly the same.
3. **Submit for Review:** You can share your translated JSON file with us for approval by:
   * Opening a new **GitHub Issue** with the category **Feature Request** and attaching your `.json` file.
   * Submitting a draft Pull Request containing just the JSON file.

Once our team reviews and approves the translation, we will handle wrapping it into the required strict TypeScript configuration format (`export const yourLang = { ... } as const;`) and integrate it into the application core!
