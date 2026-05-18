/* -------------------------------------------------------------------------- */
/*                                 GENERATE ID                                */
/* -------------------------------------------------------------------------- */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Date.now()}`;
};

/* -------------------------------------------------------------------------- */
/*                                GENERATE SLUG                               */
/* -------------------------------------------------------------------------- */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
};

/* -------------------------------------------------------------------------- */
/*                              CUSTOM VARIABLES                              */
/* -------------------------------------------------------------------------- */
export function cv(vars: Record<`--${string}`, string>): React.CSSProperties {
  return vars as React.CSSProperties;
};