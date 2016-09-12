declare namespace pug {
  /**
   * Compile a Pug template to a function which can be rendered multiple times with different locals.
   */
  export function compile(template: string, options?: Options): TemplateFunction;

  /**
   * Compile a Pug template from a file to a function which can be rendered multiple times with different locals.
   */
  export function compileFile(path: string, options?: Options): TemplateFunction;

  /**
   * Compile a Pug template to a string of JavaScript that can be used client side along with the Pug runtime.
   */
  export function compileClient(template: string, options?: Options): string;

  /**
   * Compile a Pug template to an object of the form:
   * {
   *   'body': 'function (locals) {...}',
   *   'dependencies': ['filename.pug']
   * }
   * that can be used client side along with the Pug runtime.
   * You should only use this method if you need dependencies to implement something like watching for changes to the Pug files.
   */
  export function compileClientWithDependenciesTracked(template: string, options?: Options): {
    body: string;
    dependencies: string[];
  };

  /**
   * Compile a Pug template file to a string of JavaScript that can be used client side along with the Pug runtime.
   */
  export function compileFileClient(path: string, options?: Options): string;

  /**
   * Compile a Pug template and render it with locals to html string.
   */
  export function render(template: string, options?: Options & any, fn?: (err: Error | void, res: string) => void): string;

  /**
   * Compile a Pug template from a file and render it with locals to html string.
   */
  export function renderFile(path: string, options?: Options & any, fn?: (err: Error | void, res: string) => void): string;

  export interface Options {
    /** The name of the file being compiled. Used in exceptions, and required for relative includes and extends. Defaults to 'Pug'. */
    filename?: string,
    /** The root directory of all absolute inclusion. */
    basedir?: string,
    /** If the doctype is not specified as part of the template, you can specify it here. It is sometimes useful to get self-closing tags and remove mirroring of boolean attributes; see doctype documentation for more information. */
    doctype?: string,
    /** Adds whitespace to the resulting HTML to make it easier for a human to read using '  ' as indentation. If a string is specified, that will be used as indentation instead (e.g. '\t'). Defaults to false. */
    pretty?: boolean | string,
    /** Hash table of custom filters. Defaults to undefined. */
    filters?: any,
    /** Use a self namespace to hold the locals. It will speed up the compilation, but instead of writing variable you will have to write self.variable to access a property of the locals object. Defaults to false. */
    self?: boolean,
    /** If set to true, the tokens and function body are logged to stdout. */
    debug?: boolean,
    /** If set to true, the function source will be included in the compiled template for better error messages (sometimes useful in development). It is enabled by default unless used with Express in production mode. */
    compileDebug?: boolean,
    /** Add a list of global names to make accessible in templates. */
    globals?: Array<string>,
    /** If set to true, compiled functions are cached. filename must be set as the cache key. Only applies to render functions. Defaults to false. */
    cache?: boolean,
    /** Inline runtime functions instead of require-ing them from a shared version. For compileClient functions, the default is true so that one does not have to include the runtime. For all other compilation or rendering types, the default is false. */
    inlineRuntimeFunctions?: boolean,
    /** The name of the template function. Only applies to compileClient functions. Defaults to 'template'. */
    name?: string
  }

  /** A function that can be use to render html string of compiled template. */
  export interface TemplateFunction {
    (locals?: any): string;
  }
}

export = pug;
