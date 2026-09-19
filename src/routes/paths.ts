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
    root: `${ROOTS.DASHBOARD}`,
    eCommerce: `${ROOTS.DASHBOARD}/e-commerce`,
    analytics: `${ROOTS.DASHBOARD}/analytics`,
    // MANAGMENT
    user: {
      list: `${ROOTS.DASHBOARD}/user`,
      create: `${ROOTS.DASHBOARD}/user/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/user/${id}/edit`
    },
    product: {
      list: `${ROOTS.DASHBOARD}/product`,
      create: `${ROOTS.DASHBOARD}/product/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/product/${id}/edit`
    },
    blog: {
      list: `${ROOTS.DASHBOARD}/blog`,
      create: `${ROOTS.DASHBOARD}/blog/add`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/blog/${id}/edit`
    }
  }
};