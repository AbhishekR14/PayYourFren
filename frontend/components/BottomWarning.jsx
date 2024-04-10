import { Link } from "react-router-dom";

export function BottomWarning({ label, buttonText, to }) {
  return (
    <div className="py-2 text-sm flex justify-center">
      {label}
      <Link className="pointer underline pl-1 cursor-pointer ml=2" to={to}>
        {buttonText}
      </Link>
    </div>
  );
}