import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({course}) => {
  return ( 
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((acc, part) => acc + part.exercises, 0)} />
    </>
   );
}

export default Course