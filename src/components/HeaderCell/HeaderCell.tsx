import "./styles.css";

interface Props {
  title: React.ReactNode;
  sortable?: boolean;
  sortConfig?: any;
  ascending?: boolean;
  onClick?: () => void;
  keySort?: string;
}

const HeaderCell = ({
  title,
  sortable,
  onClick,
  sortConfig,
  keySort
}: Props) => {
  const isUpActive =
    sortConfig?.direction === "asc" && sortConfig?.key === keySort;
  const isDownActive =
    sortConfig?.direction === "desc" && sortConfig?.key === keySort;

  return (
    <div
      className={`headerCell ${onClick && "headerCell--pointer"}`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {sortable && (
        <span className="headerCell__buttonContainer">
          <i
            className={`bi bi-caret-up-fill headerCell__buttonContainer__item ${
              isUpActive && "headerCell__buttonContainer__item--active"
            }`}
          ></i>
          <i
            className={`bi bi-caret-down-fill headerCell__buttonContainer__item ${
              isDownActive && "headerCell__buttonContainer__item--active"
            }`}
          ></i>
        </span>
      )}
      <span>{title}</span>
    </div>
  );
};

export default HeaderCell;
