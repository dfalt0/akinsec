/* eslint-disable react/prop-types */
/**
 * Square, bordered panel for marketing content (avoids default shadcn card chrome).
 */
export function FramePanel({ children, className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag
      className={`border border-border bg-card/40 backdrop-blur-sm rounded-md ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
