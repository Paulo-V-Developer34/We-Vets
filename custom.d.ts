declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// Para importações de CSS padrão (ex: import './globals.css')
declare module '*.css';