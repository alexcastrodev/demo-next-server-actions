# Baseline

- index.tsx must always only export component

- Complex components must use Compound Components

- Providers / Hooks / Constants / Interfaces always should be splitted from components, except providers.

- Use export function because of Code Splitting

- A TSX file must have only 1 function

- Partials / Compounds parts must be inside {currentComponent}/\_partials folder

- All components / functions if written by hand, must have spec with Vitest in {currentComponent}/\_tests
