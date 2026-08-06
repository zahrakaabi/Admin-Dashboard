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
              { title: 'Create', path: paths.dashboard.user.create }
            ]
          },
          { 
            title: 'Product',
            path: paths.dashboard.product.list,
            children: [
              { title: 'List', path: paths.dashboard.product.list },
              { title: 'Create', path: paths.dashboard.product.create },
              // { title: 'Details', path: paths.dashboard.product.details },
              { title: 'Edit', path: paths.dashboard.product.edit('classic-leather-loafers') }
            ]
          },
          { 
            title: 'Blog', 
            path: paths.dashboard.blog.list,
            children: [
              { title: 'List', path: paths.dashboard.blog.list },
              // { title: 'Details', path: paths.dashboard.blog.details },
              { title: 'Create', path: paths.dashboard.blog.create },
              { title: 'Edit', path: paths.dashboard.blog.edit('1') }
            ]
          }
        ],
      }
    ],
    []
  );

  return data;
};