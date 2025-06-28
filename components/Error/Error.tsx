import css from "./Error.module.css";

interface ErrorProps {
  message: string;
}

function Error({ message }: ErrorProps) {
  return <div className={css.text}>{message}</div>;
}

export default Error;
