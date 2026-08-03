/* -------------------------------------------------------------------------- */
/*                    NAVIGATION DATA (used by useNavData)                    */
/* -------------------------------------------------------------------------- */
export type NavItemBaseProps = {
  title: string;
  path: string;
  icon?: React.ReactElement;
  info?: React.ReactElement;
  caption?: string;
  disabled?: boolean;
  roles?: string[];
  children?: NavItemBaseProps[];
};

export type NavGroupProps = {
  subheader?: string;
  items: NavItemBaseProps[];
};

export type NavProps = {
  data: NavGroupProps[];
};

/* -------------------------------------------------------------------------- */
/*              NAVIGATION UI STATE (used only inside components)             */
/* -------------------------------------------------------------------------- */
export type NavItemStateProps = {
  depth?: number;
  open?: boolean;
  active?: boolean;
  hasChild?: boolean;
  currentRole?: string;
  externalLink?: boolean;
};

/* -------------------------------------------------------------------------- */
/*                         NAVIGATION COMPONENT PROPS                         */
/* -------------------------------------------------------------------------- */
export type NavItemProps = NavItemStateProps 
  & NavItemBaseProps
  & { onToggle?: VoidFunction };

export type NavListProps = {
  data: NavItemBaseProps;
};