import { CoursePart } from "../types";

interface ContentProps {
  courseParts: CoursePart[];
}

const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      {props.courseParts.map((part) => (
        <Part key={part.name} {...part} />
      ))}
    </div>
  );
};

const Part = (props: CoursePart): JSX.Element => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <p><b>{props.name} {props.exerciseCount}</b><br />
          <i>{props.description}</i>
          </p>
        </div>
      );
    case "group":
      return (
        <div>
          <p><b>{props.name} {props.exerciseCount}</b><br />
          project exercises: {props.groupProjectCount}
          </p>
        </div>
      );
    case "background":
      return (
        <div>
          <p><b>{props.name} {props.exerciseCount}</b><br />
          <i>{props.description}</i><br />
          submit to {props.backgroundMaterial}
          </p>

        </div>
      );
      case "special":
        return (
          <div>
            <p><b>{props.name} {props.exerciseCount}</b><br />
            <i>{props.description}</i><br />
          required skills: {props.requirements.join(", ")}
            </p>
          </div>
        );
    default:
      assertNever(props);
      return <></>;
  }
};

export default Content;