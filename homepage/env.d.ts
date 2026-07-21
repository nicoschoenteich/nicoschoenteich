/// <reference types="vite/client" />

declare module '*.md' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent
  const frontmatter: Record<string, string>
  export { frontmatter }
  export const title: string
  export const date: string
  export default component
}
