/* -------------------------------------------------------------------------- */
/*                                    PATHS                                   */
/* -------------------------------------------------------------------------- */
const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`
    },
  },
  // DASHBOARD
  dashboard: {
    // OVERVIEW
    root: `${ROOTS.DASHBOARD}/dashboard`,
    eCommerce: `${ROOTS.DASHBOARD}/eCommerce`,
    analytics: `${ROOTS.DASHBOARD}/analytics`,
    // MANAGMENT
    user: {
      list: `${ROOTS.DASHBOARD}/users`,
      create: `${ROOTS.DASHBOARD}/users/add`,
      // edit: (id: number) => `${ROOTS.DASHBOARD}/users/${id}/edit`
    },
    product: {
      list: `${ROOTS.DASHBOARD}/product`,
      create: `${ROOTS.DASHBOARD}/product/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/product/${id}/edit`
    },
    blog: {
      list: `${ROOTS.DASHBOARD}/blog`,
      create: `${ROOTS.DASHBOARD}/blog/add`,
      // edit: (id: number) => `${ROOTS.DASHBOARD}/blog/${id}/edit`
    }
  }
};