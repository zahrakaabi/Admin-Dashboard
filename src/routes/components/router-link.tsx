/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Link, type LinkProps } from 'react-router-dom';

/* -------------------------------------------------------------------------- */
/*                                 ROUTER LINK                                */
/* -------------------------------------------------------------------------- */
interface RouterLinkProps extends LinkProps {
  ref?: React.Ref<HTMLAnchorElement>
};

function RouterLink({ ref, ...other }: RouterLinkProps) {
  return <Link ref={ref} {...other} />
};

export default RouterLink;