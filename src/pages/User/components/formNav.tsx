import { Button } from "react-bootstrap";
import "./styles.css";

export const formParts = {
  info: "info",
  media: "media",
  coordinates: "coordinates"
};

export const menuItems = [
  {
    label: "Información",
    value: formParts.info
  },
  {
    label: "Imágenes",
    value: formParts.media
  },
  {
    label: "Ubicación",
    value: formParts.coordinates
  }
];

interface Props {
  isLoading: boolean;
  isCreate: boolean;
}

export default function FormNav({ isLoading, isCreate }: Props) {
  return (
    <div className="position-sticky top-0 flex-shrink-0 customNavbar">
      <nav id="navbar-example2" className="navbar px-3 mb-3">
        <ul className="nav nav-pills">
          {menuItems.map((tab, idx) => (
            <li className="nav-item" key={tab.value}>
              <a className="nav-link" href={`#${tab.value}`}>
                {tab.label}
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
          {isCreate ? "Crear usuario" : "Editar Usuario"}
        </Button>
      </nav>
    </div>
  );
}
