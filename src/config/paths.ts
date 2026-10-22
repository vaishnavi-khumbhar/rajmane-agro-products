/**
 * Builds a URL for a file in /public that works both at the domain root (rajmaneagroproducts.com)
 * and in a sub-folder (e.g. GitHub Pages: username.github.io/rajmane-agro-products/).
 * Vite sets import.meta.env.BASE_URL from the `base` option / --base flag.
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;