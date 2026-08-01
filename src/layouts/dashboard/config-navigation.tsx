/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { useMemo } from "react";

// Utils
import { paths } from "@/routes/paths";

/* -------------------------------------------------------------------------- */
/*                                USE NAV DATA                                */
/* -------------------------------------------------------------------------- */
export function useNavData() {
  const data = useMemo(
    () => [
      {
        subheader: 'Overview',
        items: [
          { title: 'App', path: paths.dashboard.root },
          { title: 'Ecommerce', path: paths.dashboard.eCommerce },
          { title: 'Analytics', path: paths.dashboard.analytics },
        ],
      },
      {
        subheader: 'MANAGMENT',
        items: [
          { 
            title: 'User', 
            path: paths.dashboard.user.list,
            children: [
              { title: 'List', path: paths.dashboard.user.list },
              // { title: 'Details', path: paths.dashboard.user.details },
              { title: 'Create', path: paths.dashboard.user.create },
              { title: 'Edit', path: paths.dashboard.user.edit }
            ]
          },
          { 
            title: 'Product',
            path: paths.dashboard.product.list,
            children: [
              { title: 'List', path: paths.dashboard.product.list },
              // { title: 'Details', path: paths.dashboard.product.details },
              { title: 'Create', path: paths.dashboard.product.create },
              { title: 'Edit', path: paths.dashboard.product.edit }
            ]
          },
          { 
            title: 'Blog', 
            path: paths.dashboard.blog.list,
            children: [
              { title: 'List', path: paths.dashboard.blog.list },
              // { title: 'Details', path: paths.dashboard.blog.details },
              { title: 'Create', path: paths.dashboard.blog.create },
              { title: 'Edit', path: paths.dashboard.blog.edit }
            ]
          }
        ],
      }
    ],
    []
  );

  return data;
};