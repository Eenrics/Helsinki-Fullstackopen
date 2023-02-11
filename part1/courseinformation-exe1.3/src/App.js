const Header = (props) => {
  return ( 
    <h1>{props.course}</h1>
    );
}
  
const Content = ({firArg, secArg, thrArg}) => {
  return (  
    <>
      <Part part={firArg.name} exercises={firArg.exercises} />
      <Part part={secArg.name} exercises={secArg.exercises} />
      <Part part={thrArg.name} exercises={thrArg.exercises} />
    </>
  );
}

const Part = (props) => {
  return ( 
    <p>
      {props.part} {props.exercises}
    </p>
    );
}
  

const Total = (props) => {
  return ( 
    <p>Number of exercises {props.exercisesSum}</p>
    );
}








const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content firArg={part1} secArg={part2} thrArg={part3}/>
      <Total exercisesSum={part1.exercises + part2.exercises + part3.exercises} />
    </div>
  )
}

export default App