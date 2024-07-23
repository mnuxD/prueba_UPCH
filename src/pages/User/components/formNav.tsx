import { Button } from "react-bootstrap";
import "./styles.css";
import { useTranslation } from "react-i18next";

export const formParts = {
  info: "info",
  media: "media",
  coordinates: "coordinates"
};

export const menuItems = [
  {
    label: "information",
    value: formParts.info
  },
  {
    label: "photo",
    value: formParts.media
  },
  {
    label: "location",
    value: formParts.coordinates
  }
];

interface Props {
  isLoading: boolean;
  isCreate: boolean;
}

export default function FormNav({ isLoading, isCreate }: Props) {
  const { t } = useTranslation();
  return (
    <div className="position-sticky top-0 flex-shrink-0 customNavbar">
      <nav id="navbar-example2" className="navbar px-3 mb-3">
        <ul className="nav nav-pills">
          {menuItems.map((tab, idx) => (
            <li className="nav-item" key={tab.value}>
              <a className="nav-link" href={`#${tab.value}`}>
                {t(tab.label)}
              </a>
            </li>
          ))}
        </ul>
        <Button type="submit">
          {isLoading && (
            <>
              <div
                className="spinner-border spinner-border-sm text-light"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>{" "}
            </>
          )}
          {isCreate ? t("createUser") : t("editUser")}
        </Button>
      </nav>
    </div>
  );
}
