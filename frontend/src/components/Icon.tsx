interface IconProps {
  name: string;
}

const Icon = ({ name }: IconProps) => {
  return (
    <span style={{ fontSize: "inherit" }} className="material-icons">
      {name}
    </span>
  );
};

export default Icon;
