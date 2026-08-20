/* -------------------------------------------------------------------------- */
/*                                DEPENDENCIES                                */
/* -------------------------------------------------------------------------- */
// Packages
import { Link } from 'react-router-dom';

/* -------------------------------------------------------------------------- */
/*                               LOGO COMPONENT                               */
/* -------------------------------------------------------------------------- */
export interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  disabledLink?: boolean
  to?: string
};

function Logo({ disabledLink = false, to = "/dashboard", style, className, ...props }: LogoProps) {
/* --------------------------------- CONSTS --------------------------------- */
  const logo = (
    <div className={className}
    style={{ width: 40, height: 40, cursor: "pointer", ...style }}
      {...props}>
      <img src="https://www.logoai.com/oss/icons/2021/12/02/SU8HhT2n6tL-p-_.png" alt="Logo" style={{ width: "100%", height: "100%" }} />
    </div>
  );

  if (disabledLink) {
    return logo;
  };

/* -------------------------------- RENDERING ------------------------------- */
  return (
    <Link to={to} style={{ display: "contents" }}>
      {logo}
    </Link>
  )
};

export default Logo;